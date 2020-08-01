import axios from 'axios';
import authHeader from '../../services/auth-header';

class NotesService {

    deleteNote(id) {
        axios.get('/api/notes/del/' + id, { headers: authHeader() })
            .then(() => {
                console.log('Note Deleted !!!')
            })
            .catch((error) => {
                console.log(error)
            })
    }
}

export default NotesService;