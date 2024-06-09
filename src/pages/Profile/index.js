import { useContext, useState } from 'react';
import Header from '../../components/Header';
import Title from '../../components/Title';

import './profile.css';
import { FiSettings, FiUpload } from 'react-icons/fi';
import avatar from '../../assets/avatar.png';
import { AuthContext } from '../../contexts/auth';

import {toast} from 'react-toastify';
import {db, storage} from '../../services/firebaseConnect';
import {doc, updateDoc} from 'firebase/firestore';

import {ref, uploadBytes, getDownloadURL} from 'firebase/storage';

export default function Profile(){

    const {user, storageUser, setUser, logout} = useContext(AuthContext);

    const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);
    const [imageAvatar, setImageAvatar] = useState(null);

    const [nome, setNome] = useState(user && user.nome);
    const [email, setEmail] = useState(user && user.email);

    function handleFile(e){
       if(e.target.files[0]){
        const image = e.target.files[0];
        if(image.type === 'image/jpeg' || image.type === 'image/png'){
            setImageAvatar(image);
            setAvatarUrl(URL.createObjectURL(image));   // fixed 
        }else{
            alert("Envie uma imagem do tipo PNG ou JPEG");
            setImageAvatar(null);
            return;
        }
       }
    }   

    async function handleUpload(){
        const currentUid = user.userId;
        const uploadRef = ref(storage, `images/${currentUid}/${imageAvatar.name}`);
        const uploadTask = uploadBytes(uploadRef, imageAvatar).then((snapshot)=> { //obter informações sobre o arquivo após o upload ser concluído.

            getDownloadURL(snapshot.ref).then( async (downloadURL) =>{  //snapshot acessa dados que já foram enviados para o banco de dados do Firebase.
                let urlFoto = downloadURL;

                const docRef = doc(db, 'usuarios', user.userId)
                await updateDoc(docRef, {
                    avatarUrl: urlFoto,
                    nome: nome
                })
                .then(() => {
                    let data = {
                        ...user,
                        nome: nome,
                        avatarUrl: urlFoto,
                     }
                     setUser(data);
                     storageUser(data);
                     toast.success("Foto atualizada com sucesso!")
                })
            })
        })

    }

    async function handleSubmit(e){
    e.preventDefault();
    // Atualizar no banco de dados se o avatar de imagem e o nome foram alterados
        if (imageAvatar === null && nome !== ''){
            const docRef = doc(db, "usuarios", user.userId)        
            await updateDoc(docRef, {
                nome: nome,
            })
            .then( () =>{
                let data = {
                    ...user,
                    nome: nome,
                }
                setUser(data);
                storageUser(data);
                toast.success("Nometualizado com sucesso!")
            })
        }else if(nome !== '' && imageAvatar !== null){
            handleUpload();
        }
    }

    return(
        <div>
            <Header/>

            <div className='content'>
                <Title name="Minha conta">
                    <FiSettings size={25}/>
                </Title>

                <div className='container'>
                    <form className='form-profile' onSubmit={handleSubmit}>
                       <label className='label-avatar'>
                            <span>
                                <FiUpload color='#FFF' size={25}/>
                            </span>

                            <input type='file' accept='image/*' onChange={handleFile}/><br/>
                            {avatarUrl ? 
                            (<img src={avatarUrl} alt='Foto de Perfil' width={200}/>) : 
                            (<img src={avatar} alt='Foto de Perfil' width={200}/>)}

                        </label> 

                        <label>Nome</label>
                        <input type='text' value={nome} onChange={(e) => setNome(e.target.value)}/>
                        <input type='text' value={email} disabled={true}/>
                        <button type='submit'>Salvar</button>
                    </form>
                </div>

                <div className='container'>
                    <button className='logout-btn' onClick={ () => logout()}>Sair</button>
                </div>

            </div>
        </div>
    )
}