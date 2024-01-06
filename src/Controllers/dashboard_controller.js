const {dashboard_service} = require('../Services/dashboard_service')


module.exports.dashboard_service = async(req,res)=>{
    let data = await dashboard_service(req,res)
    // res.json(data)
    if(data.success){
        res.render("dashboard",{data:data.data,Dataad:data.admin});
    }
    else{
        console.log("error")
    }
}