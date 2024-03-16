import { Link, useNavigate } from "react-router-dom";
import styles from './index.module.css';
import { auth } from "../../config/firebase";

export default function AdminHeader ({displayName}) {
    const navigate = useNavigate();
    const logout = () => {
        auth.signOut().then(() => navigate("/login"));
    }

    return (
        <header className={styles.header}>
            <Link to='/admin' style={{color: 'white', textDecoration: 'none'}}>
                <h1>Painel do Admin {displayName}</h1>
            </Link>
                
            <div className={styles.buttonsContainer}>
                <Link to='/admin/conteudos'>
                    <button className={styles.button}>Conteúdos</button>
                </Link>
                <Link>
                    <button className={styles.button} onClick={logout}>Logout</button>
                </Link>
            </div>
        </header>
    )
}