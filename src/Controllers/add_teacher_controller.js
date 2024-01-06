let {
    teacher_register_save,
} = require("../Services/add_teacher_service");

//Admin Login
exports.add_teacher_get = async(req,res) => {
    res.render("add_teacher");
};

exports.teacher_register_save = async(req,res) => {
    let data = await teacher_register_save(req,res);
    if(data.success) {
        res.redirect("view_teachers");
        console.log("Teacher Added Successfully");
    }
    else {
        res.send("Error Happened");
        console.log(error);
    }
};