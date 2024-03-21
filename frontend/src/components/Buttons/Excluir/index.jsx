import { getDoc, doc } from "firebase/firestore";
import { useContents } from "../../../contexts/ContentsContext";
import { updateOrderPages } from "../../../functions/updateOrderPages";
import { db } from "../../../config/firebase";
import { Popconfirm, Button } from 'antd';
import { useState, useContext } from "react";
import { CreateModalContext } from "../../../layouts/AdminLayout";

export default function Excluir ({id}) {
    //TODO: trocar os notifications por modals
    const { removeContent } = useContents();
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const { createModal } = useContext(CreateModalContext);

    const showPopconfirm = () => {
        setOpen(true);
    }

    const handleOk = async () => {
        try {
            setConfirmLoading(true);
            const content = await getDoc(doc(db, 'contents', id)).then((doc) => doc.data());
            await updateOrderPages(content, true);
            removeContent(id).then(() => {
                setConfirmLoading(false);
                setOpen(false);
                createModal('success', 'Excluído!', 'Conteúdo excluído com sucesso!');
            });
        } catch (error) {
            setConfirmLoading(false);
            setOpen(false);
            createModal('error', 'Erro!', `Erro ao excluir o conteúdo: ${error.message}`);
        }
    }

    const handleCancel = () => {
        setOpen(false);
        createModal('warning', 'Cancelado!', 'Operação cancelada!');
    }

    return (
        <>
            <Popconfirm
            title="Excluir conteúdo"
            description="Tem certeza que deseja excluir este conteúdo?"
            open={open}
            onConfirm={handleOk}
            okButtonProps={{ loading: confirmLoading }}
            onCancel={handleCancel}
            >
            <Button danger onClick={showPopconfirm} >
                Excluir
            </Button>
            </Popconfirm>
        </>
    )
}