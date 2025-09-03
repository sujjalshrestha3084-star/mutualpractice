import 'react', { useAuth} from 'react';
import {FileText, Download, Search, Clock, Eye, Star} from 'lucide-react';
import { useAuth } from "../contexts/AuthContext";
interface PYQsPage{
    id: string;
    title: string;
    subject: string;
    faculity: string;
    year: number;
    type: 'board exam' |' modal question' | 'important question';
    fileurl: string;
    filetype: 'pdf' | 'doc';
    
    export default function PYQsPage() {
    const { user } = useAuth('');
     const [searchTerm, setSearchTerm] = UseState('');
     const [filtersubject, setFilterSubject] = UseState('');
     const [ Filteryerar, setfilterYear] = UseState('');
     const [ filtertype, setFilterType] =UseState('');
     }
     const PYQs: PYQsPage[] = [
        {
            id: 1,
            title: 'PYQ 2022',
            subject: 'Mathematics',
            faculity: 'Science',
            class: '12th',
            year: 2022,
            type: 'board exam',
            fileurl: 'https://drive.google.com/file/d/1K4Ma95c7TJWoY68ZpscD8xIj2AxOfS8p/view?usp=sharing',
            filetype: 'pdf',
            downloads: 1990,
            ratings: 4.5,
            creadetedAt: '2023-10-01',
        },
        {

            id: 2,
            title: 'PYQ 2021',
            subject: 'Physics',
            faculity: 'Science',
            class: '12th',
            year: 2021,
            type: 'modal question',
            fileurl: 'https://drive.google.com/file/d/1K4Ma95c7TJWoY68ZpscD8xIj2AxOfS8p/view?usp=sharing',
            filetype: 'pdf',
            downloads: 1500,
            ratings: 4.2,
            creadetedAt: '2023-09-15',


        },
        {

        },

     ];
     
     const filterPyqs = PYQs.filter((pyqs) =>{

        const matchesfacuilty = PYQs.faculity === user?.faculity;
        const 
        
        
     });
     
    