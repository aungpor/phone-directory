import { db } from '../firebase';
import { writeBatch, collection, doc, getDocs } from 'firebase/firestore';

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

// ดึงข้อมูลทั้งหมดจาก collection "employees"
export const getAllEmployees = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'employees'));
    const employees = [];

    querySnapshot.forEach((doc) => {
      employees.push({
        id: doc.id,
        ...doc.data()
      });
    });

    return { success: true, data: employees };
  } catch (error) {
    return { success: false, message: 'ไม่สามารถดึงข้อมูลจาก Firebase ได้: ' + error.message };
  }
};

// ลบข้อมูลทั้งหมดจาก collection "employees"
export const deleteAllEmployees = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'employees'));

    if (querySnapshot.empty) {
      return { success: true, message: 'ไม่มีข้อมูลให้ลบ' };
    }

    const batch = writeBatch(db);

    querySnapshot.forEach((docSnapshot) => {
      const docRef = doc(db, 'employees', docSnapshot.id);
      batch.delete(docRef);
    });

    await batch.commit();

    return { success: true, message: 'ลบข้อมูลทั้งหมดใน employees สำเร็จ' };
  } catch (error) {
    return { success: false, message: 'เกิดข้อผิดพลาดในการลบ: ' + error.message };
  }
};