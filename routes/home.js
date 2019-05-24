const express = require('express')
const router = express.Router()
const {Pet, User, Animal} = require('../models')


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
router.get('/mvp', (req, res) => {
    // let result = []
    // let orang = 
    // let hewan = 
    // Pet.findAll()
    // User.findAll({
    //     include : {
    //         model : Pet,
    //         include : {
    //             model : Animal
    //         }
    //     }
    // })
    // Pet.findAll()
    // .then(allData => {
    //     let result = []
    //     allData.forEach(el => {
    //         result.push(el.happiness)
    //     });
    //     res.send(result.sort())
    //     res.render('mvp.ejs', {
    //         theData : allData
    //     })
    // })
    // Pet.findAll({
    //     order : [['happiness', 'DESC']]
    // })
    // .then(allData => {
    //     // let result = []
    //     for(let i = 0; i < 3; i++){
    //        result.push(allData[i])
    //     }
    //     // res.send(result)
    //     return Animal.findAll({
    //         where : {
    //             id : [result[0].AnimalID, result[1].AnimalID, result[2].AnimalID]
    //         }
    //     })
    // })
    // .then(wow => {
    //     return User.findAll({
    //         where : {
    //             id : [result[0].AnimalID, result[1].AnimalID, result[2].AnimalID]
    //         }
    //     })
    // })
    Pet.findAll({
        include : [{
            model : Animal
        }, {model : User}]
        , order : [['happiness', 'DESC']], limit : 3
    })
    .then(all => {
        // res.send(all)
        res.render('mvp.ejs', {
            theData : all
        })
    })
    .catch(err => {
        res.send(err)
    })
})

module.exports = router