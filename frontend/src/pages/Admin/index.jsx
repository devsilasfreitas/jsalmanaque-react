import { useEffect, useState } from "react";
import { contentsFunctions } from "../../functions/contentsFunctions";
import { useContents } from "../../contexts/ContentsContext";

import styles from './admin.module.css';

export default function Admin () {

    //TODO: fazer a logica dos cards
    const {contents} = useContents();
    const [languages, setLanguages] = useState(0);
    const [modules, setModules] = useState(0);
    const [titles, setTitles] = useState(0);
    const [access, setAccess] = useState(0);
    const { getLanguages, getAllModules, getAllTitles } = contentsFunctions(contents);
    
    useEffect(() => {
        const languages = getLanguages().length;
        const modules = getAllModules().length;
        const titles = getAllTitles().length;

        setLanguages(languages);
        setModules(modules);
        setTitles(titles);
    }, [contents]);

    return (
        <>
            <div className={styles.menu}>
                <div className={styles.box}>
                    <h3 className={styles.title}>LINGUAGENS</h3>
                    <p className={styles.number}>{languages}</p>
                </div>
                <div className={styles.box}>
                    <h3 className={styles.title}>MÓDULOS</h3>
                    <p className={styles.number}>{modules}</p>
                </div>
                <div className={styles.box}>
                    <h3 className={styles.title}>TÍTULOS</h3>
                    <p className={styles.number}>{titles}</p>
                </div>
            </div>
        </>
    )


}