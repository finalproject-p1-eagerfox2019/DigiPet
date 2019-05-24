const express = require('express')
const router = express.Router()
const {User, Animal, Pet, Doing} = require('../models')

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min
}

router.get('/:username', (req, res) => {
    User.findOne({
        where : {
            name : req.params.username
        },
        include : [{
            model : Pet,
            include : [{
                model : Animal
            }]
        }]
    })
    .then(data => {
        // res.send(data)
        res.render('play.ejs', {
            allData : data,
            nama : req.params.username
        })
    })
    .catch(err => {
        res.send(err)
    })
})

router.get('/:username/:aniID/:petID', (req, res) => {
    let doing = null
    Doing.findAll()
    .then(allDoing => {
        doing = allDoing
        return Animal.findOne({
            where : {
                id : req.params.aniID
            }
        })
    })
    
    .then(one => {
        res.render('do.ejs', {
            dataAnimal : one,
            dataDoing : doing,
            nama : req.params.username,
            wot : req.params.aniID,
            pet : req.params.petID,
            err : req.query.errData
        })
        // res.send(doing)
    })
    .catch(err => {
        console.log('masuk')
        res.send(err)
    })
})
router.post('/:username/:aniID/:petID', (req, res) => {
    let animalOne = null
    let randomExp = getRandomInt(10, 25)
    let randomHappy = getRandomInt(-2, 5)
    let dot = null
    // res.send(User)
    User.findOne({
        where : {
            name : req.params.username
        }, include : [{
            model : Pet,
            where : {
                id : req.params.petID,
                AnimalID : req.params.aniID
            },
            include : [{
                model : Animal
            }]
        }]
    })
    // .then(person => {
    //     // res.send(person)
    //     return Pet.findAll({where : {
    //         userID : person.id
    //     } })
    // .then(lotAnimal => {
    //     // res.send(lotAnimal)
    //     console.log('masuk bro')
    //     return lotAnimal.findOne({
    //         where : {
    //             AnimalID : req.params.aniID
    //         }
    //     })
    // })
    .then(oneAnimal => {
        // console.log('masuk sini')
        // res.send(oneAnimal)
        animalOne = oneAnimal.Pets[0]
        return Doing.findOne({
            where : {
                id : req.body.pick
            }
        })
        // oneAnimal.update({oneAnimal})
        // res.send(oneAnimal)
        // res.send(req.body.pick)
    })
    .then(oneDoing => {
        dot = oneDoing
        // console.log('sini')
        // res.send(animalOne)
        // res.send(oneDoing)
        
        if(animalOne.experience === 0 || animalOne.happiness === 0){
            return animalOne.update({experience : oneDoing.point *= randomExp, happiness : oneDoing.point *= randomHappy})
        }else{
            return animalOne.update({experience : animalOne.experience += (oneDoing.point * randomExp), happiness : oneDoing.point * randomHappy})
        }
    })
    .then(() => {
        return animalOne.update({level : Math.round(animalOne.experience / 50)})
    })
    .then(() => {
        return User.findOne({
            where : {
                name : req.params.username
            }
        })
    })
    .then(orang => {
        let kurs = orang.balance - dot.point
        // console.log(-2 - -3, '--------');
        
        // console.log(orang.balance - kurs, '=========');
        if(kurs >= 0){
            
            return orang.update({balance : orang.balance -= dot.point, priceValue : orang.happiness + 5})
        }else{
            // res.send('gabisa broo')
            throw 'uang anda tidak cukup'
        }
    })
    .then(() => {
        res.redirect(`/game/${req.params.username}`)
        
    })
    .catch(err => {
        // console.log('masuk')
        // res.send(err)
        res.redirect(`/game/${req.params.username}/${req.params.aniID}/${req.params.petID}?errData=${err}`)
    })
})

// router.get('/mvp/chart', (req, res) => {
//     Pet.findAll()
//     .then(semuaData => {
//         // res.send(semuaData)
//         // res.redirect('mvp.ejs', {
//         //     data : allData
//         // })
//     })
//     .catch(err => {
//         res.send(err)
//     })
// })



module.exports = router