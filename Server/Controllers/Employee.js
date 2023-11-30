const Employees = require('../Models/Employee');
const mongoose = require('mongoose');

exports.addEmployee = (req, res, next) => {
    Employees.find({ email: req.body.email }).exec()
        .then((employee) => {
            if (employee.length >= 1) {
                res.status(409).json({
                    message: "Email ID already exists. Please enter another email ID"
                });
            } else {
                let newEmployee = new Employees({
                    _id: new mongoose.Types.ObjectId(),
                    username: req.body.username,
                    email: req.body.email,
                    number: req.body.number,
                    designation: req.body.designation,
                    gender: req.body.gender,
                    course: req.body.course,
                    image: req.body.image,
                    created_at: new Date()
                });
                newEmployee.save()
                    .then(result => {
                        console.log(result);
                        res.status(201).json({
                            message: "Employee created successfully",
                            employee_detail: result
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });
                    });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}


exports.allEmployee = (req, res) => {
    Employees.find()
        .then(response => {
            res.status(200).json({
                message: "Employee list loaded successfully",
                employeeList: response
            });
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
}


exports.oneEmployee = (req, res) => {
    const { id } = req.params;
    Employees.findById(id)
        .then(response => {
            res.status(200).json({
                message: "Employee loaded successfully",
                employee: response
            });
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
}

exports.editEmployee = async (req, res) => {
    try {
        const { id } = req.params;
       
        const updatedEmployee = await Employees.updateOne({ _id: id }, req.body);

        if (!updatedEmployee) {
            return res.status(404).json({
                message: `Can't find any ID: ${id}`
            });
        }

        res.status(200).json({
            message: "Employee updated",
            employee: req.body
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//function for delete
exports.employee_delete = (req, res, next) => {
    Employees.deleteOne({ _id: req.params.id }).exec()
        .then(result => {
            if (result.deletedCount > 0) {
                res.status(200).json({
                    message: "User deleted"
                });
            } else {
                res.status(404).json({
                    message: "User not found"
                });
            }
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
}