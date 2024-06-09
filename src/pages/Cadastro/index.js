import { useState, useContext } from 'react';
import { Link } from 'react-router-dom'; 
import logo from '../../assets/img.jpg';

import { AuthContext } from '../../contexts/auth';

export default function Cadastro(){

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {cadastro, loadingAuth} = useContext(AuthContext);
    
    async function handleSubmit(event){
        event.preventDefault();

        if (name !== '' && email !== '' && password !== ''){
            await cadastro(name, email, password)
        }
    }

    return(
        <div className='container-center'>
            <div className='login'>
                <div className='login-area'>
                    <img src={logo}/>
                </div>

                <form onSubmit={handleSubmit}>
                    <h1>Nova conta</h1>
                    <input type='text' 
                    placeholder="nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}/>
                    <input type='email' 
                    placeholder="email@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}/>
                    <input type='password' 
                    placeholder="senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}/>

                    <button type='submit'>{loadingAuth ? 'Carregando...' : 'Cadastrar'}</button>
                </form>

                <Link to='/'>Já possui uma conta? Faça login</Link>

            </div>
        </div>
    );
}
