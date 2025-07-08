import React, { useState, useEffect } from "react";
import ShowSubscribers from "./ShowSubscribers";
import { fetchContacts } from "./services/data.config";

function PhoneDirectory() {
  const [subscribersList, setSubscribersList] = useState([]);
  const [loading, setLoading] = useState(false); // สถานะ loading

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);           // เริ่ม loading
    const data = await fetchContacts();
    setSubscribersList(data);
    setLoading(false);          // โหลดเสร็จ
  };

  const addSubscriberHandler = (newSubscriber) => {
    const newId =
      subscribersList.length > 0
        ? subscribersList[subscribersList.length - 1].id + 1
        : 1;
    setSubscribersList([...subscribersList, { ...newSubscriber, id: newId }]);
  };

  const deleteSubscriberHandler = (id) => {
    setSubscribersList(subscribersList.filter((s) => s.id !== id));
  };

  return (
    <ShowSubscribers
      subscribersList={subscribersList}
      addSubscriberHandler={addSubscriberHandler}
      deleteSubscriberHandler={deleteSubscriberHandler}
      loading={loading}  // ส่ง loading ลงไปด้วย
    />
  );
}

export default PhoneDirectory;
