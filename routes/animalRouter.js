const express = require('express')
const router = express.Router()
const {User, Animal, Pet} = require('../models')
const bcrypt = require('bcrypt')

router.get('/pick/:username', (req, res) => {
    Animal.findAll()
    .then(allAnimal => {
        res.render('animal.ejs', {
            dataAnimal : allAnimal
        })
    })
    .catch(err => {
        res.send(err)
    })
})

router.post('/pick/:username', (req, res) => {
    let nameUser = req.params.username
    User.findOne({
        where : {
            name : nameUser
        }
    })
    // .then(theOne => {
    //     // res.send(theOne['id'])
    //     theOne.forEach(each => {
    //         res.send(each.id)
    //     })
    // })
    .then(theOne => {
        let objInput = {
            userID : theOne.id,
            AnimalID : req.body.chosen,
            level : 0,
            happiness : 50,
            priceValue : 0,
            experience : 0
        }
        return Pet.create(objInput)
    })
    .then(pet => {
        // res.redirect(`/home/play/${theOne.name}`)
        res.send('terpilih')
    })
    .catch(err => {
        res.send(err)
    })
})

module.exports = router