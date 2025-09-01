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

    // Listen for Firebase auth change 
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (fbuser: FirebaseUser | null) => {
            if (fbuser) {
                try {
                const uid = fbuser.uid;
                const userDocRef = doc(db, 'users', uid);
                const userSnap = await getDoc(userDocRef);
                if (userSnap.exists()) {
                    const u = (buildUserFromDoc(uid, userSnap.data()));
                    setUser(u);
                } else {
                    // if there is no profile doc, create a minimal one
                    const fallback: User = {
                        id: uid,
                        name: fbuser.displayName || '',
                        email: fbuser.email || '',
                        class: '11',
                        faculty: 'Science',
                        avatar: fbuser.photoURL || '',
                        points: 0,
                        joinDate: new Date().toISOString(),
                    };
                        await setDoc(userDocRef, fallback);
                        setUser(fallback);
                }
            } catch (err) {
                setUser(null);
            }
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

}
