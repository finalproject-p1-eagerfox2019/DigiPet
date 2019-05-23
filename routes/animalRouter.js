const express = require('express')
const router = express.Router()
const {User, Animal, Pet} = require('../models')
const bcrypt = require('bcrypt')

router.get('/pick/:username', (req, res) => {
    Animal.findAll()
    .then(allAnimal => {
        res.render('animal.ejs', {
            dataAnimal : allAnimal,
            name : req.params.username
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
        res.redirect('/animal/play/Mikel/monster/')
        // ${req.params.username}
        // res.send('test')
    })
    .catch(err => {
        res.send(err)
    })

})

    router.get('/play/:username'), (req,res) =>{
    User.findOne({
        where : {
            name : req.params.username
        }
    })
    .then(userFound => {
        // res.send(req.body.flareon)
        return Pet.findOne({
            where: {
                userID : userFound.id
            }
        })
        
    })
    .then(petFound => {
        return Animal.findOne({
            where: {
                id : petFound.AnimalID
            }
        })
    })
    .then(animalFound => {
        res.render('test.ejs', {
            img: animalFound
        })
    })

}

    router.get('/animal/play/Mikel/monster/') , (req,res) =>{
        res.render('test.ejs')
    }

module.exports = router