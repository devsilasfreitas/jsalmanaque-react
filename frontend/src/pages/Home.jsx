import { Link } from "react-router-dom";
import { useAuth } from "../contexts/UserContext";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export function Home () {
    const { user } = useAuth();
    document.title = "JS Almanaque";
    return (
        <>
            <h1>Seja bem vindo ao JSAlmanaque</h1>
            {user ? (
                    <Link to="/admin">Ir para admin</Link>
                ) : (
                    user === undefined ? (
                        <Spin
                            indicator={
                            <LoadingOutlined
                                style={{
                                fontSize: 24,
                                }}
                                spin
                            />
                            }
                            fullscreen
                            tip="Carregando..."
                        />
                    ) : (
                        <Link to="/login">Ir para login</Link>
                    )
            )}
        </>
    )
}