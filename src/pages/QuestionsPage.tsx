import React, { useState } from 'react';
import { MessageSquare, Plus, Heart, Eye, Clock, Search, Filter, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from  '../contexts/DataContext';
import { useDND } from '../contexts/DNDContext';

export default function QuestionPage(){
const {user} = useAuth();
const {questions, addQuestion, addAnswer, likeQuestion, likeAnswer } = useData();
const { showNotification } = useDND();
const [showAskModal, setShowAskModal]=useState(false);
const [selectedQuestion, setSelectedQuestion]=useState<string|null>(null);
const [searchTerm, setSearchTerm]=useState('');
const [filterSubject, setFilterSubject]=useState('');



}