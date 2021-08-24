import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlay,
    faAngleLeft,
    faAngleRight,
    faPause,
    faVolumeDown,
} from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useRef } from 'react';
// import { formatSecondsToReadableTime } from '../utils';

function Player({
    currentSong,
    isPlaying,
    setIsPlaying,
    songs,
    setCurrentSong,
}) {
    // States
    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0,
        volume: 1,
    });
    const [playIcon, setPlayIcon] = useState(faPlay);

    const [volumeControlVisibility, setVolumeControlVisibility] =
        useState(true);

    // References
    const audioRef = useRef(null);

    // Utils
    const formatSecondsToReadableTime = (seconds) => {
        return (
            Math.floor(seconds / 60) +
            ':' +
            ('0' + Math.floor(seconds % 60)).slice(-2)
        );
    };

    const playOrPauseAudio = () => {
        if (isPlaying) {
            // To prevent 'DOMException: The play() request was interrupted' we'll catch exception
            // https://developers.google.com/web/updates/2017/06/play-request-was-interrupted
            const playPromise = audioRef.current.play();

            if (playPromise !== undefined) {
                playPromise
                    .then((_) => {
                        // Automatic playback started!
                        // Show playing UI.
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        } else {
            audioRef.current.pause();
        }
    };

    // Effects
    // Play song every time we set isPlaying to true and change currentSong
    useEffect(() => {
        // Play or pause audio based on isPlaying
        playOrPauseAudio();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isPlaying, currentSong]);

    // Handlers
    // Update songInfo time when song metadata loading and when it's playing
    const timeUpdateHandler = () => {
        setSongInfo({
            currentTime: audioRef.current.currentTime,
            duration: audioRef.current.duration,
        });
    };

    // Update manual time change from input:range
    const timeDragHandler = (e) => {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({ ...songInfo, currentTime: e.target.value });
    };

    // Change volume from input:range
    const changeVolumeHandler = (e) => {
        audioRef.current.volume = e.target.value;
        setSongInfo({ ...songInfo, volume: e.target.value });
    };

    const playPrevHandler = () => {
        const currentSongIndex = songs.indexOf(currentSong);
        if (currentSongIndex - 1 < 0) {
            setCurrentSong(songs[songs.length - 1]);
        } else {
            setCurrentSong(songs[currentSongIndex - 1]);
        }
        setIsPlaying(true);
    };

    const playNextHandler = () => {
        const currentSongIndex = songs.indexOf(currentSong);
        setCurrentSong(songs[(currentSongIndex + 1) % songs.length]);
        setIsPlaying(true);
    };

    return (
        <div className="player">
            <div className="time-control">
                <p>{formatSecondsToReadableTime(songInfo.currentTime)}</p>
                <input
                    type="range"
                    onChange={timeDragHandler}
                    min={0}
                    max={songInfo.duration || 0}
                    value={songInfo.currentTime}
                    onMouseDown={(e) => (audioRef.current.volume = 0)}
                    onMouseUp={(e) => (audioRef.current.volume = 1)}
                />
                <p>
                    {songInfo.duration
                        ? formatSecondsToReadableTime(songInfo.duration)
                        : '0:00'}
                </p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon
                    className="skip-back"
                    size="2x"
                    icon={faAngleLeft}
                    onClick={playPrevHandler}
                />
                <FontAwesomeIcon
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="play"
                    size="2x"
                    icon={playIcon}
                />
                <FontAwesomeIcon
                    className="skip-forward"
                    size="2x"
                    icon={faAngleRight}
                    onClick={playNextHandler}
                />
                <FontAwesomeIcon
                    className="volume-control-icon"
                    size="1x"
                    icon={faVolumeDown}
                    onClick={() =>
                        setVolumeControlVisibility(!volumeControlVisibility)
                    }
                />
                {volumeControlVisibility && (
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        onChange={changeVolumeHandler}
                    />
                )}
            </div>
            <audio
                ref={audioRef}
                src={currentSong.audio}
                onTimeUpdate={timeUpdateHandler}
                onLoadedMetadata={timeUpdateHandler}
                onPlay={() => setPlayIcon(faPause)} // change icon to faPause when music started
                onPause={() => setPlayIcon(faPlay)} // change icon to faPlay when music paused
                onEnded={() => playNextHandler()} // when song ends, skip forward
            ></audio>
        </div>
    );
}

export default Player;
