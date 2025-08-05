import { db } from '../firebase';
import { writeBatch, collection, doc } from 'firebase/firestore';

export const uploadToFirebase = async (employeeData) => {
  const BATCH_SIZE = 500;
  try {
    for (let i = 0; i < employeeData.length; i += BATCH_SIZE) {
      const batch = writeBatch(db);
      const chunk = employeeData.slice(i, i + BATCH_SIZE);

      chunk.forEach((emp) => {
        const docRef = doc(collection(db, 'employees'), emp.id.toString());
        batch.set(docRef, emp);
      });

      await batch.commit();
      console.log(`✅ อัปโหลดชุด ${i / BATCH_SIZE + 1}`);
    }

    return { success: true, message: 'อัปโหลดข้อมูลไปยัง Firebase สำเร็จ' };
  } catch (error) {
    return { success: false, message: 'ไม่สามารถอัปโหลดไปยัง Firebase ได้: ' + error.message };
  }
};
