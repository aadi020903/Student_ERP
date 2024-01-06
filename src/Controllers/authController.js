const {AuthService} = require('../Services/authService');
exports.AuthController= async(req,res)=>{

  let data = await AuthService(req,res)
  if(data.success){
      res.redirect("/api/login_admin")
  }
  else{
    res.send("error aya api m")
  }


}

