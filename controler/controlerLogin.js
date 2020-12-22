const express = require('express')
const router = express.Router()
const usuario =  require('../databse/moduleuser')

router.post('./sign',(req,res)=>{
    res.json({success:"OK"})
})

module.exports = router;