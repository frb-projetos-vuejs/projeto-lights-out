import axios from 'axios'

class PostService {

    constructor() {
        this.baseUrl = 'https://frb-vue-projetos.firebaseio.com/'
        this.id = 'lights-out-rankings.json'
        this.fullUrl = this.baseUrl + this.id
    }

    Get(cb, cbError) {
        axios.get(this.fullUrl)
        .then(resp => {
            cb(resp)
        })
        .catch(resp => {
            cbError(resp)
        })
    }

    Post(data, cb, cbError) {
        axios.put(this.fullUrl, data)
        .then(resp => {
            cb(resp)
        })
        .catch(resp => {
            cbError(resp)
        })
    }
}

export default PostService