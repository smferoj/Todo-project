const ProfileModel = require("../models/profileModel");
const jwt = require('jsonwebtoken');

//=========================User create====================

exports.CreateProfile=(req, res)=>{
let reqBody = req.body;
ProfileModel.create(reqBody, (err, data)=>{
    if(err){
        res.status(400).json({status: "fail", data:err})
    }else{
        res.status(200).json({status:"success", data:data})
    }
})
}

// ====================User login ================================

exports.userLogin=(req, res)=>{
    // let reqBody = req.body;
     let UserName = req.body['UserName']
     let Password = req.body['Password']
    ProfileModel.find({UserName, Password}, (err, data)=>{
       if(err){
        res.status(400).json({status: "fail", data:err})
       }else{
        if(data.length>0){

         // create auth token
        let payload = {exp: Math.floor(Date.now()/1000)+(24*60*60),
            data:data[0]}
         let token = jwt.sign(payload, 'SecretKey123456');
            res.status(200).json({status:"success", token, data:data})
        }else{
            res.status(401).json({status:"unathorised"})
        }
       }
    })
    }

    // =====================Select single user=========================

    exports.SelectProfile = (req, res)=>{
        let UserName = req.headers['username']
        ProfileModel.find({UserName}, (err, data)=>{
            if(err){
                res.status(400).json({status: "fail", data:err})
            }
            else{
                res.status(200).json({status:"success", data:data})
            }
        })
    }

//================================Update Profile===================

exports.UpdateProfile = (req, res)=>{
    let UserName = req.headers['username']
    let reqBody = req.body;
    
    ProfileModel.updateOne({UserName:UserName}, {$set:reqBody}, {upsert:true}, (err, data)=>{
        if(err){
            res.status(400).json({status: "fail", data:err})
        }
        else{
            res.status(200).json({status:"success", data:data})
        }
    })

}
