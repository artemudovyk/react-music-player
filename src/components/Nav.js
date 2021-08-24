import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';

function Nav({ isLibraryOpen, setIsLibraryOpen }) {
    return (
        <nav>
            <h1>Waves</h1>
            <button onClick={() => setIsLibraryOpen(!isLibraryOpen)}>
                Library
                <FontAwesomeIcon icon={faMusic} />
            </button>
        </nav>
    );
}

export default Nav;
