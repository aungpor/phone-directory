import React, { Component } from "react";
import Header from "./Header";
import { Input } from "antd";
import "./ShowSubscribers.css";

class ShowSubscribers extends Component {
  state = {
    name: "",
    phone: "",
  };

  handleInputChange = (field, value) => {
    this.setState({ [field]: value });
  };

  handleAdd = () => {
    const { name, phone } = this.state;
    if (name && phone) {
      this.props.addSubscriberHandler({ name, phone });
      this.setState({ name: "", phone: "" });
    }
  };

  render() {
    return (
      <div>
        <Header heading="Phone Directory" />
        <div className="component-body-container">
          <div>
            Name
            <Input
              value={this.state.name}
              onChange={(e) =>
                this.handleInputChange("name", e.target.value)
              }
            />
          </div>
          <div>
            Phone
            <Input
              value={this.state.phone}
              onChange={(e) =>
                this.handleInputChange("phone", e.target.value)
              }
            />
          </div>

          <button className="custom-btn add-btn" onClick={this.handleAdd}>
            Add
          </button>
        </div>

        <div className="grid-container heading-container">
          <span className="grid-item name-heading">Name</span>
          <span className="grid-item phone-heading">Phone</span>
        </div>

        {this.props.subscribersList.map((sub) => (
          <div className="grid-container" key={sub.id}>
            <span className="grid-item">{sub.name}</span>
            <span className="grid-item">{sub.phone}</span>
            <span className="grid-item action-btn-container">
              <button
                className="custom-btn delete-btn"
                onClick={() =>
                  this.props.deleteSubscriberHandler(sub.id)
                }
              >
                Delete
              </button>
            </span>
          </div>
        ))}
        
      </div>
    );
  }
}

export default ShowSubscribers;