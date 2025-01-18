import axios from 'axios';
import { useState } from 'React';

const Assets = () => {
    const [files, setFiles] = useState([]);
    const [uploadedFiles, setUploadedFiles] = useState([]);

    const handleFileChange = (e) => {
        setFiles(Array.from(e.target.files));
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (files.length === 0) return;

        try {
            // Iterate through files and upload them one by one
            for (const file of files) {
                const formData = new FormData();
                formData.append('file', file);

                const response = await axios.post('http://localhost:3000/upload', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });

                // Add uploaded file to state
                setUploadedFiles((prev) => [...prev, response.data.file.filename]);
            }
            alert('Files uploaded successfully');
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('File upload failed');
        }
    };

    return (
    <div className="container">
    <div className="section section1">
        <div>
            <form onSubmit={handleUpload}>
                <input type="file" multiple onChange={handleFileChange} /> {/* Enable multiple file selection */}
                <button type="submit">Upload</button>
            </form>
            <div>
                <h3>Uploaded Files:</h3>
                <ul>
                    {uploadedFiles.map((file, index) => (
                        <li key={index}>{file}</li> // Properly return each file in the list
                    ))}
                </ul>
            </div>
        </div>
    </div>
    <div className="section section2">Section 2</div>
    <div className="section section3">Section 3</div>
</div>
    );
};

export default Assets
