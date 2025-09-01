import React,{createContext,useContext,useState,useEffect,ReactNode} from "react";
import { useAuth } from "/AuthContext  ";
import {useDND} from "./DNDContext";

export interface Questions{
    id: string;
    title: string;
    content: string;
    author: {
        id: string;
        name: string;
        avatar?: string;
    };
    faculty: string;
    subject: string;
    likes: number;
    views: number;
    answers: Answer[];
    createdAt: string;
    liked?: boolean;   
}

export interface Answer{
    id: string;
    content: string;
    author: {
        id: string;
        name: string;
        avatar?: string;
    };
    createdAt: string;
    likes: number;
    liked?: boolean;
}

export interface Notes{
    id: string;
    title: string;
    description: string;
    subject: string;
    faculty: string;
    class: string;
    fileUrl: string;
    fileType: 'pdf' | 'docx' | 'pptx';
    author: {
        id: string;
        name: string;
        avatar?: string;
    };
    createdAt: string;
    likes: number;
    downloads: number;
    liked?: boolean;
    saved?: boolean;
}

export interface NewsArticle{
    id: string;
    title: string;
    excerpt: string;
    content: string;
    imageUrl?: string;
    author: string;
    publishedAt: string;
    category: 'NEBUpdates' | 'Exams' | 'Results' | 'Notices';
}

interface DataContextType{
    questions: Questions[];
    notes: Notes[];
    news: NewsArticle[];
    addQuestion: (question: Omit<Questions, 'id' | 'createdAt' | 'likes' | 'views' | 'answers'>) => void;
    addAnswer: (questionId: string, answer: Omit<Answer, 'id' | 'createdAt' | 'likes'>) => void;
    likeQuestion: (questionId: string) => void;
    likeAnswer: (questionId: string, answerId: string) => void;
    addNote: (note: Omit<Notes, 'id' | 'createdAt' | 'likes' | 'downloads'>) => void;
    likeNote: (noteId: string) => void;
    saveNote: (noteId: string) => void;
    getUserStats: () => { questionsAsked: number; notesUploaded: number; rank: number; totalLikes: number; };
}
