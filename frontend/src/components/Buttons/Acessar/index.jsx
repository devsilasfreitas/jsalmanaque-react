import { Button } from "antd";
import { Link } from "react-router-dom";

export default function Acessar ({pagePath}) {
    return (
        <Link to={pagePath}>
            <Button type="primary">Acessar</Button>
        </Link>
    )
}