import axios from'axios'

const USER_API_URL = "http://localhost:8080/api/v1/users";
const SAVE_USER = "http://localhost:8080/api/v1/saveUser";
const LOGON = "http://localhost:8080/api/v1/logon";

class UserService{

    getUsers(){
        return axios.get(USER_API_URL)
    }

    createUser(user){
        return axios.post(SAVE_USER, user)
    }

    logon(user){
        return axios.post(LOGON, user)
    }
}
export default new UserService()