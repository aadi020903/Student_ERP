const {
    teacher_login_service
}= require('../Services/teacher_login_service.js');

exports.teacher_login_post = async (req, res) => {
    try {
        const teacher_login = await teacher_login_service(req,res);
        res.status(200).json(teacher_login);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}