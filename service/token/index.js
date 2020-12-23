const key =  require('./tokenKey.json').key
const jwt =  require('jsonwebtoken')

class TokenManager{

    static create(id, user){
        return jwt.sign({id,user},key,{expiresIn:'1h'})
    }
    
    static decode(token){
        const tokensplit = token.split(' ')
        const resultDecode = jwt.decode(tokensplit[1])
        return resultDecode
    }

}

module.exports = TokenManager