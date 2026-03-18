from celery import Celery
import os

celery = Celery(__name__)


def init_celery(app):
    celery.conf.update(
        broker_url=os.environ.get('REDIS_URL', 'redis://localhost:6379/0'),
        result_backend=os.environ.get('REDIS_URL', 'redis://localhost:6379/0'),
    )
    celery.conf.task_always_eager = app.config.get('TESTING', False)
    return celery


@celery.task
def send_sms_notification(phone, message):
    account_sid = os.environ.get('TWILIO_ACCOUNT_SID', '')
    auth_token  = os.environ.get('TWILIO_AUTH_TOKEN', '')
    from_number = os.environ.get('TWILIO_PHONE_NUMBER', '')

    if account_sid and auth_token and from_number:
        from twilio.rest import Client
        client = Client(account_sid, auth_token)
        client.messages.create(body=message, from_=from_number, to=phone)
    else:
        print(f"[SMS - dev mode] To: {phone} | Message: {message}")
