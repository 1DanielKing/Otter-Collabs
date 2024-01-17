import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';


const AudioHandler = ({ onFileChange }) => {
    const { user } = useAuth();
  const [audioFile, setAudioFile] = useState(null);

  // Function to handle file input change
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setAudioFile(file);

    if (onFileChange) {
        onFileChange(file);
      }
    // send the file to your backend using Axios
    try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await axios.post('http://localhost:8080/api/audio/upload', formData, {
            headers: {
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': 'multipart/form-data',
            },
        });

        if (response.status === 200) {
            // Handle success
            console.log('Audio file uploaded successfully');
        } else {
            // Handle error
            console.error('Failed to upload audio file');
        }
    } catch (error) {
        console.error('Error uploading audio file:', error.message);
    }
};

  return (
    <div>
    <p>User ID: {user ? user.id : 'Not authenticated'}</p>
      <input type="file" accept="audio/*" onChange={handleFileChange} />
   {/* Display the selected audio file name */}
      {audioFile && (
        <div>
          <h3>Selected Audio</h3>
          <p>{audioFile.name}</p>
        </div>
      )}
    </div>
  );
};


export default AudioHandler;