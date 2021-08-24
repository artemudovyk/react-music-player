import { useEffect } from 'react';
import LibrarySong from './LibrarySong';

function Library({ songs, setCurrentSong, setIsPlaying, isLibraryOpen, setIsLibraryOpen, currentSong }) {
    return (
        <div className={`library${isLibraryOpen ? ' library-open' : ''}`}>
            <h2>Library</h2>
            <div className="library-songs">
                {songs.map((song) => (
                    <LibrarySong song={song} setCurrentSong={setCurrentSong} setIsPlaying={setIsPlaying} key={song.id} songs={songs} currentSong={currentSong} />
                ))}
            </div>
        </div>
    );
}

export default Library;