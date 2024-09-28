const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import the Student model (make sure this file exists and is correctly defined)
const Student = require('./model/schema');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/arday')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Create a new student
app.post('/students', async (req, res) => {
    try {
        const student = new Student(req.body);
        const savedStudent = await student.save();
        res.status(201).send(savedStudent);
    } catch (err) {
        res.status(400).send({ error: 'Error saving student', details: err });
    }
});

// Create multiple students
app.post('/students/create', async (req, res) => {
    try {
        const students = req.body; // Expecting an array of student objects
        const savedStudents = await Student.insertMany(students);
        res.status(201).send(savedStudents);
    } catch (err) {
        res.status(400).send({ error: 'Error saving students', details: err });
    }
});

// Read all students with pagination
app.get('/students', async (req, res) => {
    const limit = parseInt(req.query.limit) || 10; // Default to 10
    const page = parseInt(req.query.page) || 1; // Default to page 1
    try {
        const students = await Student.find()
            .limit(limit)
            .skip((page - 1) * limit);
        res.send(students);
    } catch (err) {
        res.status(500).send({ error: 'Error retrieving students', details: err });
    }
});

// Get a single student by ID
app.get('/students/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).send({ error: 'Student not found' });
        }
        res.send(student);
    } catch (err) {
        res.status(500).send({ error: 'Error retrieving student', details: err });
    }
});

// Update a student by ID
app.put('/students/:id', async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!student) {
            return res.status(404).send({ error: 'Student not found' });
        }
        res.send(student);
    } catch (err) {
        res.status(400).send({ error: 'Error updating student', details: err });
    }
});

// Delete a student by ID
app.delete('/students/:id', async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) {
            return res.status(404).send({ error: 'Student not found' });
        }
        res.send({ message: 'Student deleted' });
    } catch (err) {
        res.status(500).send({ error: 'Error deleting student', details: err });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});