const tempModel = require("../../db/Model/tempModel");
const Express = require("express");
const multer = require("multer");
const path = require("path");


const uploadUserProfile = (profileId) => {
    const folderPath = "./uploads/users";
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, folderPath);
        },
        filename: (req, file, cb) => {
            let finalName = file.originalname.split('.').pop();
            if(req.headers.id){
                finalName =  `${req.headers.id }.${finalName}`;
            }
            // console.log(req.headers.id)
            const fileUid = require("crypto").randomBytes(16).toString("hex");
            const fileName = finalName || `${fileUid}_${file.originalname}`;
            cb(null, finalName);
        },
    });
    const upload = multer({ storage: storage });
    return upload;
};
const uploadToCourse = () => {
    const folderPath = "./uploads/courses";
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, folderPath);
        },
        filename: (req, file, cb) => {
            // console.log(`file` ,file);
            // console.log(req.headers.lesson)
            // console.log(req.files)

            const fileUid = require("crypto").randomBytes(16).toString("hex");
            const fileName = `${fileUid}_${file.originalname}`;
            // console.log('name =',path.basename(file.originalname))
            
            
            cb(null, fileName);
        },
    });
    const upload = multer({ storage: storage });
    return upload;
};
const uploadToTask = () => {
    const folderPath = "./uploads/tasks";
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, folderPath);
        },
        filename: (req, file, cb) => {
            // console.log(`file` ,file);
            // console.log(req.headers.lesson)
            // console.log(req.files)

            const fileUid = require("crypto").randomBytes(16).toString("hex");
            const fileName = `${fileUid}_${file.originalname}`;
            // console.log('name =',path.basename(file.originalname))
            
            
            cb(null, fileName);
        },
    });
    const upload = multer({ storage: storage });
    return upload;
};
const getT = (req, res) => {
    tempModel.findOne({ id: "hid" }, (er, dt) => {
        res.send(dt);
    });
};

const quill = (req, res) => {
    res.send("qill edit");
    console.log(req.headers);
    const data = req.headers.del;

    const pd = tempModel.findOneAndUpdate(
        { id: "hid" },
        { data: data },
        {
            new: true,
            upsert: true, // Make this update into an upsert
        },
        (er, dt) => {
            console.log(er);
        }
    );
    // pd.save().catch(er=> console.log(`can't initiatie use ${id}`))
};

module.exports = {
    uploadUserProfile,
    quill,
    getT,
    uploadToCourse,
    uploadToTask
};
