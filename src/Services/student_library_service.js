const studentModel = require('../models/student_model')
const libraryModel = require('../models/library_model')

exports.bookIssueDetails = async(req,res)=>{
    const token = req.headers.token;
    try {
        let student = await studentModel.findOne({ auth: token });
        let issuedBooks = await libraryModel.findOne({ studentId: student.sid});
        
        if (!student) {
            return {
                success: false,
                student: [],
                bookData: [],
                message: "No student found",
            };
        }

        if (issuedBooks) {
            return{
                success: true,
                bookData: issuedBooks.browsingHistory,
                message: "success",
            }
        } else {
            return {
                success: false,
                bookData: [],
                student: [],
                message: "No book details found",
            };
            
        }
        
    } catch (error) {
        console.log("Error in book issue details : ", error);
        
    }
}