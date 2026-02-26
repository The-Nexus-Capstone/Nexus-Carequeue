# app/tasks.py
# TASK 6 — Celery Background Tasks (SMS Notifications)
# ─────────────────────────────────────────────
# Sends SMS messages via Twilio in the background
# so check-in responses are instant and SMS doesn't slow them down.
#
# Requirements in .env:
#   REDIS_URL=redis://:your-password@redis:6379/0
#   TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
#   TWILIO_AUTH_TOKEN=your_auth_token_here
#   TWILIO_PHONE_NUMBER=+1234567890
#
# To run the worker locally:
#   celery -A app.tasks.celery worker --loglevel=info
# ─────────────────────────────────────────────

import os
from celery import Celery
from dotenv import load_dotenv

load_dotenv()

# ── Celery Setup ───────────────────────────────

def make_celery():
    redis_url = os.environ.get('REDIS_URL', 'redis://localhost:6379/0')
    celery = Celery(
        'carequeue',
        broker=redis_url,
        backend=redis_url,
    )
    celery.conf.update(
        task_serializer    = 'json',
        result_serializer  = 'json',
        accept_content     = ['json'],
        timezone           = 'UTC',
        enable_utc         = True,
        # Retry failed tasks up to 3 times before giving up
        task_acks_late     = True,
        task_reject_on_worker_lost = True,
    )
    return celery


celery = make_celery()


# ── SMS Task ───────────────────────────────────

@celery.task(bind=True, max_retries=3, default_retry_delay=30)
def send_sms_notification(self, phone: str, message: str):
    """
    Send an SMS to the given phone number using Twilio.
    Retries up to 3 times if it fails (e.g. Twilio timeout).

    Args:
        phone:   Recipient phone number, e.g. "+2348012345678"
        message: The SMS body text
    """
    account_sid  = os.environ.get('TWILIO_ACCOUNT_SID')
    auth_token   = os.environ.get('TWILIO_AUTH_TOKEN')
    from_number  = os.environ.get('TWILIO_PHONE_NUMBER')

    # ── Safety check ──────────────────────────
    if not all([account_sid, auth_token, from_number]):
        # In development, just log it instead of crashing
        print(f"[SMS — DEV MODE] To: {phone}\nMessage: {message}\n")
        return {'status': 'logged', 'phone': phone}

    # ── Real Twilio send ───────────────────────
    try:
        from twilio.rest import Client
        client = Client(account_sid, auth_token)

        sms = client.messages.create(
            body = message,
            from_ = from_number,
            to    = phone,
        )

        print(f"[SMS SENT] SID: {sms.sid} → {phone}")
        return {'status': 'sent', 'sid': sms.sid, 'phone': phone}

    except Exception as exc:
        print(f"[SMS ERROR] Failed to send to {phone}: {exc}")
        # Retry after delay — Celery will call this task again automatically
        raise self.retry(exc=exc)
