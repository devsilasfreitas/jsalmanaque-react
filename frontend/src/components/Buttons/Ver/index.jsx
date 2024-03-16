import { Link } from "react-router-dom";

export default function Ver ({id}) {
    return (
    <Link to={`/admin/conteudos/${id}`}>
        <button>Ver</button>
    </Link>
    )
}