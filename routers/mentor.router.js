const Mongoose = require("mongoose");
const mentorModels = require("../models/mentor.models");

function GET_ALL_MENTORS(req, res, next) {
    mentorModels.find()
        .then((response) => {
            if (response.length < 1) {
                return res.status(200).json({
                    success: true,
                    data: response,
                    message: "No mentors data found",
                });
            }
            else {
                return res.status(200).json({
                    success: true,
                    data: response,
                    message: "mentors data fetched successfully"
                });
            }
        })
        .catch((err) => {
            return res.status(402).json({
                success: false,
                error: err,
                message: "Something went wrong"
            });
        })
}

function CREATE_NEW_MENTOR(req,res,next){
    const newMentor = new mentorModels(req.body);
    newMentor.save()
    .then((response) => {
        if(response._id) {
            return res.status(200).json({
                success:true,
                data:response,
                message:"Mentor created successfully",
              })
        } else {
            throw new Error({
                message: "Something went wrong",
            })
        }
    }).catch((err)=>{
        return res.status(402).json({
            success:false,
            error:err
        })
    })
}

module.exports = {
    GET_ALL_MENTORS,
    CREATE_NEW_MENTOR
};