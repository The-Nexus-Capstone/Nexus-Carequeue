/* eslint-disable */
import React, { useState, useEffect, useCallback } from 'react';
import AdminLayout from '../Components/AdminLayout';
import './QueueManagement.css';

const QueueManagement = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  const token = localStorage.getItem('token');

  // useCallback keeps fetchQueue stable so the useEffect doesn't trigger a loop
  const fetchQueue = useCallback(() => {
    if (!token) return; // Guard clause if token is missing

    fetch(`${API_URL}/api/queues/`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setPatients(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [API_URL, token]);

  useEffect(() => {
    fetchQueue();
    const interval = setInterval(fetchQueue, 15000);
    return () => clearInterval(interval);
  }, [fetchQueue]);

  const handleStart = async (id) => {
    try {
      await fetch(`${API_URL}/api/queues/${id}/start`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchQueue();
    } catch (_error) {
      console.error("Failed to start consultation");
    }
  };

  const handleDone = async (id) => {
    try {
      await fetch(`${API_URL}/api/queues/${id}/done`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchQueue();
    } catch (_error) {
      console.error("Failed to mark as done");
    }
  };

  const filteredPatients = patients.filter(p => {
    if (activeFilter === 'Current') return p.status === 'In Progress';
    if (activeFilter === 'Queue') return p.status === 'Waiting';
    return true;
  });

  return (
    <AdminLayout activeTab="queue">
      <div className="queue-header">
        <h1>Queue Management</h1>
      </div>

      <div className="filter-tabs">
        <button
          className={`filter-btn ${activeFilter === 'All' ? 'active' : ''}`}
          onClick={() => setActiveFilter('All')}
        >
          All Patients
        </button>
        <button
          className={`filter-btn ${activeFilter === 'Current' ? 'active' : ''}`}
          onClick={() => setActiveFilter('Current')}
        >
          Current Patients
        </button>
        <button
          className={`filter-btn ${activeFilter === 'Queue' ? 'active' : ''}`}
          onClick={() => setActiveFilter('Queue')}
        >
          In Queue
        </button>
      </div>

      <div className="patient-list-section">
        {loading ? (
          <p>Loading queue...</p>
        ) : filteredPatients.length === 0 ? (
          <p style={{ color: "#777", marginTop: "2rem", textAlign: "center" }}>
            No patients in queue right now.
          </p>
        ) : (
          <>
            <h3>Patients ({filteredPatients.length})</h3>
            <div className="patient-cards-container">
              {filteredPatients.map((patient) => (
                <div key={patient.id} className="patient-card">
                  <div className="card-top">
                    <div className="patient-info">
                      <h4>{patient.name}</h4>
                      <p className="phone">{patient.phone}</p>
                      <p className="visit-type">{patient.type}</p>
                    </div>
                    <span className={`status-tag ${patient.status === 'In Progress' ? 'in-progress' : 'waiting'}`}>
                      {patient.status}
                    </span>
                  </div>

                  {patient.status === 'In Progress' ? (
                    <button className="mark-done-btn" onClick={() => handleDone(patient.id)}>
                      Mark as done
                    </button>
                  ) : (
                    <button className="start-consult-btn" onClick={() => handleStart(patient.id)}>
                      Start consultation
                    </button>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
};

export default QueueManagement;