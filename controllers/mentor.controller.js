const { GET_ALL_MENTORS, CREATE_NEW_MENTOR } = require("../routers/mentor.router");



const MentorsRouter = require("express").Router();

/**
 * METHOD = GET
 * DESCRIPTION = helps to get data from database
 * COLLECTION = Mentors
 */

MentorsRouter.get('/', GET_ALL_MENTORS);

/**
 * METHOD = POST
 * DESCRIPTION = helps to post data from the database
 * COLLECTION = Mentors
 */

MentorsRouter.post('/create', CREATE_NEW_MENTOR);



module.exports = MentorsRouter;