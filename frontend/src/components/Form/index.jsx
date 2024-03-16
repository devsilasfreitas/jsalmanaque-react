import { useState, useRef, useEffect } from "react";
import styles from './index.module.css'
import { useContents } from "../../contexts/ContentsContext";
import { contentsFunctions } from "../../functions/contentsFunctions";
import { sendForm } from "../../functions/sendForm";
import { useAuth } from "../../contexts/UserContext";
import { useParams } from "react-router-dom";
import { formatCode } from "../../functions/formatCode";

export default function Form({ formObj }) {
    const form = useRef();
    const { id } = useParams();
    const { user } = useAuth();
    const { contents } = useContents();
    const [languages, setLanguages] = useState([]);
    const [modules, setModules] = useState([]);
    const [backModules, setBackModules] = useState([]);
    const [backTitles, setBackTitles] = useState([]);

    const [languageSelected, setLanguageSelect] = useState("");
    const [moduleSelected, setModuleSelect] = useState("");
    const [backModuleSelected, setBackModuleSelect] = useState("");
    const [backTitleSelected, setBackTitleSelect] = useState("");

    const { getLanguages, getModules, getTitles } = contentsFunctions(contents);

    const [existsLanguage, setExistsLanguage] = useState(true);
    const [existsModule, setExistsModule] = useState(true);
    const [customCss, setCustomCss] = useState(false);

    useEffect(() => {
        const fetchedLanguages = getLanguages();
        setLanguages(fetchedLanguages);
        if (fetchedLanguages.length > 0) {
            setLanguageSelect(fetchedLanguages[0]); // Define a primeira linguagem como selecionada por padrão
            setExistsLanguage(true);
        }
    }, [contents]); // Atualize sempre que o conteúdo for alterado

    useEffect(() => {
        if (languageSelected) {
            const fetchedModules = getModules(languageSelected);
            setModules(fetchedModules);
            setBackModules(fetchedModules);
            if (fetchedModules.length > 0) {
                setModuleSelect(fetchedModules[0]); // Define o primeiro módulo como selecionado por padrão
                setBackModuleSelect(fetchedModules[0]);
            }
        }
    }, [languageSelected]); // Atualize sempre que a linguagem selecionada for alterada

    useEffect(() => {
        if (backModuleSelected) {
            const fetchedBackTitles = getTitles(languageSelected, backModuleSelected);
            setBackTitles(fetchedBackTitles);
            if (fetchedBackTitles.length > 0) {
                setBackTitleSelect(fetchedBackTitles[0]);
            }
        }
    }, [backModuleSelected]);
    
    // Novo useEffect para carregar os títulos anteriores quando a linguagem selecionada mudar
    useEffect(() => {
        if (backModules.length > 0 && backModuleSelected && languageSelected) {
            const fetchedBackTitles = getTitles(languageSelected, backModuleSelected);
            setBackTitles(fetchedBackTitles);
            if (fetchedBackTitles.length > 0) {
                setBackTitleSelect(fetchedBackTitles[0]);
            }
        }
    }, [languageSelected]); // Atualize sempre que a linguagem selecionada for alterada

    const dialog = useRef();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(form.current);
        const data = {};
        formData.forEach((value, key) => {
            if (key !== '' && value !== 'on') data[key] = value;
            if (key === 'keyWords') data[key] = value.split(',');
        });
        await sendForm(data, user?.displayName, id).then(() => {
            id ? alert('Conteúdo atualizado com sucesso!') : alert('Conteúdo criado com sucesso!');
    }).catch(() => {
        alert('Erro ao criar o conteúdo. Tente novamente mais tarde.');
    });
    }

    return (
        <div className={styles.container}>
            <form ref={form} className={styles.contentForm} onSubmit={handleSubmit}>
                <label className={styles.label}>
                    Título:
                    <input type="text" name="title" defaultValue={formObj?.title} required />
                </label>

                <label className={styles.label}>
                    <input type="radio" name="existsLanguage" onChange={() => setExistsLanguage(true)} defaultChecked />
                    Linguagem existente
                    {existsLanguage && (
                        <select
                            name="language"
                            value={languageSelected}
                            onChange={(ev) => setLanguageSelect(ev.target.value)}
                        >
                            {languages.map((language, index) => (
                                <option value={language} key={index}>{language}</option>
                            ))}
                        </select>
                    )}
                </label>
                <label className={styles.label}>
                    <input type="radio" name="existsLanguage" onChange={() => {
                        setExistsLanguage(false);
                    }} />
                    Nova Linguagem
                    {!existsLanguage && <input name="language" type="text" />}
                </label>

                <label className={styles.label}>
                    <input type="radio" name="existsModule" onChange={() => setExistsModule(true)} defaultChecked />
                    Módulo existente
                    {existsModule && (
                        <select
                            name="module"
                            value={moduleSelected}
                            onChange={(ev) => setModuleSelect(ev.target.value)}
                        >
                            {modules.map((module, index) => (
                                <option value={module} key={index}>{module}</option>
                            ))}
                        </select>
                    )}
                </label>
                <label className={styles.label}>
                    <input type="radio" name="existsModule" onChange={() => setExistsModule(false)} />
                    Novo módulo
                    {!existsModule && <input type="text" name="module" />}
                </label>

                <label className={styles.label}> Página anterior: 
                    <select 
                        name="backPageModule" 
                        value={backModuleSelected} 
                        onChange={(ev) => setBackModuleSelect(ev.target.value)}
                    >
                        {backModules.map((module, index) => (
                            <option value={module} key={index}>{module}</option>
                        ))}
                    </select>
                    <select 
                        name="backPageTitle"
                        value={backTitleSelected} 
                        onChange={(ev) => setBackTitleSelect(ev.target.value)}
                    >
                        <option value="none">none</option>
                        {backTitles.map((title, index) => (
                            <option value={title} key={index}>{title}</option>
                        ))}
                    </select>
                </label>

                <label className={styles.label}>
                    Palavras-Chave (separadas por uma vírgula ','):
                    <input type="text" name="keyWords" defaultValue={formObj?.keyWords} />
                </label>

                <label htmlFor="standardCss" className={styles.label}>
                    <input type="radio" name="css" onChange={() => setCustomCss(false)} defaultChecked />
                    CSS padrão (/style.css e ) 
                </label>
                <label htmlFor="customCss" className={styles.label}>
                    <input type="radio" name="css" onChange={() => setCustomCss(true)} />
                    Criar CSS
                    {customCss && (
                        <label>
                            Conteúdo CSS
                            <textarea className={styles.textarea} cols="30" rows="20" name="cssContent" defaultValue={formObj?.cssContent}></textarea>
                        </label>
                    )}
                </label>

                <label className={styles.label} htmlFor="Conteúdo HTML">Conteúdo HTML
                    <textarea className={styles.textarea} name="htmlContent" cols="30" rows="20" defaultValue={formatCode(formObj?.htmlContent, false)}></textarea>
                </label>
                

                
                <button type="reset">Resetar</button>
                <button type="button">Preview</button>
                <input type="submit" value="Postar" />
            </form>
            <hr className={styles.hr} />
            <div id="preview" className={styles.preview} dangerouslySetInnerHTML={{__html: formatCode(formObj?.htmlContent, false)}}></div>
        </div>
    )
}
