//for excle file 
const mongoose=require('mongoose')
//data base coonection require
require('../Config/dbconfig')
//schema require
require('../Database/schema/users')
require('../Database/seeder/book')
require('../Database/seeder/person')
// model require
const user = mongoose.model('Users');
const Contactus=mongoose.model('Contactus');
const book = mongoose.model('Book');
const person=mongoose.model('Person');
var mongoXlsx = require('mongo-xlsx');
var json2xls = require('json2xls');
var fs=require('fs') //for csv file
const { Parser } = require('json2csv'); ///for csv file

module.exports.excelSheet =(req, res)=>{
    console.log("datawww run");
// this for formated data for excel 
    // var excelData =async function(){
    //   var data = await propertyData.find({});
    //   // console.log(data);
    //   var model = mongoXlsx.buildDynamicModel(data);
    //   mongoXlsx.mongoData2Xlsx(data, model, function(err, data) {
    //     console.log('File saved at:', data.fullPath); 
    //     res.send({message:"excel file created"})
    //   });
  
    // }; 
  
// this for formated data for excel
    var excelData =async function(){
    var data = await user.find({});
    var xls = json2xls(data,{
        fields: ['_id', 'user_name', 'email', 'password', 'comments']
    });
    
    fs.writeFileSync(__dirname +'/../Uploads/data.xlsx', xls, 'binary');
        console.log("excl creater");
        res.send("excl creater");
    };

  excelData();

}


 
module.exports.csvFile =(req, res)=>{
    var csvData =async function(){
            var data = await user.find({});
            res.send(data);
            var fields = ['_id', 'user_name', 'email', 'password', 'comments'];
            const json2csvParser = new Parser({ fields });
            const csv = json2csvParser.parse(data);
            // fs.writeFile('file.csv', csv, function(err) {
            // if (err) throw err;
            // console.log('file saved');
            // });
            fs.writeFileSync(__dirname +'/../Uploads/data.csv', csv, 'binary');
            console.log("csv creater");
            
    }
csvData();
}

// var formidable = require("formidable");
// module.exports.Formdib=(req,res)=>{
//     var form = new formidable.IncomingForm();

//     form.parse(req);

//     form.on('fileBegin', function (name, file){
//         file.path = __dirname + '/data/' + file.name;
//     });

//     form.on('file', function (name, file){
//         console.log('Uploaded ' + file.name);
//     });

//     return res.json(200, {
// 							result: 'Upload Success'
//     });
// };



const sgMail = require('@sendgrid/mail');
 sgMail.setApiKey('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');
//  sgMail.setApiKey('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')
// by sendGrid send mail for fake
module.exports.FakeMail=(req,res)=>{
    console.log("hel;lo get dat")
    const msg = {
    to: 'mishra.arun18@gmail.com',
    from: 'mishra.arun18@gmail.com',
    subject: 'Sending with Twilio SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };
    sgMail.send(msg).then((res,err)=>{
        console.log("msgv ggggggg",err)
        if(res){
        console.log("msg",res)
        }else{
        console.log("err")
        }
    });

} 

module.exports.testapi=(req,res)=>{
    try{
        if(req.body){
            user.aggregate([{ $match: { "zip": 90210 }}]);
        }else{
            res.send({err:"somthing error in  req.body"})            
        }
    }catch{

    }
}

module.exports.passChange=(req,res)=>{
    var khhh=cryptr.encrypt(req.body.pass);
    var hhhk=cryptr.decrypt(khhh);
    console.log("hhhhhhhhhhhhh", khhh,hhhk);
}

module.exports.getdataby=(req,res)=>{
    var h=[];
    user.find({},{_id:1}).then((results)=>{ //all id find in table
        // user.find({},{email:1}).then((res)=>{  //for id and email
           // user.find().select({ email: 0 }).then((res)=>{ //not incude email all data find
          // user.find({},{_id:0,email:1}).then((res)=>{ //this is use for only email
            console.log("ressssssss",results);
            results.forEach((result)=>{
                h.push(Contactus.findOne({user_id:result._id}))           
            })
            Promise.all(h).then((r)=>{
                let data = r.filter(val => {
                    if(val) return val;
                })
                    // console.log(data,"hjghjg");  
                    res.status(200).send(data);
            })
    })
    
}
/// for ref use 
module.exports.bookDetails=(req,res)=>{ 
    try{
        console.log("try body",req.body); 
        const author = new person({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
          });
          
          author.save().then((result)=>{
              console.log(result,"fjdghdfj")
                   
                    if(result){
                        console.log(result._id,"fjdghdfj")
                        new book({
                                bookname: req.body.bookname,
                                personId:result._id,
                                auther:req.body.auther,
                                price:req.body.price   // assign the _id from the person
                            }).save(function (err) {
                            if (err) return handleError(err);
                            else console.log("output")
                            // thats it!
                            });
                        }   
                        else{
                            console.log("somthing error")  
                        }
          });
          
    }catch(err){
        return res.status(401).json({error: err});
    }
}

module.exports.GetbookDetails=(req,res)=>{ 
    try{
        book.find({bookname:"kali"}).populate('personId').exec(function (err, story) {
    if (err) return handleError(err);
    console.log('The author is %s', story);
    })
}catch(err){
        return res.status(401).json({error: err});
    }
}

module.exports.PersonDetails=(req,res)=>{
    try{
        // console.log("try body",req.body); 
            new book({
                bookname: req.body.bookname,
                auther:req.body.auther,
                price:req.body.price   // assign the _id from the person
            }).save().then((result)=>{
                // console.log(result)
                        if(result){
                            new person({
                                books:result._id,
                                name:req.body.name  
                            }).save().then((data)=>{
                                console.log("result ",data)
                            })
                            .catch((err)=>{
                                return res.status(401).json({error: err,resp:"somthing problem to save person data"});
                            })
                        }   
                        else{
                            console.log("somthing error")  
                        }
                }).catch((err)=>{
                    return res.status(401).json({error: err,resp:"error to data save"});
                });
    }catch{
        return res.status(401).json({error: err,resp:"error savesomthig data"});
    }
}


module.exports.GetPersonDetails=(req,res)=>{ 
    try{
        console.log("hfjksdfj")
        person.find({name:"kumar"}).populate('books').exec(function (err, person) {
    if (err) return handleError(err);
    console.log('The author is %s', person);
    res.send({resp:person})
    })
}catch(err){
        return res.status(401).json({error: err});
    }
}
//end ref use

//lookup for join
module.exports.LookupData=(req,res)=>{ 
        book.aggregate([
            { $lookup:
                {
                from: "person",
                localField:"books",
                foreignField: "_id",
                as: "comments"
                }
            }
        ]).then((data)=>{
            if(data){
console.log("data",data)
            }else{
                console("some problem to data")
            }
        })
}

//lookup for join