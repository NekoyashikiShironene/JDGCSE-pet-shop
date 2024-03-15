
export default class Account {

    constructor(username, name, dob, email, tel) {
        this.username = username || '';
        this.name = name || '';
        this.dob = dob || new Date();
        this.email = email || '';
        this.tel = tel || '';
    }

    checkLogin(username, password) {
        if (username && password ){
            alert("login successful");
            
        }
        
    }

    Register(username, password){
        this.username = username;
        this.password = password;
    }

}