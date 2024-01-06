const { add_fee_heads,
    add_fee_heads_save
} = 
require('../Services/add_fee_heads_service.js');

exports.add_fee_heads = async (req,res)=>{

    let data = await add_fee_heads(req,res);
    if(data.success){
        res.render('add_fee_heads',{Dataad:data.admin});
    }
    else{
        console.log("error");
    }
}

exports.add_fee_heads_save = async (req,res)=>{
    let data = await add_fee_heads_save(req,res);
    if(data.success){
        // res.json(data)
        res.redirect('/api/add_fee_heads');
        console.log(data.message);
    }
    else{
        console.log(data.message);

    }
}