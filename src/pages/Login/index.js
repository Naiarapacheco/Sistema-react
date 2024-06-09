import logo from '../../assets/img.jpg';
import './login.css';

import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';


export default function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { login, loadingAuth } = useContext(AuthContext);

    async function handleLogin(event){
        event.preventDefault();

        if(email !== '' && password !== ''){
            await login(email, password);
        }
    }

    return(
        <div className='container-center'>
            <div className='login'>
                <div className='login-area'>
                    <img src={logo}/>
                </div>

                <form onSubmit={handleLogin}>
                    <h1>Entrar</h1>
                    <input type='text' 
                    placeholder="email@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}/>
                    <input type='password' 
                    placeholder="senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
                    <button type='submit'>{loadingAuth ? 'Carregando...' : 'Acessar'}</button>
                </form>

                <Link to='/cadastro'>Cadastrar uma conta</Link>

            </div>
        </div>
    );
}
