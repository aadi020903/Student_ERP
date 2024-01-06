const {userprofile,edit_profile_service} =require('../services/users_profile_service')

exports.users_get_profile=async(req,res)=>{
    let data = await userprofile(req,res);
     if(data.success){
  res.render('users_profile',{Dataad:data.data})
  }
}
//-----------------------------editProfile----------------------------
 exports.edit_profile_controller=async(req,res)=>{
    
    const result = await edit_profile_service(req,res);
    let data = await userprofile(req,res);
   res.render('users_profile',{Dataad:data.data})
}