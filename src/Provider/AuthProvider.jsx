import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from "../firebase/firebase.config";
import { createContext, useEffect, useState } from "react";


export const AuthContext=createContext()

const AuthProvider = ({children}) => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    const [user,setUser]=useState();
    const [loading,setLoading]=useState(true)

    const createUser=(email,password)=>{
        setLoading(true)
       return createUserWithEmailAndPassword(auth,email,password)
    }

   const  userLogin=(email,password)=>{
    setLoading(true)
      return  signInWithEmailAndPassword(auth,email,password)
    }
    const userLogout=(auth)=>{
        setLoading(true)
       return signOut(auth)
    }
    useEffect(()=>{
        const unsuScribe=onAuthStateChanged(auth,currentUser=>{
            console.log('current user:',currentUser)
            setUser(currentUser)
            setLoading(false)
        })
        return()=>{
            unsuScribe()
    
        }
    },[])

    const googleLogin=(auth,provider)=>{
        setLoading(true)
        return signInWithPopup(auth,provider)
    }

    const updateUserProfile=(name,photo)=>{
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
          });
    }

    


    const userInfo={
        user,
        createUser,
        updateUserProfile,
        userLogin,
        userLogout,
        googleLogin,
        loading,

    }
    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;