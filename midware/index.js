const { urlencoded } = require('body-parser');
const jsonwebtoken = require('jsonwebtoken');
const usuario =  require('../databse/moduleuser')
class Midware{

    async verifyTokern (req, res,next){

        const token = req.headers['authorization'];
        if(token){
            
            try{
                const decodtoken =  token.split(' ')
                const decod  = jsonwebtoken.decode(decodtoken[1])
                const localizado = await usuario.findAll({where:{
                    user: decod.user,
                    email:decod.email
                }})
                if(localizado){
                    req.headers.email = decod.email;
                    req.headers.user = decod.user;
                    console.log(decod)
                    console.log("")
                    console.log("")
                }else{
                    res.status(401).json({message:"Dados enviados estão incorretos"})
                }
                next()

            }catch(err){
                res.status(401).json({messasge:"Token incorreto"})
            }
        }else{
            res.status(401).json({Erro: "Token não foi enviado"})
        }
        
    
    }

}


module.exports = Midware