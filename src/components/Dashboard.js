// Dashboard.js
import React, { useEffect, useState } from 'react';
import '../styles/Dashboard.css';
import AddSongPopup from './Addsong';
import logouticon from "../images/logouticon.png";
import playbtn from "../images/play.png";
import deletebtn from "../images/deleticon.svg";
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { setCurrentSongIndexAction } from '../state/actions/songAction';
import AudioPlayerComponent from './AudioPlayer';
import musicIcon from "../images/music.png"

  

const Dashboard = () => {
  const [isAddSongPopupOpen, setAddSongPopupOpen] = useState(false);

  const [songs, setSongs] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if(localStorage.getItem('AddedSongs') && JSON.parse(localStorage.getItem('AddedSongs')).length > 0 ){
      setSongs(JSON.parse(localStorage.getItem('AddedSongs')));
    }
    else{
      var defaultSongs = [
        {
          id: 1,
          title: 'Song 1',
          src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
          source: "Source 1",
          thumbnail: "https://images.pexels.com/photos/16806729/pexels-photo-16806729/free-photo-of-a-single-white-cloud-against-blue-sky.jpeg"
        },
        {
          id: 2,
          title: 'Song 2',
          src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
          source: "Source 2",
          thumbnail: "https://images.pexels.com/photos/19415894/pexels-photo-19415894/free-photo-of-going-up.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        },
          // Add more songs as needed
        ];
      setSongs(defaultSongs);
      localStorage.setItem("AddedSongs", JSON.stringify(defaultSongs));
    }
  }, [])

  const handleAddSongClick = () => {
    console.log("i am callin")
    setAddSongPopupOpen(true);
  };

  const closeAddSongPopup = () => {
    setAddSongPopupOpen(false);
  };

  const handleAddSong = (songData) => {
    // Implement logic to add the song (e.g., API call)
    console.log('Adding song:', songData);
    const maxId = songs.reduce((max, obj) => (obj.id > max ? obj.id : max), -Infinity);
    var songToBeAdded = {
      id: maxId+1,
      title: songData.songName,
      src: songData.songLink,
      source: songData.songSource,
      thumbnail: songData.thumbnail ? songData.thumbnail : "https://images.pexels.com/photos/5646986/pexels-photo-5646986.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    };
    setSongs([...songs, songToBeAdded])

    // Add to local Storage
    var storedArray = JSON.parse(localStorage.getItem('AddedSongs')) || songs;
    storedArray.push(songToBeAdded);
    localStorage.setItem("AddedSongs", JSON.stringify(storedArray))
    // Close the popup after adding the song
    closeAddSongPopup();
  };

  const handleLogout = () => {
    // Implement Logout functionality
    console.log('Logging out');
    sessionStorage.clear();
    localStorage.clear();
    navigate("/login");
  };

  const handleMusicPlayClick = (index) => {
    dispatch(setCurrentSongIndexAction(index))
  }

  const handleThumbnailLoadError = (id) => {
    setSongs(songs.map(song => {
      if(song.id == id){
        song.thumbnail="https://images.pexels.com/photos/5646986/pexels-photo-5646986.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
      }
      return song;
    }))
  }

  return (
    <div className="dashboard">
        <div className="sidebar">
                <h1 className='logo'>LOGO</h1>
                <div className='song-tab'>
                  <img className='music-icon' src={musicIcon} alt='music icon'/>
                  Songs</div>
                <div className='logout'>
                  <div className="logout-icon-container">
                    <img src={logouticon} alt="Log Out Icon" className="logout-icon" />
                  </div>
                  <button className="logout-button" onClick={handleLogout}>Logout</button>
                </div>
        </div>
        <div className='body-content'>
          {/* <AddSongPopup /> */}

          {isAddSongPopupOpen &&
          <AddSongPopup onClose={closeAddSongPopup} onAddSong={handleAddSong} />
          }
            
            <div className="header">
              <div className='header-text'>Music Streaming Dashboard</div>
              <button className='addsong-btn' onClick={() => handleAddSongClick()}>Add Song</button>
              
            </div>
            <div className="main-content">
              <div className='song-list'>List of Songs</div>
              <table>
              <thead>
                  <tr>
                  <th>Name</th>
                  <th>Source</th>
                  <th>Added On</th>
                  <th>Delet</th>
                  </tr>
              </thead>
              <tbody>
                  {/* Example data, replace with your own logic */}
                  {songs.map((song, index )=> {
                    return (
                    <tr key={song.id}>
                      <td className='songThumbnailImgContainer'>
                        <img className='songThumbnailImg' src={song.thumbnail} onError={() => handleThumbnailLoadError(song.id)}/>
                        <p>{song.title}</p>
                      </td>
                      <td>{song.source}</td>
                      <td><button className="play-button" onClick={() => handleMusicPlayClick(index)}>
                      <img src={playbtn} alt="Play Button" className="playbtn" />
                        </button></td>
                      <td>
                        <img src={deletebtn} alt="Delete Button" className="playbtn" />
                      </td>
                    </tr>)
                  })}
                  {/* Add more rows as needed */}
              </tbody>
              </table>
              <div className='db-audio-player'>
                <AudioPlayerComponent songs={songs} />
              </div>
            </div>
        </div>
    </div>
  );
};

export default Dashboard;
