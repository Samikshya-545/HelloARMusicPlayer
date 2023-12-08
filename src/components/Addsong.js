import React, { useState, useRef } from 'react';
import '../styles/AddSong.css'; // Create this CSS file for styling
import uploadIcon from '../images/upload.jpg'
import { file } from '@babel/types';

const AddSongPopup = ({ onClose, onAddSong }) => {
  const [songName, setSongName] = useState('');
  const [songLink, setSongLink] = useState('');
  const [songSource, setSongSource] = useState('');
  const [thumbnail, setThumbnail] = useState(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedThumbnail, setSelectedThumbnail] = useState(null);

    const fileInputRef = useRef(null);

    const handleButtonClick = () => {
      fileInputRef.current.click();
    };
  
    const handleFileChange = (e) => {

      if (e.target.files && e.target.files.length > 0){
        // console.log("inside if")
        if (e.target.files && e.target.files.length > 0) {
          const file = e.target.files[0];
          setSelectedFile(file);
          setSelectedThumbnail(URL.createObjectURL(file));
          console.log('Selected file:', file);
        }
        
      }
    };

    const handleFileSelection = () => {
      setTimeout(() => {
        handleFileChange({ target: { files: fileInputRef.current.files } });
      }, 100);
    };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    setThumbnail(file);

    // Optional: You can preview the thumbnail here
    const reader = new FileReader();
    reader.onload = () => {
      // Update the thumbnail preview
      document.getElementById('thumbnailPreview').src = reader.result;
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    // Validate and submit the form
    if (songName && songLink && songSource ) {
      // Perform the actual submission logic (e.g., API call)
      onAddSong({
        songName,
        songLink,
        songSource,
        thumbnail: selectedThumbnail
      });

      // Reset the form
      setSongName('');
      setSongLink('');
      setSongSource('');
      setThumbnail(null);

      // Close the popup
      onClose();
    } else {
      // Handle form validation error
      alert('Please fill in all fields and upload a thumbnail');
    }
  };

  return (
    <div className="add-song-popup">
      <div className="popup-content">
        <div className='addsong-header'>
          <p>Add Song</p>
          <div className="close-popup" onClick={onClose}>X</div>
        </div>
        <div className="form-group">
          <div className='popup-text'>Song Name</div>
          <input className='popup-input' placeholder='Song Name' type="text" value={songName} onChange={(e) => setSongName(e.target.value)} />
        </div>
        <div className="form-group">
          <div className='popup-text'>Song Link</div>
          <input className='popup-input' placeholder='Song Link' type="url" value={songLink} onChange={(e) => setSongLink(e.target.value)} />
        </div>
        <div className="form-group">
          <div className='popup-text'>Song Source</div>
          <input className='popup-input' placeholder='Song Source' type="text" value={songSource} onChange={(e) => setSongSource(e.target.value)} />
        </div>
        <div className="form-group">
          {/* <button>Upload Profile Thumbnail:</button>
          <input type="file" accept="image/*" onChange={handleThumbnailChange} /> */}

        <label htmlFor="file-input">
        <button onClick={handleButtonClick} className='uploadbtn'>
          <img src={uploadIcon} alt="upload icon" className="upload-icon" />
          Click to Upload Profile Thumbnail
          </button>
        </label>
        <input
            type="file"
            ref={fileInputRef}
            id="file-input"
            style={{ display: 'none' }}
            accept=".png"
            onClick={(event) => handleFileChange(event)}
            onChange={handleFileSelection}
        />
        {selectedFile && (
            <div className='thumbnail'>
            <img src={selectedThumbnail} className='indian-flag'/>
            <div>{selectedFile.name}</div>
            </div>
        )}
            </div>
            <div className='submit-btn'>
            <button className='cancel-btn' onClick={onClose}>Cancel</button>
            <button onClick={handleSubmit}>Add Song</button>
            </div>
      </div>
    </div>
  );
};

export default AddSongPopup;
