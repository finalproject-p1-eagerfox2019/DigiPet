const express = require('express')
const router = express.Router()
const {User, Animal, Pet} = require('../models')
const bcrypt = require('bcrypt')

router.get('/pick/:username', (req, res) => {
    Animal.findAll()
    .then(allAnimal => {
        res.render('animal.ejs', {
            dataAnimal : allAnimal,
            nama : req.params.username,
            errMsG : req.query.dataError
        })
    })
    .catch(err => {
        res.send(err)
    })
})

router.post('/pick/:username', (req, res) => {
    let nameUser = req.params.username
    let user = null
    let theAnimal = null
    User.findOne({
        where : {
            name : nameUser
        }
    })
    .then(userOne => {
        user = userOne
        // res.send(user)
        return Animal.findOne({
            where : {
                id : req.body.chosen
            }
        })
    })
    .then(animalPick => {
        // res.send(user)
        // console.log(user.balance, '=============')
        theAnimal = animalPick
        let buy = user.balance - animalPick.price
        console.log(buy)
        if(buy >= 0){
            console.log('masuk if')
            let objInput = {
                userID : user.id,
                AnimalID : req.body.chosen,
                level : 0,
                happiness : 50,
                priceValue : 0,
                experience : 0
            }
            return Pet.create(objInput)
        }else{
            // console.log('masuk else')
            // let msgerr = 'sorry your money not enough to buy this pet'
            // res.redirect(`/animal/pick/${req.params.username}?dataError=${msgerr}`)
            throw 'sorry your money not enough to buy this pet'
        }
    })
    .then(petCreated => {
        // res.send(user)
        let moneyDecrease = user.balance - theAnimal.price
        let plus = user.petQuantity + 1
        let objUpdate = {
            balance : moneyDecrease,
            petQuantity : plus
        }
        return User.update(objUpdate, {where : {
            id : user.id
        }
        })
    })
    // .then(theOne => {
    //     // res.send(theOne['id'])
    //     theOne.forEach(each => {
    //         res.send(each.id)
    //     })
    // })
    // .then(theOne => {
    //     let objInput = {
    //         userID : theOne.id,
    //         AnimalID : req.body.chosen,
    //         level : 0,
    //         happiness : 50,
    //         priceValue : 0,
    //         experience : 0
    //     }
    //     return Pet.create(objInput)
    // })
    .then(pet => {
        // res.send(pet)
        res.redirect(`/game/${req.params.username}`)
    })
    .catch(err => {
        // console.log(err)
        res.redirect(`/animal/pick/${req.params.username}?dataError=${err}`)
        // res.send(err)
    })
})

module.exports = router