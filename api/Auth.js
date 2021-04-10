import axios from 'axios';

export default axios.create({
    baseURL:'https://proj.ruppin.ac.il/bgroup13/prod/api/player',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
})