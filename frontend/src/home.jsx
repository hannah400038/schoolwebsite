// Home.jsx
import React from 'react';
import StudentForm from "c:/Users/Yahya Duceysane/Desktop/xanan/frontend/src/studentform";
import StudentList from  "./studentlist";
import './index.css'

const Home = ({ students, setStudents }) => (
    <>
        <StudentForm setStudents={setStudents} />
        <StudentList students={students} setStudents={setStudents} />
    </>
);

export default Home;