// import fs from "fs";
// import path from "path";


const getFiles = (req, res)=>{
        
    const directoryPath = path.join(__dirname, "uploads");
    
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            return res.status(500).json({ error: "Unable to scan files" });
        }
        
        const fileList = files.map(file => ({ filename: file }));
        res.status(200).json({ files: fileList });
    });

}



module.exports = { getFiles }