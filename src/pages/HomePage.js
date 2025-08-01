import React, { useState } from 'react';
import { Search, Filter, Settings, Bell, Grid3X3, Home, FileText, Calendar, Users, User, Phone, Mail, Linkedin, Facebook, Twitter, MessageCircle } from 'lucide-react';

export default function HomePage() {
  const [selectedEmployee, setSelectedEmployee] = useState({
    name: 'Dylan Baylidge',
    position: 'Sales Coordinator',
    department: 'Sales',
    phone: '(404) 192-9945, Ext: 194',
    mobile: '(472) 276-0193',
    email: 'dbaylidge@company.com',
    status: 'Available',
    supervisor: 'Christine Wyatt',
    location: 'Atlanta',
    birthday: 'September 29',
    city: 'Brookhead',
    sex: 'Male'
  });

  const employees = [
    {
      id: 1,
      name: 'Cole Ashbury',
      position: 'Software Engineer',
      department: 'Engineering',
      phone: '(728) 521-4294',
      status: 'Available',
      initials: 'CA'
    },
    {
      id: 2,
      name: 'Joshua Baker',
      position: 'Accountant',
      department: 'Accounting',
      phone: '(404) 153-5520',
      status: 'Out',
      initials: 'JB'
    },
    {
      id: 3,
      name: 'Dylan Baylidge',
      position: 'Sales Coordinator',  
      department: 'Sales',
      phone: '(404) 192-9945',
      status: 'Available',
      initials: 'DB'
    },
    {
      id: 4,
      name: 'Lisa Bradford',
      position: 'Communications Manager',
      department: 'Marketing',
      phone: '(330) 923-4411',
      status: 'Available',
      initials: 'LB'
    },
    {
      id: 5,
      name: 'Paul Bryant',
      position: 'Finance Manager',
      department: 'Finance', 
      phone: '(404) 895-4539',
      status: 'Available',
      initials: 'PB'
    },
    {
      id: 6,
      name: 'Taylor Christensen',
      position: 'Product Designer',
      department: 'Design',
      phone: '(404) 660-3953',
      status: 'Available',
      initials: 'TC'
    },
    {
      id: 7,
      name: 'Melanie Crawford',
      position: 'Marketing Coordinator',
      department: 'Marketing',
      phone: '(320) 039-8474',
      status: 'Available',
      initials: 'MC'
    }
  ];

  const handleEmployeeClick = (employee) => {
    setSelectedEmployee({
      name: employee.name,
      position: employee.position,
      department: employee.department,
      phone: employee.phone,
      mobile: '(472) 276-0193',
      email: employee.name.toLowerCase().replace(' ', '') + '@company.com',
      status: employee.status,
      supervisor: 'Christine Wyatt',
      location: 'Atlanta',
      birthday: 'September 29',
      city: 'Brookhead',
      sex: 'Male'
    });
  };

  const headerStyle = {
    background: 'white',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    borderBottom: '1px solid #e5e7eb',
    padding: '16px 24px'
  };

  const navLinkStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#6b7280',
    textDecoration: 'none',
    padding: '8px 0',
    cursor: 'pointer'
  };

  const activeNavLinkStyle = {
    ...navLinkStyle,
    color: '#40e0d0',
    borderBottom: '2px solid #40e0d0'
  };

  const cardStyle = {
    background: 'white',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
    padding: '24px'
  };

  const inputStyle = {
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    padding: '8px 12px',
    outline: 'none',
    fontSize: '14px'
  };

  const buttonStyle = {
    background: '#40e0d0',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    padding: '8px 16px',
    cursor: 'pointer',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    overflow: 'hidden'
  };

  const thStyle = {
    background: '#f9fafb',
    padding: '12px 24px',
    textAlign: 'left',
    fontSize: '12px',
    fontWeight: '500',
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  };

  const tdStyle = {
    padding: '16px 24px',
    borderBottom: '1px solid #e5e7eb'
  };

  const statusBadgeStyle = (status) => ({
    display: 'inline-flex',
    alignItems: 'center',
    padding: '4px 12px',
    borderRadius: '9999px',
    fontSize: '12px',
    fontWeight: '600',
    background: status === 'Available' ? '#dcfce7' : '#fee2e2',
    color: status === 'Available' ? '#16a34a' : '#dc2626'
  });

  const avatarStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: '#d1d5db',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    fontWeight: '500'
  };

  const socialButtonStyle = (bgColor) => ({
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    background: bgColor,
    color: 'white',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer'
  });

  return (
    <div style={{ minHeight: '100vh', background: '#f3f4f6' }}>
      {/* Header */}
      <header style={headerStyle}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              background: '#3b82f6',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold'
            }}>
              C
            </div>
            <nav style={{ display: 'flex', gap: '24px' }}>
              <a style={navLinkStyle}>
                <Home size={16} />
                <span>Home</span>
              </a>
              <a style={navLinkStyle}>
                <FileText size={16} />
                <span>News</span>
              </a>
              <a style={navLinkStyle}>
                <Calendar size={16} />
                <span>Events</span>
              </a>
              <a style={navLinkStyle}>
                <Users size={16} />
                <span>Departments</span>
              </a>
              <a style={navLinkStyle}>
                <FileText size={16} />
                <span>Documents</span>
              </a>
              <a style={activeNavLinkStyle}>
                <User size={16} />
                <span>Employees</span>
              </a>
            </nav>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ position: 'relative' }}>
              <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} size={16} />
              <input 
                type="text" 
                placeholder="Search..." 
                style={{ ...inputStyle, paddingLeft: '40px', width: '200px' }}
              />
            </div>
            <button style={{ border: 'none', background: 'none', padding: '8px', borderRadius: '6px', cursor: 'pointer' }}>
              <Grid3X3 size={20} color="#6b7280" />
            </button>
            <div style={{ position: 'relative' }}>
              <button style={{ border: 'none', background: 'none', padding: '8px', borderRadius: '6px', cursor: 'pointer' }}>
                <Bell size={20} color="#6b7280" />
              </button>
              <span style={{
                position: 'absolute',
                top: '-2px',
                right: '-2px',
                width: '20px',
                height: '20px',
                background: '#ef4444',
                color: 'white',
                fontSize: '12px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>1</span>
            </div>
            <div style={{ width: '32px', height: '32px', background: '#d1d5db', borderRadius: '50%' }}></div>
          </div>
        </div>
      </header>

      <div style={{ padding: '24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
          {/* Employee Directory */}
          <div style={cardStyle}>
            {/* Breadcrumb */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>
              <Home size={14} />
              <span>/</span>
              <span>Employees</span>
            </div>

            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '24px' }}>Employee Directory</h2>

            <button style={{ ...buttonStyle, marginBottom: '24px' }}>
              Add Employee
            </button>

            {/* Filters */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
              <select style={inputStyle}>
                <option>All</option>
                <option>Employee</option>
                <option>Manager</option>
              </select>
              <select style={inputStyle}>
                <option>All</option>
                <option>Engineering</option>
                <option>Sales</option>
                <option>Marketing</option>
              </select>
              <select style={inputStyle}>
                <option>All</option>
                <option>Available</option>
                <option>Out</option>
              </select>
              <button style={buttonStyle}>
                <Filter size={16} />
                <span>Filter</span>
              </button>
            </div>

            {/* Search and Sort */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ position: 'relative' }}>
                <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} size={16} />
                <input 
                  type="text" 
                  placeholder="Filter by name..." 
                  style={{ ...inputStyle, paddingLeft: '40px', width: '320px' }}
                />
              </div>
              <span style={{ fontSize: '14px', color: '#6b7280' }}>Sort by: Alphabetical A-Z</span>
            </div>

            {/* Employee Table */}
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Name</th>
                  <th style={thStyle}>Department</th>
                  <th style={thStyle}>Phone Number</th>
                  <th style={thStyle}>Availability</th>
                  <th style={thStyle}></th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr 
                    key={employee.id} 
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleEmployeeClick(employee)}
                    onMouseEnter={(e) => e.target.closest('tr').style.background = '#f9fafb'}
                    onMouseLeave={(e) => e.target.closest('tr').style.background = 'white'}
                  >
                    <td style={tdStyle}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={avatarStyle}>
                          {employee.initials}
                        </div>
                        <div style={{ marginLeft: '16px' }}>
                          <div style={{ fontSize: '14px', fontWeight: '500' }}>{employee.name}</div>
                          <div style={{ fontSize: '14px', color: '#6b7280' }}>{employee.position}</div>
                        </div>
                      </div>
                    </td>
                    <td style={tdStyle}>{employee.department}</td>
                    <td style={tdStyle}>{employee.phone}</td>
                    <td style={tdStyle}>
                      <span style={statusBadgeStyle(employee.status)}>
                        {employee.status}
                      </span>
                    </td>
                    <td style={tdStyle}>
                      <button style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
                        <Settings size={16} color="#9ca3af" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Employee Profile Card */}
          <div style={cardStyle}>
            {/* Profile Header */}
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: '#d1d5db',
                borderRadius: '50%',
                margin: '0 auto 16px auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                fontWeight: '500'
              }}>
                {selectedEmployee.name.split(' ').map(n => n[0]).join('')}
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', margin: '0 0 4px 0' }}>{selectedEmployee.name}</h3>
              <p style={{ color: '#6b7280', margin: '0 0 8px 0' }}>{selectedEmployee.position}</p>
              <span style={statusBadgeStyle(selectedEmployee.status)}>
                {selectedEmployee.status}
              </span>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: '24px 0' }} />

            {/* Contact Information */}
            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ fontWeight: '600', marginBottom: '12px' }}>Contact Information</h4>
              <div style={{ fontSize: '14px', lineHeight: '1.6' }}>
                <div style={{ marginBottom: '8px' }}>
                  <span style={{ fontWeight: '500' }}>Office Tel:</span> {selectedEmployee.phone}
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <span style={{ fontWeight: '500' }}>Mobile:</span> {selectedEmployee.mobile}
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <span style={{ fontWeight: '500' }}>Email:</span> {selectedEmployee.email}
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                <button style={socialButtonStyle('#0077b5')}>
                  <Linkedin size={14} />
                </button>
                <button style={socialButtonStyle('#1877f2')}>
                  <Facebook size={14} />
                </button>
                <button style={socialButtonStyle('#1da1f2')}>
                  <Twitter size={14} />
                </button>
                <button style={socialButtonStyle('#00aff0')}>
                  <MessageCircle size={14} />
                </button>
              </div>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: '24px 0' }} />

            {/* Work Information */}
            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ fontWeight: '600', marginBottom: '12px' }}>Work Information</h4>
              <div style={{ fontSize: '14px', lineHeight: '1.6' }}>
                <div style={{ marginBottom: '8px' }}>
                  <span style={{ fontWeight: '500' }}>Department:</span> {selectedEmployee.department}
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <span style={{ fontWeight: '500' }}>Supervisor:</span> {selectedEmployee.supervisor}
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <span style={{ fontWeight: '500' }}>Location:</span> {selectedEmployee.location}
                </div>
              </div>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: '24px 0' }} />

            {/* Personal Information */}
            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ fontWeight: '600', marginBottom: '12px' }}>Personal Information</h4>
              <div style={{ fontSize: '14px', lineHeight: '1.6' }}>
                <div style={{ marginBottom: '8px' }}>
                  <span style={{ fontWeight: '500' }}>Sex:</span> {selectedEmployee.sex}
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <span style={{ fontWeight: '500' }}>Birthday:</span> {selectedEmployee.birthday}
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <span style={{ fontWeight: '500' }}>City:</span> {selectedEmployee.city}
                </div>
              </div>
            </div>

            <button style={{ 
              color: '#40e0d0', 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer', 
              fontSize: '14px',
              textDecoration: 'underline'
            }}>
              View {selectedEmployee.name.split(' ')[0]}'s Full Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}