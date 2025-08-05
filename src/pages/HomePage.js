import React, { useState, useEffect } from 'react';
import { Search, Filter, Settings, Bell, Grid3X3, Home, FileText, Calendar, Users, User, Phone, Mail, Linkedin, Facebook, Twitter, MessageCircle, Upload, Download, Loader } from 'lucide-react';
import Papa from 'papaparse';

// Firebase configuration (replace with your config)
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};

export default function PhoneDirectory() {
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

  const [employees, setEmployees] = useState([
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
  ]);

  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  // Filter employees based on search term
  const filteredEmployees = employees.filter(employee => {
    const searchLower = searchTerm.toLowerCase();
    return (
      (employee.name || '').toLowerCase().includes(searchLower) ||
      (employee.email || '').toLowerCase().includes(searchLower) ||
      (employee.department || '').toLowerCase().includes(searchLower) ||
      (employee.position || '').toLowerCase().includes(searchLower) ||
      (employee.phone || '').includes(searchTerm)
    );
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEmployees = filteredEmployees.slice(startIndex, endIndex);

  // Reset to first page when search changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);
  // Firebase functions (mock implementation - replace with actual Firebase SDK)
  const uploadToFirebase = async (employeeData) => {
    // This is a mock function - replace with actual Firebase implementation
    try {
      // Example Firebase implementation:
      // const db = getFirestore();
      // const batch = writeBatch(db);
      // 
      // employeeData.forEach((employee) => {
      //   const docRef = doc(db, 'employees', employee.id.toString());
      //   batch.set(docRef, employee);
      // });
      // 
      // await batch.commit();
      
      // Mock delay for demonstration
      await new Promise(resolve => setTimeout(resolve, 2000));
      return { success: true, message: 'Data uploaded successfully to Firebase' };
    } catch (error) {
      return { success: false, message: 'Failed to upload to Firebase: ' + error.message };
    }
  };

  const handleCSVUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true);
    setUploadStatus('Parsing CSV file...');

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: async (results) => {
        try {
          setUploadStatus('Processing employee data...');
          
          // Process CSV data
          const processedEmployees = results.data.map((row, index) => ({
            id: row.id || (employees.length + index + 1),
            name: (row.name || row.Name || '').toString(),
            position: (row.position || row.Position || '').toString(),
            department: (row.department || row.Department || '').toString(),
            phone: (row.phone || row.Phone || '').toString(),
            status: (row.status || row.Status || 'Available').toString(),
            initials: ((row.name || row.Name || '').toString()).split(' ').map(n => n[0] || '').join('').toUpperCase(),
            mobile: (row.mobile || row.Mobile || '').toString(),
            email: (row.email || row.Email || '').toString(),
            supervisor: (row.supervisor || row.Supervisor || '').toString(),
            location: (row.location || row.Location || '').toString(),
            birthday: (row.birthday || row.Birthday || '').toString(),
            city: (row.city || row.City || '').toString(),
            sex: (row.sex || row.Sex || '').toString()
          }));

          setUploadStatus('Uploading to Firebase...');
          
          // Upload to Firebase
          const result = await uploadToFirebase(processedEmployees);
          
          if (result.success) {
            setEmployees(processedEmployees);
            setUploadStatus('✅ Successfully uploaded ' + processedEmployees.length + ' employees to Firebase!');
          } else {
            setUploadStatus('❌ ' + result.message);
          }
          
        } catch (error) {
          setUploadStatus('❌ Error processing file: ' + error.message);
        }
        
        setIsUploading(false);
        setTimeout(() => {
          setUploadStatus('');
          setShowUploadModal(false);
        }, 3000);
      },
      error: (error) => {
        setUploadStatus('❌ Error parsing CSV: ' + error.message);
        setIsUploading(false);
      }
    });

    // Reset file input
    event.target.value = '';
  };

  const downloadSampleCSV = () => {
    const sampleData = [
      {
        id: 1,
        name: 'John Doe',
        position: 'Software Engineer',
        department: 'Engineering',
        phone: '(555) 123-4567',
        status: 'Available',
        mobile: '(555) 987-6543',
        email: 'john.doe@company.com',
        supervisor: 'Jane Smith',
        location: 'New York',
        birthday: 'January 15',
        city: 'Manhattan',
        sex: 'Male'
      }
    ];

    const csv = Papa.unparse(sampleData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'employee_sample.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleEmployeeClick = (employee) => {
    setSelectedEmployee({
      name: employee.name || 'Unknown',
      position: employee.position || 'No position',
      department: employee.department || 'No department',
      phone: employee.phone || 'No phone',
      mobile: employee.mobile || '(472) 276-0193',
      email: employee.email || (employee.name || 'unknown').toLowerCase().replace(' ', '') + '@company.com',
      status: employee.status || 'Available',
      supervisor: employee.supervisor || 'Christine Wyatt',
      location: employee.location || 'Atlanta',
      birthday: employee.birthday || 'September 29',
      city: employee.city || 'Brookhead',
      sex: employee.sex || 'Male'
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

            <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
              <button style={buttonStyle}>
                Add Employee
              </button>
              <button 
                style={{ ...buttonStyle, background: '#10b981' }}
                onClick={() => setShowUploadModal(true)}
              >
                <Upload size={16} />
                Upload CSV
              </button>
              <button 
                style={{ ...buttonStyle, background: '#6366f1' }}
                onClick={downloadSampleCSV}
              >
                <Download size={16} />
                Sample CSV
              </button>
            </div>

            {/* Search */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ position: 'relative', width: '400px' }}>
                <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} size={16} />
                <input 
                  type="text" 
                  placeholder="Search by name, email, department, position, or phone..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ 
                    ...inputStyle, 
                    paddingLeft: '40px', 
                    width: '100%',
                    fontSize: '14px'
                  }}
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      color: '#9ca3af',
                      cursor: 'pointer',
                      fontSize: '18px'
                    }}
                  >
                    ×
                  </button>
                )}
              </div>
              <div style={{ marginTop: '8px', fontSize: '14px', color: '#6b7280' }}>
                {filteredEmployees.length} employee(s) found
                {searchTerm && ` for "${searchTerm}"`}
              </div>
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
                {currentEmployees.map((employee) => (
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
                          {employee.initials || 'N/A'}
                        </div>
                        <div style={{ marginLeft: '16px' }}>
                          <div style={{ fontSize: '14px', fontWeight: '500' }}>{employee.name || 'Unknown'}</div>
                          <div style={{ fontSize: '14px', color: '#6b7280' }}>{employee.position || 'No position'}</div>
                        </div>
                      </div>
                    </td>
                    <td style={tdStyle}>{employee.department || 'N/A'}</td>
                    <td style={tdStyle}>{employee.phone || 'N/A'}</td>
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

            {/* Pagination */}
            {totalPages > 1 && (
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                marginTop: '24px',
                padding: '16px 0'
              }}>
                <div style={{ fontSize: '14px', color: '#6b7280' }}>
                  Showing {startIndex + 1} to {Math.min(endIndex, filteredEmployees.length)} of {filteredEmployees.length} employees
                </div>
                
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    style={{
                      padding: '8px 12px',
                      border: '1px solid #d1d5db',
                      background: currentPage === 1 ? '#f9fafb' : 'white',
                      color: currentPage === 1 ? '#9ca3af' : '#374151',
                      borderRadius: '6px',
                      cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    Previous
                  </button>
                  
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        style={{
                          width: '36px',
                          height: '36px',
                          border: '1px solid #d1d5db',
                          background: currentPage === page ? '#40e0d0' : 'white',
                          color: currentPage === page ? 'white' : '#374151',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '14px',
                          fontWeight: currentPage === page ? '600' : '400'
                        }}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                  
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    style={{
                      padding: '8px 12px',
                      border: '1px solid #d1d5db',
                      background: currentPage === totalPages ? '#f9fafb' : 'white',
                      color: currentPage === totalPages ? '#9ca3af' : '#374151',
                      borderRadius: '6px',
                      cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
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
                {(selectedEmployee.name || 'Unknown').split(' ').map(n => n[0] || '').join('')}
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', margin: '0 0 4px 0' }}>{selectedEmployee.name || 'Unknown'}</h3>
              <p style={{ color: '#6b7280', margin: '0 0 8px 0' }}>{selectedEmployee.position || 'No position'}</p>
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
                              View {(selectedEmployee.name || 'Unknown').split(' ')[0] || 'Employee'}'s Full Profile
            </button>
          </div>
        </div>

        {/* Upload Modal */}
        {showUploadModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '32px',
              width: '500px',
              maxWidth: '90vw'
            }}>
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>
                Upload Employee CSV
              </h3>
              
              <div style={{ marginBottom: '24px' }}>
                <p style={{ color: '#6b7280', marginBottom: '16px' }}>
                  Upload a CSV file to update employee data in Firebase. The CSV should include columns like:
                  name, position, department, phone, status, email, etc.
                </p>
                
                <div style={{
                  border: '2px dashed #d1d5db',
                  borderRadius: '8px',
                  padding: '32px',
                  textAlign: 'center',
                  background: '#f9fafb'
                }}>
                  <Upload size={48} color="#9ca3af" style={{ margin: '0 auto 16px' }} />
                  <p style={{ marginBottom: '16px' }}>Drop your CSV file here or click to browse</p>
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleCSVUpload}
                    style={{ display: 'none' }}
                    id="csv-upload"
                    disabled={isUploading}
                  />
                  <label 
                    htmlFor="csv-upload" 
                    style={{
                      ...buttonStyle,
                      display: 'inline-flex',
                      cursor: isUploading ? 'not-allowed' : 'pointer',
                      opacity: isUploading ? 0.6 : 1
                    }}
                  >
                    {isUploading && <Loader size={16} style={{ animation: 'spin 1s linear infinite' }} />}
                    {isUploading ? 'Processing...' : 'Choose File'}
                  </label>
                </div>
              </div>

              {uploadStatus && (
                <div style={{
                  padding: '12px',
                  borderRadius: '6px',
                  marginBottom: '16px',
                  background: uploadStatus.includes('✅') ? '#dcfce7' : uploadStatus.includes('❌') ? '#fee2e2' : '#e0f2fe',
                  color: uploadStatus.includes('✅') ? '#16a34a' : uploadStatus.includes('❌') ? '#dc2626' : '#0369a1',
                  fontSize: '14px'
                }}>
                  {uploadStatus}
                </div>
              )}

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button
                  onClick={downloadSampleCSV}
                  style={{
                    ...buttonStyle,
                    background: '#6b7280'
                  }}
                >
                  Download Sample
                </button>
                <button
                  onClick={() => setShowUploadModal(false)}
                  style={{
                    background: 'white',
                    color: '#6b7280',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    padding: '8px 16px',
                    cursor: 'pointer'
                  }}
                  disabled={isUploading}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}