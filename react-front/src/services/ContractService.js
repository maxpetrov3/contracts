import axios from 'axios'
import { SortUp } from 'react-bootstrap-icons'

 const CONTRACT_ALL = "http://localhost:8080/api/v1/contracts"
 const CONTRACT_BY_USER = "http://localhost:8080/api/v1/contractsByUser"
 const CONTRACT_SERCH = "http://localhost:8080/api/v1/serchContracts"
 const SAVE_CONTRACT = "http://localhost:8080/api/v1/saveContract"
 const CONTRACT_TASKS = "http://localhost:8080/api/v1/contractTasks"
 const TASK_SAVE = "http://localhost:8080/api/v1/saveTask"
 const ALL_TASKS = "http://localhost:8080/api/v1/allTasks"
 const SAVE_TASK_COMMENT = "http://localhost:8080/api/v1/saveTaskComment"


class ContractService{

    getAllContracts(){
        return axios.get(CONTRACT_ALL);
    }

    getUserContracts(user){
        return axios.post(CONTRACT_BY_USER, user)
    }
    
    serchContracts(text){
        if  (text !== ""){
            return axios.post(CONTRACT_SERCH, text);
        }else{
            return axios.get(CONTRACT_ALL);
        }
    }

    saveContract(contract){
        if(contract !== undefined){
            return axios.post(SAVE_CONTRACT, contract)
        }
    }

    getContractTasks(id){
        return axios.post(CONTRACT_TASKS, id)
    }

    saveTask(task){
        return axios.post(TASK_SAVE, task)
    }

    getAllTasks(){
        return axios.get(ALL_TASKS)
    }

    saveTaskComment(comment){
        return axios.post(SAVE_TASK_COMMENT, comment)
    }
  
}

export default new ContractService();