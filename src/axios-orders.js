import axios from 'axios';


const instance = axios.create({
    baseURL: "https://burger-builder-project-id.firebaseio.com/"
});

export default instance;