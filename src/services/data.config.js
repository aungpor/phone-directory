// example.ts
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase"; // ✅ ปรับ path ให้ถูกต้อง

export async function fetchContacts() {
  const querySnapshot = await getDocs(collection(db, "test"));
  const contacts = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
//   console.log("📥 Firestore contacts:", contacts);
  return contacts;
}
