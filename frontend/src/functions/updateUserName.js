import { getDocs, collection, where, query, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";

export const updateUserName = async (oldUserName, newUserName) => {
    const contentsByUser = await getDocs(query(collection(db, 'contents'), where('userName', '==', oldUserName)));
    contentsByUser.forEach((doc) => {
        const content = doc.data();
        content.userName = newUserName;
        updateDoc(doc.ref, content);
    });
    // window.location.reload();
}