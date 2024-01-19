import React, { useState, useEffect } from 'react';
import axiosBase from '../contexts/axiosBase';
import "../pages/ProfilePage.css";

const MusicTagsDropdown = ({ user, loadProfileData }) => {
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState([]);

  useEffect(() => {
    const fetchAllTagsOnLoad = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/music-tags');
        const data = await response.json();
        setTags(data);
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };

    fetchAllTagsOnLoad();
  }, []);

  useEffect(() => {
    const setTagsOnUser = (tags) => {
      setTags(tags);
    };

    setTagsOnUser(user.MusicTags);
  }, [user]);


  const updateUserMusicTags = (userId, updatedTags) => {
    return axiosBase.put(`/api/users/${userId}/update-tags`, updatedTags)
      .then(response => {
        console.log('Music tags updated:', response.data);
        loadProfileData();
      })
      .catch(error => {
        console.error('Error updating music tags:', error);
      });
  };

  const handleTagChange = (event) => {
    const selectedTag = event.target.value;
    if (!user.musicTags.includes(selectedTag)) {
      const newTags = [...user.musicTags, selectedTag];
      updateUserMusicTags(user.id, newTags);
    }
  };

  const handleTagDelete = (tagToDelete) => {
    const updatedTags = user.musicTags.filter(tag => tag !== tagToDelete);
    updateUserMusicTags(user.id, updatedTags);
  };


  return (
    <div className="music-tags-container">
      <div className="music-tags-dropdown">
        <select value="" onChange={handleTagChange}>
          <option value="" disabled>Add a tag</option>
          {tags && tags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
        <div className="selected-tags">
          {user && user.musicTags && user.musicTags.map((tag) => (
            <div key={tag} className="tag">
              <span>{tag}</span>
              <button onClick={() => handleTagDelete(tag)}>&times;</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MusicTagsDropdown;
