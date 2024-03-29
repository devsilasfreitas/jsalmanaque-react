import { collection, deleteDoc, getDocs } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { useContext, useState } from "react";
import { Popconfirm, Button } from "antd";
import { usePopUps } from "../../../contexts/PopUpsContext";

export const ExcluirTudo = () => {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const { createModal } = usePopUps();

    const showPopconfirm = () => {
        setOpen(true);
    }

    const handleOk = async () => {
        setConfirmLoading(true);
        try {
            getDocs(collection(db, 'contents')).then((docs) => {
                docs.forEach((doc) => {
                    deleteDoc(doc.ref);
                });
            });

            setConfirmLoading(false);
            setOpen(false);
            createModal('success', 'Excluído!', 'Conteúdos excluídos com sucesso!');
        } catch (error) {
            setConfirmLoading(false);
            setOpen(false);
            createModal('error', 'Erro!', `Erro ao excluir os conteúdos: ${error.message}`);
        };
    };

    const handleCancel = () => {
        setOpen(false);
        createModal('warning', 'Cancelado!', 'Operação cancelada!');
    }


    return (
        <Popconfirm
            title="Excluir todos os conteúdos"
            description="Tem certeza que deseja excluir TODOS os conteúdos?"
            open={open}
            onConfirm={handleOk}
            okButtonProps={{ loading: confirmLoading }}
            onCancel={handleCancel}
            >
            <Button danger style={{backgroundColor: "red", color: "white"}} onClick={showPopconfirm} >
                Excluir TUDO
            </Button>
        </Popconfirm>
    )
}