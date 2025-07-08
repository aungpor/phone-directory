// src/services/example.ts
import { collection, getDocs, addDoc, deleteDoc, doc, orderBy, query, serverTimestamp  } from "firebase/firestore";
import { db } from "../firebase"; // ✅ ปรับ path ให้ถูก

const COLLECTION_NAME = "phoneNumber";

// 🔹 ดึงข้อมูล
export async function fetchContacts() {
  const q = query(
    collection(db, COLLECTION_NAME),
    orderBy("createdAt", "desc") // 🔹 เรียงจากใหม่ไปเก่า
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

// 🔹 เพิ่มข้อมูลใหม่
export async function addContact(newContact) {
  const docRef = await addDoc(collection(db, "phoneNumber"), {
    ...newContact,
    createdAt: serverTimestamp(), // 🔹 ให้ Firestore ใส่เวลาปัจจุบันให้
  });
  return { id: docRef.id, ...newContact };
}

// 🔹 ลบข้อมูลตาม id
export async function deleteContact(id) {
  await deleteDoc(doc(db, COLLECTION_NAME, id));
}
