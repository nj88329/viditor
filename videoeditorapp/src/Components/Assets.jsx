import { useState , useEffect } from "react";
import axios from "axios";
import Section2 from "./Section2";
import Section3 from "./Section2";
import Droppable from "../utilityFunctions/Droppable.jsx";
import Draggable from "../utilityFunctions/Draggable";

const Assets = () => {
    
    const [files, setFiles] = useState([]);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [imageUrl, setImageUrl] = useState("");
    const [ backendFiles , setBackendFiles] = useState([]);
    const [ droppeditem , setDroppedItems ] = useState([]);


    const handleDrop = (item) => {
        setDroppedItems(item);
    };


    useEffect(() => {
        fetch("http://localhost:5000/upload/files") // Adjust the endpoint based on your backend
            .then(response => response.json())
            .then(data => setBackendFiles(data.files)) // Assuming backend returns { files: [...] }
            .catch(error => console.log("Error fetching files:", error));
    }, [uploadedFiles]);


    const handleFileChange = (e) => {
        // console.log('handle');
         setFiles(Array.from(e.target.files));
        // setPreview(URL.createObjectURL(file));
        // console.log('handleafter');
    };
       
    console.log('uploaded', uploadedFiles)

    
    const handleUpload = async (e) => {
        e.preventDefault();
        if (files.length === 0) return;

        try {
            // Extract filenames from already uploaded files
            const existingFiles = new Set(uploadedFiles);
        
            // Upload all files in parallel
            const uploadPromises = files.map(async (file) => {
                const formData = new FormData();
                formData.append("file", file);
                  console.log('filesfromtned', file)
                // Check if file already exists
                if (existingFiles.has(file.name)) {
                    alert(`File "${file.name}" already exists`);
                    return null;
                }
                

                const response = await axios.post("http://localhost:5000/upload", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
          
                console.log('resep', response.data.file)
             // Correct way to set the image URL from the response
            // setImageUrl(`http://localhost:5000/uploads/${response.data.file.filename}`);

               return response.data.file;
            });

            // Resolve all upload promises and filter out null values (duplicate files)s
            const newFiles = (await Promise.all(uploadPromises)).filter(Boolean);
            console.log('newfile', newFiles)
            // Update state only once with new unique files
            if( uploadedFiles.length === 0 ) {
                setUploadedFiles(newFiles)
            }
            else {
                 setUploadedFiles((prev) => [...prev, ...newFiles]); 
                }

            console.log('response', uploadedFiles)

            alert("Files uploaded successfully");              
        } catch (error) {
            console.log("Error uploading files:", error);
        }
    };

    return (
        
    <div className="container">
            <div className="section section1">
                <div>
                        <input type="file" multiple onChange={handleFileChange} />
                        <button onClick={handleUpload} >
                              Upload
                        </button>         
                     <div>
                        <h3>Uploaded Files:</h3>
            
                     <ul>
                     {uploadedFiles.map((file, index) => {
                        
                                const imageUrl = `http://localhost:5000/uploads/${file.filename}`; // Adjust the path accordingly
                                return (
                                   <li key={index}>
                                          {/* <p>{file.filename}</p> */}
                                     <Draggable 
                                         Item = {  <img 
                                            src={imageUrl} 
                                            alt={file.filename} 
                                            style={{ width: "50px", height: "50px", objectFit: "cover" }} 
                                            />}
                                        />
                                    </li>
                                );
                              
                            
                            })}
                    </ul>
                    </div>
                    <div>
                        
                    </div>
                </div>
            </div>
        
            <div className="section section2"><Section2 onDrop = {handleDrop} />
            </div>
            <div className="section section3"><Section3/></div>
        </div>
    );
};

export default Assets;
