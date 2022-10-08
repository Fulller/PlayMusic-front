import axios from 'axios';
import httpApi from '../tools/api';
function register(userName, name, password) {
    let url = `${httpApi}/register`;
    return axios({
        method: 'post',
        url: url,
        data: {
            userName: userName,
            name: name,
            password: password,
        },
    }).then((data) => data.data);
}
export default register;
