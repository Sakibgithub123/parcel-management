import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import  app  from "../firebase/firebase.config";
import useAxiousSecure from "../hook/useAxiousSecure";


const auth = getAuth(app);
export const AuthContext=createContext(null)

const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(true)
    const provider = new GoogleAuthProvider();
    const axiousSecure=useAxiousSecure()

    const createUser=(email,password)=>{
        setLoading(true);
       return createUserWithEmailAndPassword(auth, email, password)
    }
    const userLogin=(email,password)=>{
        setLoading(true);
       return signInWithEmailAndPassword(auth, email, password)
    }
    const userLogout=()=>{
        setLoading(true);
       return signOut(auth)
    }
    const updateUserProfile=(name,photo)=>{
       return updateProfile(auth.currentUser, {
        displayName:name, photoURL:photo
          })
    }
    const googleLogin=()=>{
       return signInWithPopup(auth, provider)
    }
    useEffect(()=>{
     const unsubscribe= onAuthStateChanged(auth,currentuser=>{
            setUser(currentuser)
            // const userinfo={email:currentuser.email}
            // if(currentuser){
            //     axiousSecure.post('/jwt',userinfo)
            //     .then(res=>{
            //         if(res.data.token){
            //             localStorage.setItem('access-token',res.data.token)
            //         }
            //     })

            // }else{
            //     localStorage.removeItem('access-token')

            // }
            console.log('current user :',currentuser)
            setLoading(false);
        });
        return()=>{
          return  unsubscribe();
        }
    },[])

    


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