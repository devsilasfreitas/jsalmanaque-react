import { Outlet } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";
import { useAuth } from "../contexts/UserContext";
import { createContext, useState, useRef, useEffect } from "react";
import { Button, Input, Modal } from "antd";
import { updateProfile } from "firebase/auth";
import { updateUserName } from "../functions/updateUserName";
import { UserOutlined } from "@ant-design/icons";
import { usePopUps } from "../contexts/PopUpsContext";

export const useName = createContext();

export default function AdminLayout () {
    const {user} = useAuth();
    const [displayName, setDisplayName] = useState(user.displayName);

    document.title =`Painel do Admin ${user.displayName}`

    const { createModal, createNotification } = usePopUps();

    const onClick = (newDisplayName) => {
        const oldDisplayName = user.displayName;
        updateProfile(user, {displayName: newDisplayName}).then(() => {
            updateUserName(oldDisplayName, newDisplayName);
            setDisplayName(newDisplayName);
            Modal.destroyAll();
            createModal('success', 'Nome atualizado!', 'Nome atualizado com sucesso!');
        }).catch((error) => createModal('error', 'Erro!', `Erro ao atualizar o nome: ${error.message}`));
    }

    const displayNameInput = useRef();
    const showEditDisplayName = (displayName) => {
        if (displayName) {
            createModal('confirm', 'Editar Nome', (<><Input minLength={2} prefix={<UserOutlined />} defaultValue={displayName} ref={displayNameInput} /></>), {
                footer: (_) => (
                    <Button type="primary" onClick={() => onClick(displayNameInput.current?.input?.value)}>Enviar</Button>
                ),
            });
        } else {
            createModal('confirm', 'Criar Nome', (<><Input minLength={2} prefix={<UserOutlined />} ref={displayNameInput} /></>), {
                footer: (_) => (
                    <Button type="primary" onClick={() => onClick(displayNameInput.current?.input?.value)}>Enviar</Button>
                ),
            });
        }
    };

    useEffect(() => {
        setDisplayName(displayName);
        displayName && createNotification("info", "Bem vindo!", `Bem vindo novamente admin ${displayName}!`);
    }, []);

    return (
        <div>
            <AdminHeader displayName={displayName} showEditDisplayName={showEditDisplayName} />
            {!displayName && showEditDisplayName(null)}
            <section>
                <useName.Provider value={[displayName, setDisplayName]}>
                    <Outlet />
                </useName.Provider>
            </section>
        </div>
    )
}