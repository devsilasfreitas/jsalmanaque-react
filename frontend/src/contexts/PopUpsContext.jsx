import { createContext, useContext } from "react";
import { Modal, notification } from "antd";


const CreatePopUpsContext = createContext(undefined);

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

export const PopUpsProvider = ({ children }) => {
    const [modal, modalHolder] = Modal.useModal();
    const [api, notificationHolder] = notification.useNotification();

    const createNotification = (type, message, description) => {
        return api[type](configNotification(message, description));
    };

    const createModal = (type, title, content, otherProps) => {
        return modal[type](configModal(title, content, otherProps));
    };

    return (
        <CreatePopUpsContext.Provider value={{ createModal, createNotification }}>
            {modalHolder}
            {notificationHolder}
            {children}
        </CreatePopUpsContext.Provider>
    )
};

export const usePopUps = () => {
    return useContext(CreatePopUpsContext);
};