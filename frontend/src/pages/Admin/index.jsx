import { useContext, useEffect, useRef, useState } from "react";
import { useAuth } from "../../contexts/UserContext";
import { updateProfile } from "firebase/auth";
import { useName } from "../../layouts/AdminLayout";
import { contentsFunctions } from "../../functions/contentsFunctions";
import { useContents } from "../../contexts/ContentsContext";
import styles from './admin.module.css';

export default function Admin () {

    //TODO: fazer a logica dos cards
    const {user} = useAuth();
    const dialog = useRef();
    const [displayName, setDisplayName] = useContext(useName);
    const [displayNameInput, setDisplayNameInput] = useState("");
    const {contents} = useContents();
    const [languages, setLanguages] = useState(0);
    const [modules, setModules] = useState(0);
    const [titles, setTitles] = useState(0);
    const { getLanguages, getAllModules, getAllTitles } = contentsFunctions(contents);
    
    useEffect(() => {
        const languages = getLanguages().length;
        const modules = getAllModules().length;
        const titles = getAllTitles().length;

        setLanguages(languages);
        setModules(modules);
        setTitles(titles);
    }, [contents]);

    useEffect(() => setDisplayName(displayName), [])

    const onClick = () => {
        updateProfile(user, {displayName: displayNameInput}).then(() => {
            setDisplayName(user.displayName);
        });
    }

    return (
        <>
            <dialog ref={dialog}  className={styles.dialog}>
                {dialog.current?.showModal()}
                {!displayName ? (
                    <form>
                        <label>
                            Insira seu nome: 
                            <input type="text" value={displayNameInput} onChange={(ev) => setDisplayNameInput(ev.target.value)} />
                        </label>
                        <button onClick={(ev) => {
                            ev.preventDefault();
                            onClick();
                        }}>Enviar</button>
                    </form>
                ) : (
                    <>
                        <h3>Olá {user.displayName}!</h3>
                        <button onClick={() => dialog.current.close()}>Fechar</button>
                    </>
                )}
            </dialog>
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