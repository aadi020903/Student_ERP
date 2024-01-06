let {
    teacher_manager,
    teacher_update,
    teacher_update_get,
} = require("../services/view_teachers_service");
const { userprofile} = require("../services/users_profile_service");


//Admin Login
exports.teacher_manager = async(req,res) => {
    let data = await teacher_manager(req,res);
    let dataadmin = await userprofile(req, res);
   try {
     if(data.success) {
         res.render("view_teachers",{teacher_data:data.data, Dataad: dataadmin.data});
     }
     else {
         res.redirect("api/dashboard");
         console.log("Error Happened");
     }
   } catch (error) {
        res.redirect("api/dashboard");
        console.log("Error Happened");
   }
};

exports.teacher_update = async(req,res) => {
    try {
        let data = await teacher_update(req,res);
        let dataadmin = await userprofile(req, res);
        if(data.success) {
            res.redirect("/api/view_teachers");
        }
        else {
            res.redirect("api/view_teachers");
            console.log(data.message);
        }
    } catch (error) {
        res.redirect("api/view_teachers");
        console.log(error);
    }
};

exports.teacher_update_get = async(req,res) => {
    let data = await teacher_update_get(req,res);
    let dataadmin = await userprofile(req, res);
   try {
     if(data.success) {
         res.render("teacher_update",{teacher_data: data.data, Dataad: dataadmin.data});
     }
     else {
         res.redirect("api/iew_teachers");
         console.log("Error Happened");
     }
   } catch (error) {
    res.redirect("api/iew_teachers");
    console.log(error);
   }
};