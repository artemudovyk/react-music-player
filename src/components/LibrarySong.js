function LibrarySong({
    song,
    setCurrentSong,
    currentSong,
    setIsPlaying,
    songs,
}) {
    const selectSongHandler = () => {
        setCurrentSong(song);
        setIsPlaying(true);
    };

    return (
        <div
            className={`library-song${song === currentSong ? ' selected' : ''}`}
            onClick={() => selectSongHandler()}
        >
            <img src={song.cover} alt={song.name} />
            <div className="song-description">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>
    );
}

export default LibrarySong;
