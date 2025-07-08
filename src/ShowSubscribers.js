import React, { Component } from "react";
import { Input, Table, Button } from "antd";
import Header from "./Header";
import "./ShowSubscribers.css";

class ShowSubscribers extends Component {
  state = {
    name: "",
    phone: "",
    errors: {
      name: null,
      phone: null,
    },
  };

  handleInputChange = (field, value) => {
    this.setState({ [field]: value });

    // ล้าง error ขณะพิมพ์ใหม่
    this.setState((prevState) => ({
      errors: {
        ...prevState.errors,
        [field]: null,
      },
    }));
  };

  validateInputs = () => {
  const { name, phone } = this.state;
  const errors = {};

  if (!name.trim()) {
    errors.name = "Name is required";
  }

  if (!phone.trim()) {
    errors.phone = "Phone is required";
  } else if (!/^\d{10}$/.test(phone)) {
    errors.phone = "Phone must be exactly 10 digits";
  }

  this.setState({ errors });
  return Object.keys(errors).length === 0;
};


  handleAdd = () => {
    if (!this.validateInputs()) return;

    const { name, phone } = this.state;
    this.props.addSubscriberHandler({ name, phone });

    this.setState({
      name: "",
      phone: "",
      errors: { name: null, phone: null },
    });
  };

  render() {
    const { name, phone, errors } = this.state;

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
          <Button
            danger
            onClick={() => this.props.deleteSubscriberHandler(record.id)}
          >
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
              onChange={(e) => this.handleInputChange("name", e.target.value)}
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
              onChange={(e) => this.handleInputChange("phone", e.target.value)}
              status={errors.phone ? "error" : ""}
              placeholder="Enter phone number"
            />
            {errors.phone && (
              <div style={{ color: "red", fontSize: "12px" }}>{errors.phone}</div>
            )}
          </div>

          <button className="custom-btn add-btn" onClick={this.handleAdd}>
            Add
          </button>
        </div>

        <Table
          columns={columns}
          dataSource={this.props.subscribersList}
          rowKey="id"
          pagination={false}
        />
      </div>
    );
  }
}

export default ShowSubscribers;
