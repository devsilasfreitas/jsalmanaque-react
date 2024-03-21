import { createContext, useCallback, useEffect, useMemo, useContext, useState } from "react";
import { db } from "../config/firebase";
import { addDoc, collection, deleteDoc, onSnapshot, doc } from "firebase/firestore";

const ContentsContext = createContext(undefined);

export const ContentsContextProvider = ({children}) => {
    const [contents, setContents] = useState();

    const getContentById = useCallback((id) => {
        return contents?.find((content) => content.id == id);
    },
    [contents]);

    const getContentByPagePath = useCallback((pagePath) => {
        return contents?.find((content) => content.pagePath == pagePath);
    },
    [contents]);

    const removeContent = async (contentId) => {
        await deleteDoc(doc(db, 'contents', contentId)).catch(error => console.log(error));
    };

    const contextValue = useMemo(() => ({
            contents, 
            addContent: (content) => 
                addDoc(collection(db, 'contents'), content),
            getContentById,
            getContentByPagePath,
            removeContent
        }),
        [contents, getContentById]
    );

    useEffect (() => {
        onSnapshot(collection(db, 'contents'), (snapshot) => {
            if (snapshot.docs.length > 0) {
                setContents(
                    snapshot.docs.map((content) => ({...content.data(), id: content.id}))
                );
            } else {
                setContents([]);
            }
        });
    }, []);

    return (
        <ContentsContext.Provider value={contextValue}>
            {children}
        </ContentsContext.Provider>
    );
};

export const useContents = () => {
    const context = useContext(ContentsContext)

    if (!context) {
        throw new Error('useContents deve ser usado com um ContentsContextProvider')
    }

    return context;
};
