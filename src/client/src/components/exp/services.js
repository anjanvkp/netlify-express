import axios from 'axios';
import authHeader from '../../services/auth-header';

class ExpService {

    deleteExp(id) {
        axios.get('/api/exp/del/' + id, { headers: authHeader() })
            .then(() => {
                console.log('Note Deleted !!!')
            })
            .catch((error) => {
                console.log(error)
            })
    }
}

export default ExpService;