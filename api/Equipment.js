import axios from 'axios';

export default axios.create({
    baseURL:'https://proj.ruppin.ac.il/bgroup13/prod/api/Equipment',
    headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': 'application/json',
    }
})