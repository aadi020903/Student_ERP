const { library_service } = require('../services/library_service');
const { userprofile } = require("../services/users_profile_service");



exports.book_issue =async (req, res) => {
    let dataadmin = await userprofile(req,res);
   res.render("book_issue",{Dataad: dataadmin.data});
  
}

exports.book_issue_data= async   (req, res) => {
    // let data=await library_service(req);
    // if(data.success){
    //     const dataa=data.data;
    //     res.status(201).json(dataa);
    //     console.log(data.message);
    // }
    // if(!data.success){
    //     const dataa=data.data;
    //     res.status(404).json(dataa);
    //     console.log(data.message);
    // }
    try {
        let data = await library_service(req);
        
        if(data.success){
            
            let dataadmin = await userprofile(req,res);
            console.log('dataadmin.data');
            res.render("dashboard",{Dataad: dataadmin.data});
            console.log(data.message);
            console.log(data.data);
        }
        else{
            
            console.log("Error in member_service",data);
        }
    }catch(error){
        console.log(error+"hiii");
    }
}
