const { feesservice, fee_submit, fee_submitted } = require("../Services/fees_service");

exports.feesctrl = async (req, res) => {
    let data = await feesservice(req);
    if(data.success){
        res.render("accounts", { data: data.data, Dataad: data.admin });
    }
    else{
        console.log("error");
    }
};

exports.fee_submit_controller = async (req,res)=>{
    let data = await fee_submit(req);
    if(data.success){
        res.render("fee_submission",{data:data.data,Dataad:data.admin})
        }
    else{
        console.log("error");
    }
}
exports.fee_submitted_controller = async (req,res)=>{
    let data = await fee_submitted(req);
  
    if(data.success){
        res.redirect("fee_submit");
    }
    else{
        console.log("error");
    }
}

