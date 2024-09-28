// src/StudentForm.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css'

const StudentForm = ({ currentStudent, setCurrentStudent, setIsEditing, setStudents, setLocalStudents, isEditing }) => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [number, setNumber] = useState('');
    const [classname, setClassname] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (isEditing && currentStudent) {
            setName(currentStudent.name);
            setAddress(currentStudent.address);
            setNumber(currentStudent.number);
            setClassname(currentStudent.classname);
        } else {
            resetForm();
        }
    }, [isEditing, currentStudent]);

    const resetForm = () => {
        setName('');
        setAddress('');
        setNumber('');
        setClassname('');
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const studentData = { name, address, number, classname };

        try {
            if (isEditing) {
                const response = await axios.put(`http://localhost:3000/students/${currentStudent._id}`, studentData);
                const updatedStudents = await response.data;
                setLocalStudents(updatedStudents);
                setStudents(updatedStudents);
            } else {
                const response = await axios.post('http://localhost:3000/students', studentData);
                const newStudent = await response.data;
                setLocalStudents(prevStudents => [...prevStudents, newStudent]);
                setStudents(prevStudents => [...prevStudents, newStudent]);
            }

            resetForm();
            setIsEditing(false);
            setCurrentStudent(null);
        } catch (error) {
            console.error('Error processing request:', error);
            setError('An error occurred. Please try again.');
        }
    };

   
};

export default StudentForm;