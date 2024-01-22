// AboutFooterText.js
import React from 'react';

const AboutFooterText = () => {
  const openReadmeInNewTab = async () => {
    try {
      const readmeUrl = '/media/README.html'; // Adjust the path as needed
      const response = await fetch(readmeUrl);
      const markdownContent = await response.text();

      const newTab = window.open();
      newTab.document.write(`<pre>${markdownContent}</pre>`);
    } catch (error) {
      console.error('Error fetching or opening README:', error);
    }
  };

  return (
    <div>
      <p className='footer'>
        <a href='#' onClick={openReadmeInNewTab} style={{ textDecoration: 'none' }}>
          &copy; OtterCollab 2024
        </a>
      </p>
    </div>
  );
};

export default AboutFooterText;
