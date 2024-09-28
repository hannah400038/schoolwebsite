// main.jsx
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const Main = () => {
    const [students, setStudents] = useState([]); // Manage students state

    return (
        <BrowserRouter>
            <App students={students} setStudents={setStudents} />
        </BrowserRouter>
    );
};

ReactDOM.render(
    <Main />, // Render the Main component
    document.getElementById('root')
);