import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Settings,
  Bell,
  Grid3X3,
  Home,
  FileText,
  Calendar,
  Users,
  User,
  Phone,
  Mail,
  Linkedin,
  Facebook,
  Twitter,
  MessageCircle,
  Upload,
  Download,
  Loader,
} from "lucide-react";
import Papa from "papaparse";
import { uploadToFirebase, getAllEmployees } from "../services/data.config";

export default function ThaiPhoneDirectory({ initialEmployees = [] }) {
  const [employees, setEmployees] = useState(initialEmployees);
  const [selectedEmployee, setSelectedEmployee] = useState(initialEmployees[0] || {});
  

  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    fetchData(); // เรียกใช้ async function ที่อยู่ข้างใน useEffect
  }, []);

  const fetchData = async () => {
    const response = await getAllEmployees();
    if (response.success) {
      setEmployees(response.data);
    } else {
      console.error("Error:", response.message);
    }
  };

  // Filter employees based on search term
  const filteredEmployees = employees.filter((employee) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      (employee.thaiName || "").toLowerCase().includes(searchLower) ||
      (employee.englishName || "").toLowerCase().includes(searchLower) ||
      (employee.nickname || "").toLowerCase().includes(searchLower) ||
      (employee.department || "").toLowerCase().includes(searchLower) ||
      (employee.position || "").toLowerCase().includes(searchLower) ||
      (employee.extension || "").includes(searchTerm) ||
      (employee.departmentPhone || "").includes(searchTerm) ||
      (employee.email || "").toLowerCase().includes(searchLower)
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

  const handleCSVUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true);
    setUploadStatus("กำลังแปลงไฟล์ CSV...");

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: async (results) => {
        try {
          setUploadStatus("กำลังประมวลผลข้อมูลพนักงาน...");

          // Process CSV data
          const processedEmployees = results.data.map((row, index) => ({
            id: row.id || employees.length + index + 1,
            thaiName: (
              row.thaiName ||
              row["ชื่อ-นามสกุล (ไทย)"] ||
              ""
            ).toString(),
            nickname: (row.nickname || row["ชื่อเล่น"] || "").toString(),
            level: (row.level || row["ชั้น"] || "").toString(),
            extension: (
              row.extension ||
              row["เบอร์โทรศัพท์ภายใน"] ||
              ""
            ).toString(),
            departmentPhone: (
              row.departmentPhone ||
              row["เบอร์ส่วนงาน"] ||
              ""
            ).toString(),
            englishName: (
              row.englishName ||
              row["ชื่อ-นามสกุล (อังกฤษ)"] ||
              ""
            ).toString(),
            position: (row.position || row["ชื่อตำแหน่ง"] || "").toString(),
            jobType: (row.jobType || row["ลักษณะงาน"] || "").toString(),
            department: (
              row.department ||
              row["ชื่อหน่วยงาน"] ||
              ""
            ).toString(),
            email: (row.email || row["ชื่ออีเมล์"] || "").toString(),
            employeeGroup: (
              row.employeeGroup ||
              row["กลุ่มพนักงาน"] ||
              "พนักงานประจำ"
            ).toString(),
            status: (row.status || "ปฏิบัติงาน").toString(),
            initials:
              (row.englishName || row["ชื่อ-นามสกุล (อังกฤษ)"] || "")
                .toString()
                .split(" ")
                .map((n) => n[0] || "")
                .join("")
                .toUpperCase() || "N/A",
          }));

          setUploadStatus("กำลังอัปโหลดไปยัง Firebase...");

          // Upload to Firebase
          const result = await uploadToFirebase(processedEmployees);

          if (result.success) {
            setEmployees(processedEmployees);
            setUploadStatus(
              "✅ อัปโหลดข้อมูลพนักงาน " +
                processedEmployees.length +
                " คน ไปยัง Firebase สำเร็จ!"
            );
          } else {
            setUploadStatus("❌ " + result.message);
          }
        } catch (error) {
          setUploadStatus(
            "❌ เกิดข้อผิดพลาดในการประมวลผลไฟล์: " + error.message
          );
        }

        setIsUploading(false);
        setTimeout(() => {
          setUploadStatus("");
          setShowUploadModal(false);
        }, 3000);
      },
      error: (error) => {
        setUploadStatus("❌ เกิดข้อผิดพลาดในการอ่านไฟล์ CSV: " + error.message);
        setIsUploading(false);
      },
    });

    // Reset file input
    event.target.value = "";
  };

  const downloadSampleCSV = () => {
    const sampleData = [
      {
        "ชื่อ-นามสกุล (ไทย)": "นายตัวอย่าง ทดสอบ",
        ชื่อเล่น: "ตัวอย่าง",
        ชั้น: "ระดับ 5",
        เบอร์โทรศัพท์ภายใน: "1111",
        เบอร์ส่วนงาน: "02-111-1111",
        "ชื่อ-นามสกุล (อังกฤษ)": "Mr. Example Test",
        ชื่อตำแหน่ง: "ตำแหน่งตัวอย่าง",
        ลักษณะงาน: "งานตัวอย่าง",
        ชื่อหน่วยงาน: "ฝ่ายตัวอย่าง",
        ชื่ออีเมล์: "example.test@company.co.th",
        กลุ่มพนักงาน: "พนักงานประจำ",
      },
    ];

    const csv = Papa.unparse(sampleData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "employee_sample_thai.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleEmployeeClick = (employee) => {
    setSelectedEmployee({
      thaiName: employee.thaiName || "ไม่ระบุชื่อ",
      nickname: employee.nickname || "-",
      level: employee.level || "-",
      extension: employee.extension || "-",
      departmentPhone: employee.departmentPhone || "-",
      englishName: employee.englishName || "-",
      position: employee.position || "ไม่ระบุตำแหน่ง",
      jobType: employee.jobType || "-",
      department: employee.department || "ไม่ระบุฝ่าย",
      email: employee.email || "-",
      employeeGroup: employee.employeeGroup || "พนักงานประจำ",
      status: employee.status || "ปฏิบัติงาน",
    });
  };

  const headerStyle = {
    background: "white",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    borderBottom: "1px solid #e5e7eb",
    padding: "16px 24px",
  };

  const cardStyle = {
    background: "white",
    borderRadius: "8px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
    padding: "24px",
  };

  const inputStyle = {
    border: "1px solid #d1d5db",
    borderRadius: "6px",
    padding: "8px 12px",
    outline: "none",
    fontSize: "14px",
  };

  const buttonStyle = {
    background: "#10b981",
    color: "white",
    border: "none",
    borderRadius: "6px",
    padding: "8px 16px",
    cursor: "pointer",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    overflow: "hidden",
  };

  const thStyle = {
    background: "#f9fafb",
    padding: "12px 16px",
    textAlign: "left",
    fontSize: "12px",
    fontWeight: "500",
    color: "#6b7280",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  };

  const tdStyle = {
    padding: "16px",
    borderBottom: "1px solid #e5e7eb",
    fontSize: "14px",
  };

  const avatarStyle = {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background: "#10b981",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
    fontWeight: "500",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f3f4f6",
        fontFamily: "Sarabun, Arial, sans-serif",
      }}
    >
      <div style={{ padding: "24px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "24px",
          }}
        >
          {/* Employee Directory */}
          <div style={cardStyle}>
            {/* Breadcrumb */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "14px",
                color: "#6b7280",
                marginBottom: "16px",
              }}
            >
              <Home size={14} />
              <span>/</span>
              <span>พนักงาน</span>
            </div>

            <h2
              style={{
                fontSize: "24px",
                fontWeight: "600",
                marginBottom: "24px",
              }}
            >
              ข้อมูลพนักงาน
            </h2>

            <div
              style={{
                display: "flex",
                gap: "12px",
                marginBottom: "24px",
                flexWrap: "wrap",
              }}
            >
              <button style={buttonStyle}>เพิ่มพนักงาน</button>
              <button
                style={{ ...buttonStyle, background: "#3b82f6" }}
                onClick={() => setShowUploadModal(true)}
              >
                <Upload size={16} />
                อัปโหลด CSV
              </button>
              <button
                style={{ ...buttonStyle, background: "#6366f1" }}
                onClick={downloadSampleCSV}
              >
                <Download size={16} />
                ตัวอย่าง CSV
              </button>
            </div>

            {/* Search */}
            <div style={{ marginBottom: "24px" }}>
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  maxWidth: "500px",
                }}
              >
                <Search
                  style={{
                    position: "absolute",
                    left: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#9ca3af",
                  }}
                  size={16}
                />
                <input
                  type="text"
                  placeholder="ค้นหาด้วย ชื่อ, เบอร์ภายใน, ฝ่าย, ตำแหน่ง, อีเมล..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    ...inputStyle,
                    paddingLeft: "40px",
                    width: "100%",
                    fontSize: "14px",
                  }}
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    style={{
                      position: "absolute",
                      right: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      color: "#9ca3af",
                      cursor: "pointer",
                      fontSize: "18px",
                    }}
                  >
                    ×
                  </button>
                )}
              </div>
              <div
                style={{ marginTop: "8px", fontSize: "14px", color: "#6b7280" }}
              >
                พบพนักงาน {filteredEmployees.length} คน
                {searchTerm && ` สำหรับ "${searchTerm}"`}
              </div>
            </div>

            {/* Employee Table */}
            <div style={{ overflowX: "auto" }}>
              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th style={thStyle}>ชื่อ-นามสกุล</th>
                    <th style={thStyle}>ตำแหน่ง/ฝ่าย</th>
                    <th style={thStyle}>เบอร์ส่วนงาน</th>
                    <th style={thStyle}>อีเมล</th>
                  </tr>
                </thead>
                <tbody>
                  {currentEmployees.map((employee) => (
                    <tr
                      key={employee.id}
                      style={{ cursor: "pointer" }}
                      onClick={() => handleEmployeeClick(employee)}
                      onMouseEnter={(e) =>
                        (e.target.closest("tr").style.background = "#f9fafb")
                      }
                      onMouseLeave={(e) =>
                        (e.target.closest("tr").style.background = "white")
                      }
                    >
                      <td style={tdStyle}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <div style={avatarStyle}>
                            {employee.initials || "N/A"}
                          </div>
                          <div style={{ marginLeft: "16px" }}>
                            <div
                              style={{ fontSize: "14px", fontWeight: "500" }}
                            >
                              {employee.thaiName || "ไม่ระบุชื่อ"}
                            </div>
                            <div style={{ fontSize: "12px", color: "#6b7280" }}>
                              {employee.nickname && `(${employee.nickname})`}{" "}
                              {employee.englishName}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td style={tdStyle}>
                        <div>
                          <div style={{ fontSize: "14px", fontWeight: "500" }}>
                            {employee.position || "ไม่ระบุตำแหน่ง"}
                          </div>
                          <div style={{ fontSize: "12px", color: "#6b7280" }}>
                            {employee.department || "ไม่ระบุฝ่าย"}
                          </div>
                        </div>
                      </td>
                      <td style={tdStyle}>{employee.departmentPhone || "-"}</td>
                      <td style={tdStyle}>{employee.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "24px",
                  padding: "16px 0",
                }}
              >
                <div style={{ fontSize: "14px", color: "#6b7280" }}>
                  แสดง {startIndex + 1} ถึง{" "}
                  {Math.min(endIndex, filteredEmployees.length)} จาก{" "}
                  {filteredEmployees.length} คน
                </div>

                <div
                  style={{ display: "flex", gap: "8px", alignItems: "center" }}
                >
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    style={{
                      padding: "8px 12px",
                      border: "1px solid #d1d5db",
                      background: currentPage === 1 ? "#f9fafb" : "white",
                      color: currentPage === 1 ? "#9ca3af" : "#374151",
                      borderRadius: "6px",
                      cursor: currentPage === 1 ? "not-allowed" : "pointer",
                      fontSize: "14px",
                    }}
                  >
                    ก่อนหน้า
                  </button>

                  <div
                    style={{
                      display: "flex",
                      gap: "4px",
                      alignItems: "center",
                    }}
                  >
                    {(() => {
                      const maxVisiblePages = 5;
                      let startPage, endPage;

                      if (totalPages <= maxVisiblePages) {
                        // แสดงทุกหน้าถ้าไม่เกิน maxVisiblePages
                        startPage = 1;
                        endPage = totalPages;
                      } else {
                        // คำนวณช่วงหน้าที่จะแสดง
                        const halfVisible = Math.floor(maxVisiblePages / 2);

                        if (currentPage <= halfVisible) {
                          startPage = 1;
                          endPage = maxVisiblePages;
                        } else if (currentPage + halfVisible >= totalPages) {
                          startPage = totalPages - maxVisiblePages + 1;
                          endPage = totalPages;
                        } else {
                          startPage = currentPage - halfVisible;
                          endPage = currentPage + halfVisible;
                        }
                      }

                      const pages = [];

                      // หน้าแรก + "..."
                      if (startPage > 1) {
                        pages.push(
                          <button
                            key={1}
                            onClick={() => setCurrentPage(1)}
                            style={{
                              width: "36px",
                              height: "36px",
                              border: "1px solid #d1d5db",
                              background: "white",
                              color: "#374151",
                              borderRadius: "6px",
                              cursor: "pointer",
                              fontSize: "14px",
                            }}
                          >
                            1
                          </button>
                        );

                        if (startPage > 2) {
                          pages.push(
                            <span
                              key="start-ellipsis"
                              style={{ padding: "0 8px", color: "#6b7280" }}
                            >
                              ...
                            </span>
                          );
                        }
                      }

                      // หน้าในช่วงที่แสดง
                      for (let page = startPage; page <= endPage; page++) {
                        pages.push(
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            style={{
                              width: "36px",
                              height: "36px",
                              border: "1px solid #d1d5db",
                              background:
                                currentPage === page ? "#10b981" : "white",
                              color: currentPage === page ? "white" : "#374151",
                              borderRadius: "6px",
                              cursor: "pointer",
                              fontSize: "14px",
                              fontWeight: currentPage === page ? "600" : "400",
                            }}
                          >
                            {page}
                          </button>
                        );
                      }

                      // "..." + หน้าสุดท้าย
                      if (endPage < totalPages) {
                        if (endPage < totalPages - 1) {
                          pages.push(
                            <span
                              key="end-ellipsis"
                              style={{ padding: "0 8px", color: "#6b7280" }}
                            >
                              ...
                            </span>
                          );
                        }

                        pages.push(
                          <button
                            key={totalPages}
                            onClick={() => setCurrentPage(totalPages)}
                            style={{
                              width: "36px",
                              height: "36px",
                              border: "1px solid #d1d5db",
                              background: "white",
                              color: "#374151",
                              borderRadius: "6px",
                              cursor: "pointer",
                              fontSize: "14px",
                            }}
                          >
                            {totalPages}
                          </button>
                        );
                      }

                      return pages;
                    })()}
                  </div>

                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    style={{
                      padding: "8px 12px",
                      border: "1px solid #d1d5db",
                      background:
                        currentPage === totalPages ? "#f9fafb" : "white",
                      color: currentPage === totalPages ? "#9ca3af" : "#374151",
                      borderRadius: "6px",
                      cursor:
                        currentPage === totalPages ? "not-allowed" : "pointer",
                      fontSize: "14px",
                    }}
                  >
                    ถัดไป
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Employee Profile Card */}
          <div style={cardStyle}>
            {/* Profile Header */}
            <div style={{ textAlign: "center", marginBottom: "24px" }}>
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  background: "#10b981",
                  color: "white",
                  borderRadius: "50%",
                  margin: "0 auto 16px auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "24px",
                  fontWeight: "500",
                }}
              >
                {(selectedEmployee.englishName || "Unknown")
                  .split(" ")
                  .map((n) => n[0] || "")
                  .join("")}
              </div>
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  margin: "0 0 4px 0",
                }}
              >
                {selectedEmployee.thaiName}
              </h3>
              <p
                style={{
                  fontSize: "14px",
                  color: "#6b7280",
                  margin: "0 0 4px 0",
                }}
              >
                {selectedEmployee.nickname && `(${selectedEmployee.nickname})`}
              </p>
              <p
                style={{
                  fontSize: "14px",
                  color: "#6b7280",
                  margin: "0 0 8px 0",
                }}
              >
                {selectedEmployee.englishName}
              </p>
            </div>

            <hr
              style={{
                border: "none",
                borderTop: "1px solid #e5e7eb",
                margin: "24px 0",
              }}
            />

            {/* Contact Information */}
            <div style={{ marginBottom: "24px" }}>
              <h4
                style={{
                  fontWeight: "600",
                  marginBottom: "12px",
                  fontSize: "16px",
                }}
              >
                ข้อมูลติดต่อ
              </h4>
              <div style={{ fontSize: "14px", lineHeight: "1.6" }}>
                <div style={{ marginBottom: "8px" }}>
                  <span style={{ fontWeight: "500" }}>เบอร์ภายใน:</span>{" "}
                  {selectedEmployee.extension}
                </div>
                <div style={{ marginBottom: "8px" }}>
                  <span style={{ fontWeight: "500" }}>เบอร์ส่วนงาน:</span>{" "}
                  {selectedEmployee.departmentPhone}
                </div>
                <div style={{ marginBottom: "8px" }}>
                  <span style={{ fontWeight: "500" }}>อีเมล:</span>{" "}
                  {selectedEmployee.email}
                </div>
              </div>
            </div>

            <hr
              style={{
                border: "none",
                borderTop: "1px solid #e5e7eb",
                margin: "24px 0",
              }}
            />

            {/* Work Information */}
            <div style={{ marginBottom: "24px" }}>
              <h4
                style={{
                  fontWeight: "600",
                  marginBottom: "12px",
                  fontSize: "16px",
                }}
              >
                ข้อมูลการทำงาน
              </h4>
              <div style={{ fontSize: "14px", lineHeight: "1.6" }}>
                <div style={{ marginBottom: "8px" }}>
                  <span style={{ fontWeight: "500" }}>ตำแหน่ง:</span>{" "}
                  {selectedEmployee.position}
                </div>
                <div style={{ marginBottom: "8px" }}>
                  <span style={{ fontWeight: "500" }}>ลักษณะงาน:</span>{" "}
                  {selectedEmployee.jobType}
                </div>
                <div style={{ marginBottom: "8px" }}>
                  <span style={{ fontWeight: "500" }}>หน่วยงาน:</span>{" "}
                  {selectedEmployee.department}
                </div>
                <div style={{ marginBottom: "8px" }}>
                  <span style={{ fontWeight: "500" }}>ระดับ:</span>{" "}
                  {selectedEmployee.level}
                </div>
                <div style={{ marginBottom: "8px" }}>
                  <span style={{ fontWeight: "500" }}>กลุ่มพนักงาน:</span>{" "}
                  {selectedEmployee.employeeGroup}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Upload Modal */}
        {showUploadModal && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0,0,0,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
            }}
          >
            <div
              style={{
                background: "white",
                borderRadius: "12px",
                padding: "32px",
                width: "500px",
                maxWidth: "90vw",
              }}
            >
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  marginBottom: "16px",
                }}
              >
                อัปโหลดไฟล์ CSV พนักงาน
              </h3>

              <div style={{ marginBottom: "24px" }}>
                <p style={{ color: "#6b7280", marginBottom: "16px" }}>
                  อัปโหลดไฟล์ CSV เพื่ออัปเดตข้อมูลพนักงานใน Firebase ไฟล์ CSV
                  ควรมีคอลัมน์ดังนี้: ชื่อ-นามสกุล (ไทย), ชื่อเล่น, ชั้น,
                  เบอร์โทรศัพท์ภายใน, เบอร์ส่วนงาน, ชื่อ-นามสกุล (อังกฤษ),
                  ชื่อตำแหน่ง, ลักษณะงาน, ชื่อหน่วยงาน, ชื่ออีเมล์, กลุ่มพนักงาน
                </p>

                <div
                  style={{
                    border: "2px dashed #d1d5db",
                    borderRadius: "8px",
                    padding: "32px",
                    textAlign: "center",
                    background: "#f9fafb",
                  }}
                >
                  <Upload
                    size={48}
                    color="#9ca3af"
                    style={{ margin: "0 auto 16px" }}
                  />
                  <p style={{ marginBottom: "16px" }}>
                    ลากไฟล์ CSV มาที่นี่ หรือคลิกเพื่อเลือกไฟล์
                  </p>
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleCSVUpload}
                    style={{ display: "none" }}
                    id="csv-upload"
                    disabled={isUploading}
                  />
                  <label
                    htmlFor="csv-upload"
                    style={{
                      ...buttonStyle,
                      display: "inline-flex",
                      cursor: isUploading ? "not-allowed" : "pointer",
                      opacity: isUploading ? 0.6 : 1,
                    }}
                  >
                    {isUploading && (
                      <Loader
                        size={16}
                        style={{ animation: "spin 1s linear infinite" }}
                      />
                    )}
                    {isUploading ? "กำลังประมวลผล..." : "เลือกไฟล์"}
                  </label>
                </div>
              </div>

              {uploadStatus && (
                <div
                  style={{
                    padding: "12px",
                    borderRadius: "6px",
                    marginBottom: "16px",
                    background: uploadStatus.includes("✅")
                      ? "#dcfce7"
                      : uploadStatus.includes("❌")
                      ? "#fee2e2"
                      : "#e0f2fe",
                    color: uploadStatus.includes("✅")
                      ? "#16a34a"
                      : uploadStatus.includes("❌")
                      ? "#dc2626"
                      : "#0369a1",
                    fontSize: "14px",
                  }}
                >
                  {uploadStatus}
                </div>
              )}

              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  justifyContent: "flex-end",
                }}
              >
                <button
                  onClick={downloadSampleCSV}
                  style={{
                    ...buttonStyle,
                    background: "#6b7280",
                  }}
                >
                  ดาวน์โหลดตัวอย่าง
                </button>
                <button
                  onClick={() => setShowUploadModal(false)}
                  style={{
                    background: "white",
                    color: "#6b7280",
                    border: "1px solid #d1d5db",
                    borderRadius: "6px",
                    padding: "8px 16px",
                    cursor: "pointer",
                  }}
                  disabled={isUploading}
                >
                  ปิด
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
          
          @import url('https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;500;600&display=swap');
        `}
      </style>
    </div>
  );
}


export async function getServerSideProps() {
  const response = await getAllEmployees();

  if (!response.success) {
    return {
      props: {
        initialEmployees: [],
      },
    };
  }

  return {
    props: {
      initialEmployees: response.data,
    },
  };
}