import { Link } from "react-router-dom";

export default function Acessar ({pagePath}) {
    return (
        <Link to={pagePath}>
            <button>Acessar</button>
        </Link>
    )
}