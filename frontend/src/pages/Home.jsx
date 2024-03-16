import { Link } from "react-router-dom";
import { useAuth } from "../contexts/UserContext";

export default function Home () {
    const { isAuthenticated } = useAuth();
    return (
        <>
            <h1>Seja bem vindo ao JSAlmanaque</h1>
            {isAuthenticated ? (
                <Link to="/admin">Ir para admin</Link>
            ) : (
                <Link to="/login">Ir para login</Link>
            )}
        </>
    )
}