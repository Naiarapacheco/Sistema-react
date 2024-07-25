import { useState, createContext, useEffect } from "react";
import { auth, db } from "../services/firebaseConnect";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } 
from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(false); //control user
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() =>{
    async function loadUser(){
      const storageUser = localStorage.getItem('@users');

      if(storageUser){
        setUser(JSON.parse(storageUser)); //converting back to an object
        setLoading(false);
      }

      setLoading(false);
    }
    loadUser();
  }, [])

  //Log In
  async function login(email, password) {
    setLoadingAuth(true);

    await signInWithEmailAndPassword(auth, email, password)
      .then(async (value) => {
        let userId = value.user.uid;

        const docRef = doc(db, "usuarios", userId);
        const docSnape = await getDoc(docRef);

        let data = {
          userId: userId,
          nome: docSnape.data().nome,
          email: value.user.email,
          avatarUrl: docSnape.data.avatarUrl,
        };

        setUser(data);
        storageUser(data);
        setLoadingAuth(false);
        toast.success("Bem vindo de volta");
        navigate("/dashboard");
      })
      .catch((error) => {
        console.log(error);
        setLoadingAuth(false);
        toast.error("Ops... Algo deu errado");
      });
  }

  //New User
  async function cadastro(name, email, password) {
    setLoadingAuth(true);

    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (value) => {
        // Value - info user
        let userId = value.user.uid;

        await setDoc(doc(db, "usuarios", userId), {
          nome: name,
          avatarUrl: null, // No user photo
        }).then(() => {
          let data = {
            userId: userId,
            nome: name,
            email: value.user.email,
            avatarUrl: null,
          };
          setUser(data);
          storageUser(data); //save in the localStorage
          setLoadingAuth(false);
          toast.success("Seja bem vindo(a) ao sistema");
          navigate("/dashboard");
        });
      })
      .catch((error) => {
        console.log(error);
        setLoadingAuth(false);
      });
  }

  function storageUser(data) {
    localStorage.setItem("@users", JSON.stringify(data)); //converted to a string
  }

  async function logout(){
    await signOut(auth);
    localStorage.removeItem('@users');
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user, // false if no user is logged in, true if a user is logged in
        user,
        login,
        cadastro,
        logout,
        loadingAuth, // spinner of sign up/sign in
        loading,
        storageUser,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
