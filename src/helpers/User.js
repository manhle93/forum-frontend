import Token from './Token'
import AppStorage from './AppStorage'
class User {
    async login(data) {
        try {
            let respon = await axios.post(url + '/auth/login', data);
            this.affterLogin(respon.data)
            Token.payload(respon.data.access_token)
        } catch (error) {
            console.log(error)
        }

    }
    affterLogin(data) {
        const access_token = data.access_token
        const user_name = data.user_name
        if (Token.isValid(access_token)) {
            AppStorage.store(user_name, access_token)
            window.location = '/'
        }
    }
    hasToken() {
        const storedToken = AppStorage.getToken();
        if (storedToken) {
            return Token.isValid(storedToken) ? true : true
        }
        return false
    }
    loggedIn() {
        return this.hasToken()
    }
    logout() {
        if (this.loggedIn()) {
            AppStorage.clear()
            window.location = '/'
        } else return
    }
    name(){
        if(this.loggedIn()){
            return AppStorage.getUser()
        }
        else return null
    }
    id(){
        if(this.loggedIn()){
           const payload = Token.payload(AppStorage.getToken())
           return payload.sub
        }
        else return null
    }
}

export default User = new User()