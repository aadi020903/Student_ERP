const { account_settings } = require("../Services/account_settings_service.js")

exports.account_settings = async (req, res) => {
    let data = await account_settings(req, res)
    try {
        if (data.success) {
            res.render("account_settings",{Dataad:data.data})
        }
        else {
            console.log("error")
        }
    } catch (error) {
        console.log(error);
    }
}