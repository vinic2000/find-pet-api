const express = require('express')
const router = express.Router()
const bodyParser =  require('body-parser')
const usuario =  require('../database/moduleuser')
const jsonwebtoken = require('jsonwebtoken')
const midware = require('../midware')
const verifyToken = new midware().verifyTokern
const TokenManager =  require('../service/token/')

router.use(bodyParser.json())

router.get('/all', verifyToken,(req,res)=>{
        usuario.findAll()
        .then((users)=>{
            res.json({usuarios:users})
        })
        .catch((err)=>{
            res.json({mensage:err})
        })
});

router.post('/getuser', verifyToken,(req,res)=>{
    usuario.findByPk(req.body.id)
    .then(user => res.json({result:user}))
    .catch(err => res.json({result:err}))
});

router.post('/add', async(req,res)=>{

    try{
        const {nome, email, data,cpf,user,password} = req.body
        const result = await usuario.create({nome,email,data,cpf,user,password})
         var token = jsonwebtoken.sign({user: user, email:email},hadeDeAtivação)
         res.json({mensage:"OK",token:token})
    }catch(err){
        res.status(401).json({mensage:"Erro no processo do cadatro: ",err})

    }
});

router.put('/update',verifyToken, async(req,res)=>{
    
    try{
        usuario.update({
            nome: req.body.nome,
            email: req.body.email,
            data: req.body.data,
            cpf: req.body.cpf,
            user: req.body.user,
            password: req.body.user
        },
        {
            where:{
                id:req.body.id
            }
        })

        res.json({result:"usuário atualizado"})
    }catch(err){
        res.json({err:err})
    }

});

router.delete('/remove', verifyToken,async (req,res)=>{

    try{
        const result = await usuario.destroy({where:{
            id:req.body.id
        }})
        res.json({result: "OK"})
    }catch(err){
        res.json({erro: err})
    }

});

router.post('/auth',async (req,res)=>{
    const {user, password} = req.body

        usuario.findOne({where:{
            user:user,
            password:password
        }}).then(data =>{
            const {id,user} = data.dataValues
            var token = TokenManager.create(id,user)
            res.status(500).json({message:"ok",token})
        }).catch((err)=>{
            res.status(401).json({message: "usuario não localizado"})
            console.log(err)
        })
})
module.exports =  router;