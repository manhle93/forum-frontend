class AppStorage {
    storeToken(token) {
        localStorage.setItem('token', token)
    }
    storeUser(user) {
        localStorage.setItem('user', user)
    }
    storeQuyen(quyen_id){
        localStorage.setItem('quyen_id', quyen_id)
    }
    store(user, token, quyen_id) {
        this.storeToken(token)
        this.storeUser(user)
        this.storeQuyen(quyen_id)
    }
    clear() {
        localStorage.clear('token')
        localStorage.clear('user')
    }
    getToken() {
        return localStorage.getItem('token')
    }
    getQuyen() {
        return localStorage.getItem('quyen_id')
    }
    getUser() {
        return localStorage.getItem('user')
    }
}
export default AppStorage = new AppStorage()