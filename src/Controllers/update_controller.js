const { updateservice } = require("../Services/update_service");
exports.updatectrl = async (req, res) => {
    let data = await updateservice(req);
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
  