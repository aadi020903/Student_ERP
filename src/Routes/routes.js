const express = require("express");
const router = express.Router();
const{libraryctrl}=require("../Controllers/library_controller")
const{accctrl,payctrl, acc_details_ctrl}=require("../Controllers/accounts_controller")
const{feesctrl}=require("../Controllers/fees_controller")
const { student_register, student_registered,loginctrl,totalentryctrl} = require("../Controllers/validation_controller");
const{updatectrl}=require("../Controllers/update_controller")

//validation controller

router.post("/login",loginctrl)
router.get("/totalentry",totalentryctrl);

//update controller
router.post("/update",updatectrl);

//fees controller
router.get("/feesctrl",feesctrl)

//accounts controller
router.get("/account_details",acc_details_ctrl)
router.post("/accounts",accctrl)
router.post("/payment",payctrl)

//library controller
router.post("/library",libraryctrl)

module.exports = router;
