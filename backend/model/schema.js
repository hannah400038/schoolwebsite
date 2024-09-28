const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    number: { type: String, required: true },
    classname: { type: String, required: true }
});

const Student = mongoose.model('student', studentSchema);

module.exports = Student;