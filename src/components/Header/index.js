import { useContext } from 'react';
import './header.css';
import { Link } from 'react-router-dom';
import avatar from '../../assets/avatar.png';
import {FiHome, FiUser, FiSettings} from 'react-icons/fi';

import { AuthContext } from '../../contexts/auth';

export default function Header() {
    const { user } = useContext(AuthContext);

    return (
        <div className='sidebar'>
            <div>
                <img src={!user || !user.avatarUrl ? avatar : user.avatarUrl} alt='Foto do Usuário' />
            </div>

            <Link to='/dashboard'>
                <FiHome color="#FFF" size={24}/>
                Chamados
            </Link>
            <Link to='/clientes'>
                <FiUser color="#FFF" size={24}/>
                Clientes
            </Link>
            <Link to='/perfil'>
                <FiSettings color="#FFF" size={24}/>
                Perfil
            </Link>
        </div>
    );
}

