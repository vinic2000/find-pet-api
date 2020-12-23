const { urlencoded } = require('body-parser');
const jsonwebtoken = require('jsonwebtoken');
const { use } = require('../controler/controlerUser');
const usuario =  require('../database/moduleuser')
const tokenManager = require('../service/token')
// const tokenManager = new tokenM

class Midware{
    async verifyTokern (req, res,next){
        const token = req.headers['authorization']

        if(token){
            
            try{
                var {id,user} = tokenManager.decode(token)

                console.log(id,user)
                const localizado = await usuario.findOne({where:{
                    id,user
                }})

                


                if(localizado){
                    req.headers.id = id;
                    req.headers.user = user;
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