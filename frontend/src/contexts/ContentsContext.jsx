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

    const getContentsSorted = useCallback((language) => {
        const languageContents = contents?.filter((content) => content.language == language);
        function findNextObject(currentNextPage) {
            return languageContents.find(obj => obj.pagePath === currentNextPage.nextPage);
        }
        
        // Ordenando a lista de objetos
        let orderedList = [];
        let currentObject = languageContents?.find(obj => obj.backPage === null);
        
        while (currentObject) {
            orderedList.push(currentObject);
            currentObject = findNextObject(currentObject);
        }

        return orderedList.reduce((acc, obj) => {
            const key = obj.module;
            if (!acc[key]) acc[key] = [];
            acc[key].push(obj);
            return acc;
        }, {});
        
    }, [contents]);

    const contextValue = useMemo(() => ({
            contents, 
            addContent: (content) => 
                addDoc(collection(db, 'contents'), content),
            getContentById,
            getContentByPagePath,
            removeContent,
            getContentsSorted,
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
