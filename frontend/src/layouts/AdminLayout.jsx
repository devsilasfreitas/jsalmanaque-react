import { Outlet } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";
import { useAuth } from "../contexts/UserContext";
import { createContext, useState, useRef } from "react";
import { Button, Modal, notification } from "antd";

export const useName = createContext();

const configModal = (title, content, otherProps) => ({
    title,
    content: (
        <>
        {content}
        <br />
        </>
    ),
    centered: true,
    ...otherProps,
});

const configNotification = (message, description) => ({
        message,
        description,
        placement: 'bottomRight',
});

export const CreateModalContext = createContext(undefined);

export default function AdminLayout () {
    const {user} = useAuth();
    const [displayName, setDisplayName] = useState(user.displayName);

    const [modal, modalHolder] = Modal.useModal();

    const [api, notificationHolder] = notification.useNotification();

    const openNotificationWithIcon = (type, message, description) => {
    api[type](configNotification(message, description));
    };

    const createModal = (type, title, content, otherProps) => {
        modal[type](configModal(title, content,otherProps));
    };

    const showEditDisplayName = (displayName, onClick) => {
        const displayNameInput = useRef();
        if (displayName) {
            createModal('confirm', 'Editar Nome', (<><input type="text" value={displayNameInput} onChange={(e) => setDisplayName(e.target.value)} /></>), {
                footer: (_) => (
                    <Button type="primary" onClick={() => onClick(displayNameInput.current?.value)}>Enviar</Button>
                ),
            });
        } else {
            createModal('confirm', 'Criar Nome', (<><input type="text" minLength={2} defaultValue={displayName} ref={displayNameInput} /></>), {
                footer: (_) => (
                    <Button type="primary" onClick={() => onClick(displayNameInput.current?.value)}>Enviar</Button>
                ),
            });
        }
    };

    return (
        <div>
            <CreateModalContext.Provider value={{createModal, openNotificationWithIcon, showEditDisplayName}}>
                <AdminHeader displayName={displayName}/>
                <main>

                    {notificationHolder}
                    <useName.Provider value={[displayName, setDisplayName]}>
                        <Outlet />
                    </useName.Provider>
                    {modalHolder}
                </main>
            </CreateModalContext.Provider>
        </div>
    )
}