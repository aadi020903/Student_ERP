const {
  exam_report_submit,
  exam_report_submitted,
  exam_report_view,
} = require("../Services/exam_report_service");

exports.exam_report_submit = async (req, res) => {
  let data = await exam_report_submit(req, res);
  if (data.success) {
    res.render("exam_report",{Dataad:data.admin});
  }
  else{
    console.log("error");
  }
};
exports.exam_report_submitted = async (req, res) => {
  let data = await exam_report_submitted(req, res);
  if (data.success) {
  res.redirect("exam_report_submit");
  }
};

exports.exam_report_view = async(req,res)=>{
  let data = await exam_report_view(req,res)
  if(data.success){
    res.status(201).json(data.reportData)
  }
  else{
    res.status(404).json(data.reportData)
  }
}
