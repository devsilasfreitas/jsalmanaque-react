import styles from './index.module.css';
import "highlight.js/styles/github-dark.min.css";

import hljs from "highlight.js";
import Editor from "@monaco-editor/react"
import { useState, useRef, useEffect, useContext } from "react";
import { useContents } from "../../contexts/ContentsContext";
import { contentsFunctions } from "../../functions/contentsFunctions";
import { sendForm } from "../../functions/sendForm";
import { useAuth } from "../../contexts/UserContext";
import { useParams } from "react-router-dom";
import { formatCode } from "../../functions/formatCode";
import { CreateModalContext } from "../../layouts/AdminLayout";
import { createCopyCode } from '../../functions/createCopyCode';

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

    const [htmlContent, setHtmlContent] = useState("");
    const [cssContent, setCssContent] = useState("");

    const { getLanguages, getModules, getTitles } = contentsFunctions(contents);

    const [existsLanguage, setExistsLanguage] = useState(true);
    const [existsModule, setExistsModule] = useState(true);
    const [customCss, setCustomCss] = useState(false);

    const { createModal } = useContext(CreateModalContext);

    useEffect(() => {
        const fetchedLanguages = getLanguages();
        setLanguages(fetchedLanguages);
        if (fetchedLanguages?.length > 0) {
            if (formObj) {
                setLanguageSelect(formObj?.language);
                setHtmlContent(formatCode(formObj?.htmlContent, false));
                if (formObj?.cssContent?.length > 0) {
                    setCustomCss(true);
                    setCssContent(formObj?.cssContent);
                }
            } else {
                setLanguageSelect(fetchedLanguages[0]);
            }
            setExistsLanguage(true);
        }
    }, [contents, formObj]); // Atualize sempre que o conteúdo for alterado

    useEffect(() => {
        if (languageSelected) {
            const fetchedModules = getModules(languageSelected);
            setModules(fetchedModules);
            setBackModules(fetchedModules);
            if (fetchedModules?.length > 0) {
                setModuleSelect(formObj?.module ?? fetchedModules[0]); // Define o primeiro módulo como selecionado por padrão
                const splittedBackPage = formObj?.backPage?.split('/');
                const backModule = splittedBackPage?.[splittedBackPage?.length - 2];
                if (backModule?.length > 0) {
                    setBackModuleSelect(backModule);
                } else {
                    setBackModuleSelect(fetchedModules[0]);
                }
            }
        }
    }, [languageSelected]); // Atualize sempre que a linguagem selecionada for alterada

    // Novo useEffect para carregar os títulos anteriores quando a linguagem selecionada mudar
    useEffect(() => {
        if (backModules?.length > 0 && backModuleSelected && languageSelected) {
            const fetchedBackTitles = getTitles(languageSelected, backModuleSelected);
            // separe o module do title no formObj.backPage com o formato '/conteudos/language/module/title'
            
            setBackTitles(fetchedBackTitles);
            if (fetchedBackTitles?.length > 0) {
                setBackTitleSelect(fetchedBackTitles[0]);
            }
        }
    }, [languageSelected]); // Atualize sempre que a linguagem selecionada for alterada
    
    useEffect(() => {
        if (backModuleSelected) {
            const fetchedBackTitles = getTitles(languageSelected, backModuleSelected, formObj?.title);
            setBackTitles(fetchedBackTitles);
            if (fetchedBackTitles.length > 0) {
                const splittedBackPage = formObj?.backPage?.split('/');
                const backTitle = splittedBackPage?.[splittedBackPage?.length - 1];
                if (backTitle?.length > 0) {
                    setBackTitleSelect(backTitle);
                } else {
                    setBackTitleSelect("none");
                }
            }
        }
    }, [backModuleSelected]);

    useEffect(() => {
        hljs.highlightAll();
        document.querySelectorAll('.copy-code').forEach((copyCode) => {
            copyCode.addEventListener('click', () => {
                navigator.clipboard.writeText(copyCode.dataset.code);
                createModal('success', 'Copiado!', 'Conteúdo copiado com sucesso!');
            });
        });
    }, [htmlContent, cssContent]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(form.current);
        const data = {};
        formData.forEach((value, key) => {
            if (key !== '' && value !== 'on') data[key] = value;
            if (key === 'keyWords') data[key] = value.split(',');
        });
        data.htmlContent = htmlContent;
        data.cssContent = cssContent;
        await sendForm(data, user?.displayName, id).then(() => {
            id ? createModal('success', 'Conteúdo atualizado!', 'Conteúdo atualizado com sucesso!') : createModal('success', 'Conteúdo criado!', 'Conteúdo criado com sucesso!');
    }).catch((error) => {
        createModal('error', 'Erro!', `Erro ao atualizar o conteúdo: ${error.message}`);
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
                    <input type="radio" name="css" onChange={() => {
                        setCustomCss(false);
                        setCssContent("");
                        }}
                    />
                    CSS padrão (/style.css e ) 
                </label>
                <label htmlFor="customCss" className={styles.label}>
                    <input type="radio" name="css" onChange={() => setCustomCss(true)} />
                    Criar CSS
                    <br />
                    {customCss && (
                        <label>
                            Conteúdo CSS
                            <Editor defaultLanguage="css" height="400px" options={{minimap: {enabled: false}, tabSize: 4}} width="100%" theme='vs-dark' name="cssContent" value={cssContent} onChange={(value) => setCssContent(value)} />
                        </label>
                    )}
                </label>

                <label className={styles.label} htmlFor="Conteúdo HTML">Conteúdo HTML
                    <Editor defaultLanguage="html" options={{minimap: {enabled: false}, tabSize: 4, lineNumbersMinChars: 3}} height="400px" width="100%" theme='vs-dark' name="htmlContent" value={htmlContent} onChange={(value) => setHtmlContent(value)} />
                </label>
                

                
                <button type="reset">Resetar</button>
                <input type="submit" value="Postar" />
            </form>

            <hr className={styles.hr} />

            <div id="preview" className={styles.preview} dangerouslySetInnerHTML={{__html: `<style>${cssContent}</style><main>${createCopyCode(formatCode(htmlContent, true))}</main>`}}></div>
        </div>
    )
}