import axios from 'axios'

const STATUSES = "http://localhost:8080/api/v1/statuses"
const DIRECTIONS = "http://localhost:8080/api/v1/directions"
const CONTRAGENTS = "http://localhost:8080/api/v1/contragents"
const SAVE_CONTRAGENT = "http://localhost:8080/api/v1/saveContragent"
const SEARCH_CONTRAGENT = "http://localhost:8080/api/v1/serchContragent"
const CURRENCY = "http://localhost:8080/api/v1/currency"
const PAYRULES = "http://localhost:8080/api/v1/payrules"
const SAVE_PAYRULE = "http://localhost:8080/api/v1/savePayRule"
const SEARCH_PAYRULE = "http://localhost:8080/api/v1/searchPayRule"
const FINPOS = "http://localhost:8080/api/v1/fmpos"
const KREDITORS = "http://localhost:8080/api/v1/kreditors"
const TENDER = "http://localhost:8080/api/v1/tenders"
const COSTTYPES = "http://localhost:8080/api/v1/costtypes"
const DISPR = "http://localhost:8080/api/v1/dispr"
const POSTPAYS = "http://localhost:8080/api/v1/postpays"
const EXECUTORS = "http://localhost:8080/api/v1/executors"

class DirectoriesService{

getAllStatuses(){
    return axios.get(STATUSES);
}

getAllDirections(){
    return axios.get(DIRECTIONS);
}

getAllExecutors(){
    return axios.get(EXECUTORS)
}

getAllContragents(){
    return axios.get(CONTRAGENTS);
}

saveContragent(contragent){
    return axios.post(SAVE_CONTRAGENT, contragent)
}

searchContragent(text){
    return axios.post(SEARCH_CONTRAGENT, text)
}

getAllCurrency(){
    return axios.get(CURRENCY);
}

getAllPayRules(){
    return axios.get(PAYRULES);
}

savePayRule(rule){
    return axios.post(SAVE_PAYRULE, rule)
}

searchPayRule(text){
    return axios.post(SEARCH_PAYRULE, text)
}

getAllFinPositions(){
    return axios.get(FINPOS);
}

getAllKreditors(){
    return axios.get(KREDITORS);
}

getAllTenders(){
    return axios.get(TENDER);
}

getAllCostTypes(){
    return axios.get(COSTTYPES);
}

getAllDisProtocols(){
    return axios.get(DISPR);
}

getAllPostPays(){
    return axios.get(POSTPAYS)
}


}
export default new DirectoriesService();