
const {book_manager} = require('../services/book_manager_service');
const { userprofile } = require("../services/users_profile_service");


exports.book_manager = async (req, res) => {
    let data = await book_manager(req,res);
    let dataadmin = await userprofile(req, res);

    if(data.success){
        res.render('book_manager', {data: data.data,Dataad:dataadmin.data});
        console.log("datadsdsds",data.data);
    }else{
        res.send("Error Happened");
    }
}

