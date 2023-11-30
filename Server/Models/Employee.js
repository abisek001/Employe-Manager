const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    number: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    course: {
        type: [String], // Change the type to an array of strings
        required: true
    },
    image: {
        type: String,
        required: true
    },
    created_at: { 
        type: Date, 
        default: Date.now
    }
});

module.exports = mongoose.model("employee_List", employeeSchema, "employee_List");
