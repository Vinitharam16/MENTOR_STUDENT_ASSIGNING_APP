const { GET_ALL_STUDENTS, CREATE_NEW_STUDENT, ASSIGN_STUDENT_MENTOR, NO_MENTOR_STUDENT, ASSIGN_MENTOR_STUDENTS, MENTOR_STUDENT_LIST } = require("../routers/student.router");


const StudentRouter = require("express").Router();

/**
 * METHOD = GET
 * DESCRIPTION = helps to get data from database
 * COLLECTION = Students
 */

StudentRouter.get('/', GET_ALL_STUDENTS);

/**
 * METHOD = POST
 * DESCRIPTION = helps to post data from the database
 * COLLECTION = Students
 */

StudentRouter.post('/create', CREATE_NEW_STUDENT);

/**
 * METHOD = GET
 * DESCRIPTION = helps to get data from database
 * COLLECTION = Students
 */

StudentRouter.get('/no-mentors', NO_MENTOR_STUDENT);

/**
 * METHOD = PATCH
 * DESCRIPTION = helps to update partial data to the database
 * COLLECTION = Students
 */

StudentRouter.patch('/assignmentor/:id', ASSIGN_STUDENT_MENTOR);

/**
 * METHOD = PATCH
 * DESCRIPTION = helps to update partial data to the database
 * COLLECTION = Students
 */
StudentRouter.patch('/assign-mentor-students',ASSIGN_MENTOR_STUDENTS);

/**
 * METHOD = GET
 * DESCRIPTION = helps to get data from database
 * COLLECTION = Students
 */
StudentRouter.get('/mentor-students/:id',MENTOR_STUDENT_LIST)

module.exports = StudentRouter;

