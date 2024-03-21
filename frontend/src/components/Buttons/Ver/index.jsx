import { Button } from "antd";
import { Link } from "react-router-dom";

export default function Ver ({id}) {
    return (
    <Link to={`/admin/conteudos/${id}`}>
        <Button type="primary">Ver</Button>
    </Link>
    )
}