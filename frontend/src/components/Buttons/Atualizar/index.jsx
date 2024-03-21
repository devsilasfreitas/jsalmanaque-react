import { Link } from "react-router-dom";
import { Button } from "antd";

export default function Atualizar ({id}) {
    return (
        <Link to={`/admin/conteudos/${id}/atualizar-conteudo`}>
            <Button default>Atualizar</Button>
        </Link>
    )
}