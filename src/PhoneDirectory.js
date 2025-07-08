import React, { useState, useEffect } from "react";
import ShowSubscribers from "./ShowSubscribers";
import { fetchContacts, addContact, deleteContact } from "./services/data.config";

function PhoneDirectory() {
  const [subscribersList, setSubscribersList] = useState([]);
  const [loading, setLoading] = useState(false); // สถานะ loading

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true); // ✅ เริ่ม loading
    try {
      const data = await fetchContacts();
      console.log(data);
      
      setSubscribersList(data);
    } catch (error) {
      console.error("❌ Error fetching contacts:", error);
    } finally {
      setLoading(false); // ✅ หยุด loading เสมอ
    }
  };

  const addSubscriberHandler = async (newSubscriber) => {
    setLoading(true); // ✅ เริ่ม loading ตอน add
    try {
      const added = await addContact(newSubscriber);
      setSubscribersList((prev) => [added,...prev]);
    } catch (error) {
      console.error("❌ Error adding contact:", error);
    } finally {
      setLoading(false); // ✅ หยุด loading
    }
  };

  const deleteSubscriberHandler = async (id) => {
    setLoading(true); // ✅ เริ่ม loading ตอน delete
    try {
      await deleteContact(id);
      setSubscribersList((prev) => prev.filter((s) => s.id !== id));
    } catch (error) {
      console.error("❌ Error deleting contact:", error);
    } finally {
      setLoading(false); // ✅ หยุด loading
    }
  };

  return (
    <ShowSubscribers
      subscribersList={subscribersList}
      addSubscriberHandler={addSubscriberHandler}
      deleteSubscriberHandler={deleteSubscriberHandler}
      loading={loading} // ✅ ให้ Table loading ด้วย
    />
  );
}

export default PhoneDirectory;
