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

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children } : {children : ReactNode }) {
    const { user } = useAuth();
    const dndContext = useContext (React.createContext<any>(undefined));
    const [questions, setQuestions] = useState<Questions[]>([]);
    const [notes,setNotes] = useState < Notes[]>([]);
    const [news,setNews] = useState < NewsArticle[]>([]);

    useEffect(() =>{
        // Load initial data 
        loadInitialData = () => {
            // sample questions
            const sampleQuestions: Questions[] = [
                {
                    id: '1',
                    title: "",
                    content: "",
                    author: { name: "", faculty: "" },
                    faculty: "",
                    subject: "",
                    likes: 0,
                    views: 0,
                    answers: [
                        {
                            id: "",
                            content: "",
                            author: { name: "", faculty: ""},
                            createdAt: "",
                            likes: 0
                        }
                    ],
                    createdAt: ""
                }
            ];
            const sampleNotes: Notes[] = [
                {
                    id : '1',
                    title: '',
                    description: '',
                    faculty: '',
                    class: '',
                    fileUrl: '',
                    fileType: '',
                    author: { name: '', faculty: '' },
                    likes: 0,
                    downloads: 0,
                    createdAt: ""
                }  
            ];
            // sample news
            const sampleNews: NewsArticle[] = [
            {
                id: '1',
                title: '',
                excerpt: '',
                content: '',
                author: '',
                publishedAt: '',
                category: 'NEBUpdates'
            }
            ];

            setQuestions(sampleQuestions);
            setNotes(sampleNotes);
            setNews(sampleNews);
        };

        const addQuestion = (questionData: Omit<Questions, 'id' | 'createdAt' | 'likes' | 'views' | 'answers'>) => {
            const newQuestion: Questions = {
                ..questionData,
                id: Date.now().toString(),
                likes: 0,
                views: 0,
                answers: [],
                createdAt: new Date().toISOString()
            };
            setQuestions((prev) => [...prev, newQuestion]);
        };
        const addAnswer = (questionId: string, answerData: Omit<Answer, 'id' | 'createdAt' | 'likes'>) => {
            const newAnswer: Answer = {
                ...answerData,
                id: Date.now().toString(),
                likes: 0,
                createdAt: new Date().toISOString()
            };
            setAnswers((prev) => [...prev, newAnswer]);
        };
    }, []);
}