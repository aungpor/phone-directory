import React, { useState } from "react";
import { Input, Table, Button } from "antd";
import Header from "./Header";
import "./ShowSubscribers.css";

const ShowSubscribers = ({ subscribersList, addSubscriberHandler, deleteSubscriberHandler, loading  }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({ name: null, phone: null });

  const handleInputChange = (field, value) => {
    if (field === "name") setName(value);
    else if (field === "phone") setPhone(value);

    // ล้าง error ขณะพิมพ์
    setErrors((prev) => ({
      ...prev,
      [field]: null,
    }));
  };

  const validateInputs = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!phone.trim()) newErrors.phone = "Phone is required";
    else if (!/^\d{10}$/.test(phone)) newErrors.phone = "Phone must be exactly 10 digits";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAdd = () => {
    if (!validateInputs()) return;

    addSubscriberHandler({ name, phone });

    setName("");
    setPhone("");
    setErrors({ name: null, phone: null });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "30%",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      width: "40%",
    },
    {
      title: "Action",
      key: "action",
      width: "30%",
      render: (_, record) => (
        <Button danger onClick={() => deleteSubscriberHandler(record.id)}>
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Header heading="Phone Directory" />
      <div className="component-body-container">
        <div style={{ marginBottom: "12px" }}>
          Name
          <Input
            value={name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            status={errors.name ? "error" : ""}
            placeholder="Enter name"
          />
          {errors.name && (
            <div style={{ color: "red", fontSize: "12px" }}>{errors.name}</div>
          )}
        </div>

        <div style={{ marginBottom: "12px" }}>
          Phone
          <Input
            value={phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            status={errors.phone ? "error" : ""}
            placeholder="Enter phone number"
          />
          {errors.phone && (
            <div style={{ color: "red", fontSize: "12px" }}>{errors.phone}</div>
          )}
        </div>

        <button className="custom-btn add-btn" onClick={handleAdd}>
          Add
        </button>
      </div>

      <Table
        columns={columns}
        dataSource={subscribersList}
        rowKey="id"
        pagination={false}
        loading={loading}
      />
    </div>
  );
};

export default ShowSubscribers;
