import React, { createContext, useContext, useEffect, useState, ReactNode, Children} from 'react';
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

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children } : { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // Helper: Transform Firestore doc to User
    const buildUserFromDoc = (Id: string, data: any): User => {
        return {
            id,
            name: data.name || '',
            email: data.email || '',
            class: data.class,
            faculty: data.faculty,
            avatar: data.avatar || '',
            points: typeof data.points === 'number' ? data.points : 0,
            joinDate: data.joinDate || new Date().toISOString(),
        };
    };

}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}