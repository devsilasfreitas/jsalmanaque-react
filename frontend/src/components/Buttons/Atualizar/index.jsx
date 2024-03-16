import { Link } from "react-router-dom";

export default function Atualizar ({id}) {
    return (
        <Link to={`/admin/conteudos/${id}/atualizar-conteudo`}>
        <button>Atualizar</button>
        </Link>
    )
}