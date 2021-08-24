import './styles/app.scss';
import Player from './components/Player';
import Song from './components/Song';
import Library from './components/Library';
import Nav from './components/Nav';
import data from './data';
import { useState, useEffect, useRef } from 'react';

function App() {
    const [songs, setSongs] = useState(data());
    const [currentSong, setCurrentSong] = useState(songs[0]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLibraryOpen, setIsLibraryOpen] = useState(false);

    return (
        <div className={`App${isLibraryOpen ? ' with-sidebar' : ''}`}>
            <Nav
                isLibraryOpen={isLibraryOpen}
                setIsLibraryOpen={setIsLibraryOpen}
            />
            <Song currentSong={currentSong} isPlaying={isPlaying} />
            <Player
                currentSong={currentSong}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                songs={songs}
                setCurrentSong={setCurrentSong}
            />
            <Library
                songs={songs}
                setCurrentSong={setCurrentSong}
                setIsPlaying={setIsPlaying}
                isLibraryOpen={isLibraryOpen}
                setIsLibraryOpen={setIsLibraryOpen}
                currentSong={currentSong}
            />
        </div>
    );
}

export default App;
