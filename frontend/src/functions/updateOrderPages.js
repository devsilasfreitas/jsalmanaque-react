import {  getDocs, collection, where, query, updateDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";

export const updateOrderPages = async (newPage, deleteOrEditIsTrue) => {
    if (!deleteOrEditIsTrue) {
        const nextTemp = await getDocs(query(collection(db, 'contents'), where('language', '==', newPage.language), where('backPage', '==', newPage.backPage)))
        let next
        nextTemp.forEach((doc) => {
            next = doc.data()
            next.id = doc.id
        });
        if (next) {
            let back
            const backTemp = await getDocs(query(collection(db, 'contents'), where('pagePath', '==', next.backPage)))
            backTemp.forEach((doc) => {
                back = doc.data()
                back.id = doc.id
            });
            if (back) {
                back.nextPage = newPage.pagePath
    
                await updateDoc(doc(db, 'contents', back.id), back)
            }
            newPage.nextPage = next.pagePath
            next.backPage = newPage.pagePath
            await updateDoc(doc(db, 'contents', next.id), next)
        } else {
            if (newPage.backPage) {
                let back
                const backTemp = await getDocs(query(collection(db, 'contents'), where('pagePath', '==', newPage.backPage)))
                backTemp.forEach((doc) => {
                    back = doc.data()
                    back.id = doc.id
                });
                back.nextPage = newPage.pagePath
    
                await updateDoc(doc(db, 'contents', back.id), back)
            }
        }
    } else {
        // this code block are called when the page is removed or on first time of edited
        let back
        const backTemp = await getDocs(query(collection(db, 'contents'), where('pagePath', '==', newPage.backPage)))
        backTemp.forEach((doc) => {
            back = doc.data()
            back.id = doc.id
        });
        const nextTemp = await getDocs(query(collection(db, 'contents'), where('pagePath', '==', newPage.nextPage)))
        let next
        nextTemp.forEach((doc) => {
            next = doc.data()
            next.id = doc.id
        });

        if (newPage.nextPage) {
    
            if (!newPage.backPage) {
                next.backPage = null
            } else {
                next.backPage = newPage.backPage
            }
            await updateDoc(doc(db, 'contents', next.id), next)
        }
        
        if (newPage.backPage) {
            
            if (!newPage.nextPage) {
                back.nextPage = null
            } else {
                back.nextPage = newPage.nextPage
            }
            await updateDoc(doc(db, 'contents', back.id), back)
            
        }
    }
}