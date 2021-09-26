
class Userinterface {

    constructor(data){
        this.name       = data.name;
        this.username   = data.username;
        this.lastLogin  = data.last_login;
        this.createdAt  = data.createdAt;
    }

}

module.exports = Userinterface