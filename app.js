// const Teacher = require('./routes/teachersRouter')
// const Subject = require('./routes/subjectRouter')
const User = require('./routes/userRouter.js')
const express = require('express')
const app = express()
const port = 3000
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

app.use('/', User)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))