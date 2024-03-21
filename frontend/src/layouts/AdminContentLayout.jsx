import { Link, Outlet } from "react-router-dom";

export default function AdminContentLayout () {
    
    return (
        <>
                    <h2>Conteúdos</h2>
            <div style={{display: 'flex', gap: '10px'}}>
                <Link to='/admin/conteudos' style={{color: 'white', textDecoration: 'none'}}>
                    Todos os conteúdos
                </Link>
                <Link to='/admin/conteudos/novo-conteudo' style={{color: 'white', textDecoration: 'none'}}>
                    Criar conteúdo
                </Link>
            </div>
            <hr />
            <div>
                <Outlet />
            </div>
        </>
    )
}