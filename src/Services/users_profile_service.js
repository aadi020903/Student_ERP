const adminSchema = require('../models/admin_model')
exports.userprofile = async (req, res) => {
    try {
        const token = req.cookies.token;
        // console.log(token);

        let data = await adminSchema.findOne({ authKey: token });

        // console.log("Uererersd",data);
        if (data) {
            return{
            data: data,
            success: true,
        }
    }

    } catch (error) {
        console.log(error);
    }
};
//---------------------------------editProfile--------------------------------
exports.edit_profile_service = async (req, res) => {
    try {
      const token = req.cookies.token;
      console.log(token);
      
      // Find user based on authKey (assuming it's a field in your adminSchema)
      console.log(token+"account setting");
      let user = await adminSchema.findOne({ authKey: token });
      console.log(user);
      if (user) {
        user.file = req.file.filename;
        user.username = req.body.username;
        user.phone = req.body.phone; 
        await user.save();
        return{
          user:user
        }
      } else {
        return res.status(404).json({ message: 'User not found!' });
      }
    } catch (error) {
      console.error(error);
      // return res.status(500).json({ message: 'Internal server error in updating profile' });
    }
  };