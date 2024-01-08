import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from "react-router-dom";

function AudioUpload() {
    const { user } = useAuth();
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [genre, setGenre] = useState('');
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            console.error('User not authenticated');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', title);
        formData.append('artist', artist);
        formData.append('genre', genre);
        formData.append('userId', user.id);

        try {
            const response = await axios.post('http://yourdomain.com/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Response:', response.data);
            navigate("/portfolio");
        } catch (error) {
            console.error('Upload error:', error);
        }
    };

    return (
        <div>
            <h2>Upload Audio</h2>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} />
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
                <input type="text" value={artist} onChange={(e) => setArtist(e.target.value)} placeholder="Artist" />
                <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} placeholder="Genre" />
                <button type="submit">Upload</button>
            </form>
        </div>
    );
}

export default AudioUpload;
