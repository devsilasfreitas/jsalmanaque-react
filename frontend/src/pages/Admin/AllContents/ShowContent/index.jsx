import {useContents} from "../../../../contexts/ContentsContext";
import { useParams } from "react-router-dom";
import Atualizar from "../../../../components/Buttons/Atualizar";
import Excluir from "../../../../components/Buttons/Excluir";
import Acessar from "../../../../components/Buttons/Acessar";
import { useEffect, useState } from "react";

export default function ShowContent () {
    const { getContentById } = useContents();
    const [content, setContent] = useState()
    const { id } = useParams();
    useEffect(() => {
        let content = getContentById(id);
        setContent(content);
    }, [id, getContentById])

    return (
        <>
            <section>
                <h3>{content?.title}</h3>
                <div style={{display: 'flex', gap: '5px'}}>
                    <Acessar pagePath={content?.pagePath} />
                    <Atualizar id={content?.id} />
                    <Excluir id={content?.id} />
                </div>
            </section>
            <section>
                <div>Módulo: {content?.module}</div>
                <div>Linguagem: {content?.language}</div>
                <div>Caminho: {content?.pagePath}</div>
                {content?.backPage && (
                    <div>Conteúdo Anterior: {content?.backPage}</div>
                )}
                {content?.nextPage && (
                        <div>Conteúdo Posterior: {content?.nextPage}</div>
                    )}
                <div>Atualizado por {content?.userName} em {new Date(content?.updatedAt.seconds * 1000 + content?.updatedAt.nanoseconds / 1000000).toLocaleString()}</div>
            </section>
        </>
    )
}