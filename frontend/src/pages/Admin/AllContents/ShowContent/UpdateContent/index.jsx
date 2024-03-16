import { useContents } from "../../../../../contexts/ContentsContext";
import Form from "../../../../../components/Form";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function UpdateContent () {
    const { id } = useParams();
    const [content, setContent] = useState();
    const { getContentById } = useContents();

    useEffect(() => {
        const content = getContentById(id);
        setContent(content);
    }, [getContentById, id]);

    return (
        <>
            <section>
                <h2>Atualizar Conteúdo - {content?.title}</h2>
            </section>
            <section>
                <Form formObj={content}/>
            </section>
        </>
    )
}