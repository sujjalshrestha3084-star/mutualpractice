import React, { createContext, useContext, useEffect, useState, ReactNode} from 'react';
import{
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    User as FirebaseUser,
} from 'firebase/auth';
import{doc, getDoc} from 'firebase/firestore';
import{auth, db} from '../firebase';

export interface User {
    id: string;
    name: string;
    email: string;
    class: '11'|'12';
    faculty: 'Science'|'Management'|'Law'|'Arts' | 'Humanities';
    avatar?: string;
    points: number;
    joinDate: string;
}

interface AuthContextType {
    user: User | null;
    logIn: (email: string, password: string) => Promise<User | null>;
    register: (userData: Omit<User, 'id' | 'points' | 'joinDate'> & { password: string }) => Promise<User>;
    logOut: () => Promise<void>;
    loading: boolean;
}