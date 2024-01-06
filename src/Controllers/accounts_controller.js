

const { accservice, payservice, acc_details_service } = require("../Services/accounts_service");


exports.payctrl = async (req, res) => {
    let data = await payservice(req);
    if (data.success) {
      const dataa = data.data;
      res.status(201).json({dataa});
      console.log(data.message);
    }
    if (!data.success) {
        const dataa = data.data;
        res.status(404).json(dataa);
        console.log(data.message);
      }
  };
  
  
  exports.accctrl = async (req, res) => {
    let data = await accservice(req);
    if (data.success) {
      const dataa = data.data;
      res.status(201).json(dataa);
      console.log(data.message);
    }
    if (!data.success) {
      const dataa = data.data;
      res.status(404).json(dataa);
      console.log(data.message);
    }
  };
  

  exports.acc_details_ctrl = async (req,res)=>{

    let data = await acc_details_service(req);
    // console.log(data.data[0].name);
    if (data.success) {
      // res.status(201).json(dataa);
      res.render("account_details",{data:data.data, Dataad: data.admin})
      console.log(data.message);
    }
    if (!data.success) {
      const dataa = data.data;
      res.status(404).json(dataa);
      console.log(data.message);
    }
  }