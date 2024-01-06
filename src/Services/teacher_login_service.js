const TeacherModel = require('../models/Teacher_Model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.teacher_login_service = async (req, res) => {    
    const email = req.body.email;
    const password = req.body.password;

    try {
        const teacher = await TeacherModel.findOne({ email });

        if (!teacher) {
            throw new Error('Invalid email');
        }

        const status = teacher.status;

        if (status === "Blocked") {
            throw new Error('Teacher is Blocked');
        }

        const isMatch = await bcrypt.compare(password, teacher.password);

        if (!isMatch) {
            throw new Error('Invalid password');
        }

        const token = jwt.sign({ teacherId: teacher._id }, process.env.JWT_SECRET);

        // Set the token as a cookie in the response
        
        const updatedTeacher = await TeacherModel.findByIdAndUpdate(
            teacher._id,
            { auth_key: token },
            { new: true }
            );
            // res.cookie('test', 'yourTokenValue', { httpOnly: true });
            // res.cookie('test', "token", { httpOnly: true });
            res.clearCookie('test');
            
            return {
            success: true,
            message: 'Teacher logged in successfully',
            token,
            teacher: updatedTeacher,
        };
    } catch (error) {
        console.error('Login error:', error.message);
        return res.status(401).json({
            success: false,
            message: error.message,
            token: null,
            teacher: null,
        });
    }
}
