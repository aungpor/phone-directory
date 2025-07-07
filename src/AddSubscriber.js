import React, { Component } from "react";
import Header from "./Header";
import "./AddSubscriber.css";

class AddSubscriber extends Component {
  render() {
    return (
      <div>
        <Header heading="Add Subscriber" />
        <div className="component-body-container">
          <button className="custom-btn">Back</button>
        </div>
        <form className="subscriber-form">
          <label htmlFor="name" className="label-control">
            Name:{" "}
          </label>
          <br />
          <input type="text" id="name" name="name" className="input-control" />
          <br />
          <label htmlFor="phone" className="label-control">
            Phone:{" "}
          </label>
          <br />
          <input
            type="number"
            id="phone"
            name="phone"
            className="input-control"
          />
          <div className="subscriber-info-container">
            <span className="subscriber-to-add-heading">
              Subscriber to be added:{" "}
            </span>
            <br />
            <span className="subscriber-info">Name: </span>
            <br />
            <span className="subscriber-info">Phone: </span>
          </div>
          <button type="submit" className="custom-btn add-btn">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
export default AddSubscriber;
