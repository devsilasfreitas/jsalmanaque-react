import { doc, updateDoc, addDoc, collection, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { formatCode } from "./formatCode";
import { updateOrderPages } from "./updateOrderPages";

export const sendForm = async (formObj, displayName, id) => {
    let form = {};
    if (formObj.backPageTitle !== 'none') {
        form.backPage = `/conteudos/${formObj.language}/${formObj.backPageModule}/${formObj.backPageTitle}`;
    } else {
        form.backPage = null;
    };

    form.pagePath = `/conteudos/${formObj.language}/${formObj.module}/${formObj.title}`;
    form.keyWords = formObj.keyWords;
    form.userName = displayName;
    form.updatedAt = new Date();
    form.htmlContent = formatCode(formObj.htmlContent, true);
    form.language = formObj.language;
    form.module = formObj.module;
    form.title = formObj.title;
    form.cssContent = formObj?.cssContent ? formObj.cssContent : "";
    form.nextPage = null;

    if (id) {
        const oldPage = await getDoc(doc(db, 'contents', id));
        await updateOrderPages(oldPage.data(), true);
        await updateOrderPages(form, false);
        return await updateDoc(doc(db, 'contents', id), form);
    } else {
        form.createdAt = new Date();
        await updateOrderPages(form, false);
        return await addDoc(collection(db, 'contents'), form);
    }
}
