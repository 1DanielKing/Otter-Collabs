import React, { useState, useEffect } from 'react';
import "../pages/ProfilePage.css";

const MusicTagsDropdown = ({ selectedTags, setSelectedTags }) => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/music-tags');
        const data = await response.json();
        setTags(data);
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };

    fetchTags();
  }, []);

  const handleTagChange = (event) => {
    const selectedTag = event.target.value;
    if (!selectedTags.includes(selectedTag)) {
      setSelectedTags([...selectedTags, selectedTag]);
    }
  };

  const handleTagDelete = (tagToDelete) => {
    const updatedTags = selectedTags.filter(tag => tag !== tagToDelete);
    setSelectedTags(updatedTags);
  };

  return (
    <div className="music-tags-container">
      <div className="music-tags-dropdown">
        <select value="" onChange={handleTagChange}>
          <option value="" disabled>Add a tag</option>
          {tags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
        <div className="selected-tags">
          {selectedTags.map((tag) => (
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
