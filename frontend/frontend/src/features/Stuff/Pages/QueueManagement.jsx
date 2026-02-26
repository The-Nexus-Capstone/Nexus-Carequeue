import React, { useState } from 'react';
import AdminLayout from '../Components/AdminLayout';
import './QueueManagement.css';

const QueueManagement = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const patients = [
    { id: 1, name: "John Doe", phone: "08134567356", type: "General consultation", status: "In Progress" },
    { id: 2, name: "Kenneth Dan", phone: "08134566676", type: "Follow-up Visit", status: "In Progress" },
    { id: 3, name: "Kate Maggie", phone: "08085566676", type: "Vaccination", status: "Waiting" },
    { id: 4, name: "Dennis Gilead", phone: "09167566676", type: "Follow-up Visit", status: "Waiting" },
    { id: 5, name: "Sarah Bello", phone: "07054757890", type: "Eye Test", status: "Waiting" }
  ];

  // Filter logic to match your tabs
  const filteredPatients = patients.filter(p => {
    if (activeFilter === 'Current') return p.status === 'In Progress';
    if (activeFilter === 'Queue') return p.status === 'Waiting';
    return true;
  });

  return (
    <AdminLayout activeTab="queue">
      <div className="queue-header">
        <h1>Queue Management</h1>
        <p>Community Health Center, Ikeja</p>
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
                {/* Status Tags */}
                <span className={`status-tag ${patient.status === 'In Progress' ? 'in-progress' : 'waiting'}`}>
                  {patient.status}
                </span>
              </div>
              
              {/* Dynamic Buttons */}
              {patient.status === 'In Progress' ? (
                <button className="mark-done-btn">Mark as done</button>
              ) : (
                <button className="start-consult-btn">Start consultation</button>
              )}
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default QueueManagement;