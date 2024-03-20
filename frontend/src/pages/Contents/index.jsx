import "highlight.js/styles/github-dark.min.css";

import hljs from "highlight.js";
import { Link, useParams } from "react-router-dom"
import {useContents} from "../../contexts/ContentsContext"
import { useEffect, useState } from "react";
import { formatCode } from "../../functions/formatCode";

export default function Content () {
    const { getContentByPagePath } = useContents();
    const params = useParams();
    const [content, setContent] = useState();

    useEffect(() => {
        const pagePath = `/conteudos/${params.language}/${params.module}/${params.title}`;
        const content = getContentByPagePath(pagePath);
        setContent(content);
    }, [params, getContentByPagePath]);

    useEffect(() => {
        hljs.highlightAll();
    }, [content]);

    return (
        <>
            <Link to={content?.backPage}>Pagina anterior</Link>
            <br />
            <Link to={content?.nextPage}>Próxima Página</Link>
            <main dangerouslySetInnerHTML={{__html: `<style>
                ${content?.cssContent}
            </style>
            ${formatCode(content?.htmlContent, true)}`}}></main>
        </>
    )
}