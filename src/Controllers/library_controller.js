
const {library_service}=require("../Services/library_service")

exports.libraryctrl=async(req,res)=>{
    let data=await library_service(req);
    if(data.success){
        const dataa=data.data;
        res.status(201).json(dataa);
        console.log(data.message);
    }
    if(!data.success){
        const dataa=data.data;
        res.status(404).json(dataa);
        console.log(data.message);
    }
}