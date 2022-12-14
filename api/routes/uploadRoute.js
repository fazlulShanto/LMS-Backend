const Express = require('express');
const router  = Express.Router();
const userModel = require('../db/Model/userModel')
const path = require('path');
const {quill,getT,uploadToCourse,uploadUserProfile}  =require('../controller/upload/uploadController');
////
// const multer = require('multer');
// const folderPath = './uploads/courses'

// const storage = multer.diskStorage({
//     destination : (req,file,cb)=>{
//         cb(null,folderPath);
//     },
//     filename :(req,file,cb)=>{
//         console.log(`file` ,file);
//         const fileUid = require('crypto').randomBytes(16).toString('hex'); 
//         const fileName = `${fileUid}${path.extname(file.originalname)}`;
//         // console.log(fileUid);
//         cb(null,fileName);
//     }
// })
// const upload = multer({storage : storage})
/////
router.get('/',(req,res)=>{
    // res.statusCode =400;
    getT(req,res);
    
})
router.post('/',(req,res)=>{
    // res.statusCode =400;
    quill(req,res);
    
})

// router.post('/img',upload.array('file'),(req,res)=>{
//     console.log(`req` , req.body)
//     res.status(200).send(`done Upload`)
// });
router.post('/file',uploadToCourse().array('file'),(req,res)=>{
    // console.log('headers')
    // console.log(req.headers)
    // console.log('body')
    // console.log(req.body)
    // console.log('files')
    // console.log(req.files)
    // req.files.forEach(v =>{
    //     console.log(v.path)
    // })
    res.status(200).send({msg : `done Upload`})
});
router.post('/img',uploadUserProfile().single('file'),async (req,res)=>{
    // console.log('headers')

    // console.log('body')
    // console.log(req.body)
    // console.log('files')

    const id = req.headers.id;
    const savedPath = req.file.path;
    const pd = await userModel.findOneAndUpdate({user_uuid:id} , {
        $set : {
            profile_image : savedPath
        }
    }).exec();

    if(pd){

       return res.status(200).send({msg : `done Upload image`})
    }

    return res.status(500).send('image upload fialed')
});



module.exports = router;