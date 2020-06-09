import User from './User'
class Exception {
    hanle(error) {
        this.isExipred(error)
 
    }
    isExipred(error){
        if(error = "Token đã hết hạn"){
            User.logout()
        }
    }
}

export default Exception = new Exception()