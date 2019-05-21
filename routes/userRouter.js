const express = require('express')
const router = express.Router()
const {User} = require('../models')

router.get('/register', (req, res) => {
    res.render('registerUser.ejs', {
        sendDisplayError : req.query.displayError
    })
})
router.post('/register', (req, res) => {
    User.findAll({
        where : {
            email : req.body.email
        }
    })
    .then(dataOne => {
        // console.log(dataOne, '========================')
        if(dataOne.length === 0){
            let objCreate = {
                name : req.body.name,
                balance : 100,
                email : req.body.email,
                password : req.body.password,
                petQuantity : 0
            }
            return User.create(objCreate)
        }else{
            let errMsg = 'emali already taken'
            res.redirect(`/register?displayError=${errMsg}`)
        }
    })
    // User.create(objCreate)
    .then((data) => {
        // res.send(data)
        res.redirect('/register')
    })
    .catch(err => {
        res.send(err)
    })
})

module.exports = router