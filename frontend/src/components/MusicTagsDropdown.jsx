import React, { useState, useEffect } from 'react';
import "../pages/ProfilePage.css";

const MusicTagsDropdown = () => {
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState('');

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
    setSelectedTag(event.target.value);
  };

  return (
    <div className="music-tags-dropdown">
      <select value={selectedTag} onChange={handleTagChange}>
        <option value="">Select a tag</option>
        {tags.map((tag) => (
          <option key={tag} value={tag}>
            {tag}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MusicTagsDropdown;
