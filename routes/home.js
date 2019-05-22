const express = require('express')
const router = express.Router()
const Model = require('../models')


router.get('/', (req, res) => {
    res.render('home.ejs')
})
router.get('/main/:username', (req, res) => {
    res.render('main.ejs', {
        namaUser : req.params.username
    })
})
router.post('/main/:username', (req, res) => {
    let picker = req.params.username
    res.redirect(`/animal/pick/${picker}`)
})
// router.post('/home', (req, res) => {
//     User.findAll({
//         where : {
//             name : req.body.name,
//             email : req.body.email,
//             password : req.body.password
//         }
//     })
//     .then(dataOne => {
//         // console.log(dataOne, '========================')
//         if(dataOne.length === 0){
//             let objCreate = {
//                 name : req.body.name,
//                 balance : 100,
//                 email : req.body.email,
//                 password : req.body.password,
//                 petQuantity : 0
//             }
//             return User.create(objCreate)
//         }else{
//             let errMsg = 'emali already taken'
//             res.redirect(`/register?displayError=${errMsg}`)
//         }
//     })
//     // User.create(objCreate)
//     .then((data) => {
//         // res.send(data)
//         res.redirect('/register')
//     })
//     .catch(err => {
//         res.send(err)
//     })
// })

module.exports = router