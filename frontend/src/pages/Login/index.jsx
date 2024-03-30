import { useState } from "react"
import './styles.css'
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import { usePopUps } from "../../contexts/PopUpsContext";

export default function Login () {
    const navigate = useNavigate();

    document.title = "Login do Admin JSAlmanaque";

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const { createModal, createNotification } = usePopUps();

    const handleSignIn = (ev) => {
        ev.preventDefault();
        signInWithEmailAndPassword(auth, email, password).then(() => {
            createNotification('success', 'Login efetuado com sucesso', 'Login efetuado com sucesso!');
            navigate("/admin");
        }).catch(e => {
            setError(e.message);
        });
    }

    const resetPassword = (ev) => {
        ev.preventDefault();
        sendPasswordResetEmail(auth, email).then(() => {
            createModal('success', 'Email de redefinição de senha enviado', 'Email de redefinição de senha enviado. Verifique sua caixa de entrada.');
        }).catch(() => {
            createModal('error', 'Erro ao redefinir senha', 'Erro ao redefinir senha. Verifique se o email é correto.');
        })
    }

    return (
        <div className="body">
            <form className="login">
                <h2 className="title">Login</h2>
                <div className="box-user">
                    <input type="email" value={email} className="input" onChange={ev => setEmail(ev.target.value)} required />
                    <label className="label">Usuário</label>
                </div>
                <div className="box-user">
                    <input type="password" className="input" required value={password} onChange={ev => setPassword(ev.target.value)}/>
                    <label className="label">Senha</label>
                </div>
                <span className="error">{error}</span>
                <div>
                    <a href="#" onClick={resetPassword} className="forget" id="resetPassword">Esqueceu a senha?</a>
                </div>
                <button className="btn" onClick={handleSignIn}>
                    <span className="span"></span>
                    <span className="span"></span>
                    <span className="span"></span>
                    <span className="span"></span>
                    Entrar
                </button>
            </form>
        </div>
    )
}