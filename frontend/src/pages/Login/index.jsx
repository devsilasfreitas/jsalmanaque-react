import { useState } from "react"
import './styles.css'
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useNavigate } from "react-router-dom";

export default function Login () {
    const navigate = useNavigate();

    document.title = "Login do Admin JSAlmanaque";

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = (ev) => {
        ev.preventDefault();
        signInWithEmailAndPassword(auth, email, password).then(() => {
            navigate("/admin");
        });
    }

    const resetPassword = (ev) => {
        ev.preventDefault();
        sendPasswordResetEmail(auth, email).then(() => {
            alert("Email para redefinir a senha enviado para: " + email);
        }).catch(() => {
            alert("Erro ao redefinir a senha. Tente novamente mais tarde.");
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