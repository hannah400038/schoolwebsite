// src/StudentList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css'

const StudentList = ({ setStudents }) => {
    const [students, setLocalStudents] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentStudent, setCurrentStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [number, setNumber] = useState('');
    const [classname, setClassname] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchStudents = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:3000/students');
                const fetchedStudents = response.data || [];
                setLocalStudents(fetchedStudents);
                setStudents(fetchedStudents);
            } catch (error) {
                console.error('Error fetching students:', error);
                setError('Error fetching students. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, [setStudents]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/students/${id}`);
            const updatedStudents = students.filter(student => student._id !== id);
            setLocalStudents(updatedStudents);
            setStudents(updatedStudents);
        } catch (error) {
            console.error('Error deleting student:', error);
            setError('Error deleting student. Please try again.');
        }
    };

    const handleEdit = (student) => {
        setCurrentStudent(student);
        setIsEditing(true);
        setName(student.name);
        setAddress(student.address);
        setNumber(student.number);
        setClassname(student.classname);
    };

    const handleAdd = () => {
        setCurrentStudent(null);
        setIsEditing(false);
        setName('');
        setAddress('');
        setNumber('');
        setClassname('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const studentData = { name, address, number, classname };

        try {
            if (isEditing) {
                await axios.put(`http://localhost:3000/students/${currentStudent._id}`, studentData);
                const updatedStudents = students.map(student => 
                    student._id === currentStudent._id ? { ...student, ...studentData } : student
                );
                setLocalStudents(updatedStudents);
                setStudents(updatedStudents);
            } else {
                const response = await axios.post('http://localhost:3000/students', studentData);
                const newStudent = response.data; // API should return the newly created student
                setLocalStudents(prevStudents => [...prevStudents, newStudent]);
                setStudents(prevStudents => [...prevStudents, newStudent]);
            }
            handleAdd(); // Reset form after submission
        } catch (error) {
            console.error('Error saving student:', error);
            setError('Error saving student. Please try again.');
        }
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="student-list-container">
            <h2 className="student-list-title">Student Management</h2>
            <form onSubmit={handleSubmit}>
                <h2>{isEditing ? 'Edit Student' : ''}</h2>
                {error && <div className="error-message">{error}</div>}
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Number"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Class"
                    value={classname}
                    onChange={(e) => setClassname(e.target.value)}
                    required
                />
                <button type="submit">{isEditing ? 'Update' : 'Add'}</button>
            </form>
            <table className="students-table">
                <thead>
                    <tr>
                        <th className="table-header">Name</th>
                        <th className="table-header">Address</th>
                        <th className="table-header">Number</th>
                        <th className="table-header">Class</th>
                        <th className="table-header">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student._id} className="student-row">
                            <td className="student-cell">{student.name}</td>
                            <td className="student-cell">{student.address}</td>
                            <td className="student-cell">{student.number}</td>
                            <td className="student-cell">{student.classname}</td>
                            <td className="student-cell">
                                <button className="edit-button" onClick={() => handleEdit(student)}>Edit</button>
                                <button className="delete-button" onClick={() => handleDelete(student._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StudentList;