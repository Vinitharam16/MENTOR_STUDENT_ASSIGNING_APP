const Mongoose = require("mongoose");
const studentModel = require("../models/student.model");

function GET_ALL_STUDENTS(req, res, next) {
    studentModel.find()
        .then((response) => {
            if (response.length < 1) {
                return res.status(200).json({
                    success: true,
                    data: response,
                    message: "No students data found",
                })
            }
            else {
                return res.status(200).json({
                    success: true,
                    data: response,
                    message: "students data fetched successfully",
                })
            }
        }).catch((err) => {
            return res.status(402).json({
                success: false,
                error: err,
                message: "something went wrong",
            })
        })
}

function CREATE_NEW_STUDENT(req, res, next) {
    const newStudent = new studentModel({
        "name": req.body.name,
        "batch": req.body.batch,
        "mentor": req.body.mentor ? req.body.mentor : undefined
    });
    newStudent.save()
        .then((response) => {
            if (response._id) {
                return res.status(200).json({
                    success: true,
                    message: "student created successfully",
                    data: response,
                })
            }
            else {
                throw new Error({
                    message: "Something went wrong",
                })
            }
        })
        .catch((err) => {
            return res.status(402).json({
                success: false,
                error: err,
            })
        })
}

function NO_MENTOR_STUDENT(req, res, next) {
    studentModel.find({ mentor: undefined })
        .then((response) => {
            return res.status(200).json({
                success: true,
                data: response,
                message: "Students with no mentors fetched successfully",
            })
        }).catch((err) => {
            return res.status(402).json({
                success: false,
                error: err,
                message: "something went wrong",
            })
        })
}

function ASSIGN_STUDENT_MENTOR(req, res, next) {
    const { id } = req.params;
    const { mentor } = req.body;
    studentModel.findById(id)
    .then((response)=>{
        response.mentor=mentor;
        return response.save();
    })
    studentModel.findById(id)
        .then((response) => {
            return res.status(200).json({
                success: true,
                data: response,
                message: "Mentor Assigned Successfully"
            })
        })
        .catch((err) => {
            return res.status(402).json({
                success: false,
                error: err,
                message: "something went wrong",
            })
        })
}

function ASSIGN_MENTOR_STUDENTS(req, res, next) {
    const { mentor, stud_list } = req.body;

    const studentlist = stud_list.map((stud_id) => {
        return studentModel.findById(stud_id)
            .then((student) => {
                student.mentor = mentor;
                return student.save();
            });
    });
    studentModel.find()
        .then((response) => {
            return res.status(200).json({
                success: true,
                data: response,
                message: "Students with mentors fetched successfully",
            })
        }).catch((err) => {
            return res.status(402).json({
                success: false,
                error: err,
                message: "something went wrong",
            })
        })
}

function MENTOR_STUDENT_LIST(req, res, next) {
    const { id } = req.params;
    studentModel.find({ mentor: id })
        .then((response) => {
            return res.status(200).json({
                success: true,
                data: response,
                message: "Mentor with all studentsList fetched successfully"
            })
        })
        .catch((err) => {
            return res.status(402).json({
                success: false,
                error: err,
                message: "something went wrong",
            })
        })
}


module.exports = {
    GET_ALL_STUDENTS,
    CREATE_NEW_STUDENT,
    NO_MENTOR_STUDENT,
    ASSIGN_STUDENT_MENTOR,
    ASSIGN_MENTOR_STUDENTS,
    MENTOR_STUDENT_LIST
}