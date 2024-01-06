const {
    view_all_students_service,
} = require("../Services/view_all_students_service");

const view_all_students = async (req, res) => {
    try {
        const result = await view_all_students_service(req,res);
        res.status(200).send({
            message: result.message,
            data: result.students
        });
    } catch (error) {
        res.status(400).send({
            message: "error in controller"
        });
    }
}

module.exports = {
    view_all_students,
}