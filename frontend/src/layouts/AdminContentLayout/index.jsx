import { Link, Outlet, useLocation } from "react-router-dom";

import Styles from "./AdminContentLayout.module.css";
import { useLocale } from "antd/es/locale";

export default function AdminContentLayout () {
    const location = useLocation();
    
    return (
        <div className={Styles.container}>
            <h2 className={Styles.title}>Conteúdos</h2>
            <div className={Styles.containerNav}>
                <div className={location.pathname === '/admin/conteudos' ? Styles.active : ''}>
                    <Link to='/admin/conteudos'>
                        Todos os conteúdos
                    </Link>
                </div>
                <div className={location.pathname === '/admin/conteudos/novo-conteudo' ? Styles.active : ''}>
                    <Link to='/admin/conteudos/novo-conteudo' style={{color: 'white', textDecoration: 'none'}}>
                        Criar conteúdo
                    </Link>
                </div>
            </div>
            <hr />
            <div>
                <Outlet />
            </div>
        </div>
    )
}