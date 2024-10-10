import React, { useState } from 'react';
import axios from 'axios';

const Upload = () => {
    const [userResume, setUserResume] = useState(null);
    const [templateResume, setTemplateResume] = useState(null);
    const [outputPath, setOutputPath] = useState('C:\\Users\\vikas.jain\\PDF\\Output\\Output.pdf'); // Example output path
    const [responseFile, setResponseFile] = useState(null);
    const [error, setError] = useState(null);

    const handleUserResumeChange = (event) => {
        setUserResume(event.target.files[0]);
    };

    const handleTemplateResumeChange = (event) => {
        setTemplateResume(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!userResume || !templateResume) return;

        const formData = new FormData();
        formData.append('userResume', userResume);
        formData.append('templateResume', templateResume);
        formData.append('outputPath', outputPath);

        try {
            const response = await axios.post('http://localhost:8080/reformat-resume', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setResponseFile(response.data);
        } catch (error) {
            console.error('Error uploading files:', error);
            setError('Failed to upload files. Please try again.');
        }
    };

    return (
        <div>
            <h2>Upload Resumes</h2>
            <form onSubmit={handleSubmit}>
                <input type="file" accept="application/pdf" onChange={handleUserResumeChange} />
                <input type="file" accept="application/pdf" onChange={handleTemplateResumeChange} />
                <button type="submit">Upload</button>
            </form>
            {responseFile && (
                <a href={responseFile} download>
                    Download Modified PDF
                </a>
            )}
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default Upload;
