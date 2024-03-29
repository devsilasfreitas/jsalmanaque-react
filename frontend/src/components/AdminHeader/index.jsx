import { Link, useNavigate } from "react-router-dom";
import styles from './index.module.css';
import { auth } from "../../config/firebase";
import { EditOutlined } from "@ant-design/icons";

export default function AdminHeader ({displayName, showEditDisplayName}) {
    const navigate = useNavigate();
    const logout = () => {
        auth.signOut().then(() => navigate("/login"));
    };

    return (
        <header className={styles.header}>
            <div className={styles.nameContainer}>
                <Link to='/admin' style={{color: 'white', textDecoration: 'none'}}>
                    <h1>Painel do Admin {displayName}</h1>
                </Link>
                <EditOutlined className={styles.editIcon} onClick={() => showEditDisplayName(displayName)} />
            </div>
                
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