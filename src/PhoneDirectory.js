import React, { Component } from "react";
import AddSubscriber from "./AddSubscriber";
import ShowSubscribers from "./ShowSubscribers";

class PhoneDirectory extends Component {
  constructor() {
    super();
    this.state = {
      subscribersList: [
        {
          id: 1,
          name: "asim",
          phone: "9999999999",
        },
        {
          id: 2,
          name: "wasim",
          phone: "88888888888",
        },
      ],
    };
  }

  addSubscriberHandler = (newSubscriber) => {
    let subscribersList = this.state.subscribersList;
    if (subscribersList.length > 0) {
      newSubscriber.id = subscribersList[subscribersList.length - 1].id + 1;
    } else {
      newSubscriber.id = 1;
    }
    subscribersList.push(newSubscriber);
    this.setState({ subscribersList: subscribersList });
  };

  deleteSubscriberHandler = (id) => {
    const updatedList = this.state.subscribersList.filter(
      (subscriber) => subscriber.id !== id
    );
    this.setState({ subscribersList: updatedList });
  };

  render() {
    return (
      <ShowSubscribers
        subscribersList={this.state.subscribersList}
        addSubscriberHandler={this.addSubscriberHandler}
        deleteSubscriberHandler={this.deleteSubscriberHandler}
      />
    );
  }
}

export default PhoneDirectory;