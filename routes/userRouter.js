const express = require('express')
const router = express.Router()
const {User} = require('../models')
const bcrypt = require('bcrypt')

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

router.get('/login', (req, res) => {
    res.render('loginUser.ejs', {
        sendDisplayError : req.query.errData
    })
})
router.post('/login', (req, res) => {
    User.findOne({
        where : {
            email : req.body.email
        }
    })
    .then(user => {
        if(user){
            bcrypt.compare(req.body.password, user.password, function(err, sucess) {
                if(sucess){
                    // res.send('success')
                    res.redirect(`/home/main/${user.name}`)

                }else{
                    let errm = 'your insert a wrong password'
                    res.redirect(`/login?errData=${errm}`)
                }
            })
        }
    })
})
router.get('/test', (req, res) => {
    res.render('sandbox.ejs')
})

module.exports = router