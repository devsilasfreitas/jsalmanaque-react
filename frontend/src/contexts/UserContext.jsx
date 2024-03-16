import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import React, { useState, createContext, useEffect, useContext } from "react";

const AuthContext = createContext (undefined);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState ();

    useEffect (() => {
        onAuthStateChanged (auth, (user) => {
            setUser(user);
        });
    }, []);

    return (
        <AuthContext.Provider 
        value={{
            isAuthenticated: !!user,
            user
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth deve ser usado com um AuthProvider");
    };

    return context;
};