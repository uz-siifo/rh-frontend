import user_icon from '../assets/person.png'
import email from '../assets/email.png'
import password from '../assets/password.png'
import style from './Login.module.css'
import { Link } from 'react-router-dom';

// import { useState } from 'react'
export function LoginSignUp() {
    // const [action, setAction] = useState("Sign Up");
    return(
        <div className={style.Conteiner}>
            <div className={style.Header}>
                <div className={style.text}>Sign Up</div>
                <div className={style.Underline}></div>
            </div>
            <div className={style.Inputs}>
                <div className={style.Input}>
                    <img src={user_icon} alt="" />
                    <input type="text" placeholder='Nome'/>
                </div>

                <div className={style.Input}>
                    <img src={email} alt="" />
                    <input type="email" placeholder='Email ID' />
                </div>

                <div className={style.Input}>
                    <img src={password} alt="" />
                    <input type="password" placeholder='Password'/>
                </div>
            </div>
            <div className={style.forgot_password}>Esqueceu Password? <span>Clica aqui!</span></div>
            <div className={style.submit_container}>
            <div className={style.submit}>Sign Up</div>
            <div className={style.submit}>Login</div>
            <Link to="/admin">Ir para Admin</Link> {/* Link para a página de Admin */}
            </div>
        </div>
    )    
}

export default LoginSignUp