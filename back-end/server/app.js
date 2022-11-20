if(process.env.NODE_ENV !== "production"){
  require('dotenv').config()
}

const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const route = require('./routes')
const cors = require('cors')
const error = require('./middlewares/errorHandler')

app.use(cors())

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use('/v1',route)
app.use(error)

app.listen(port, () => {
  console.log(`Running On Port: ${port}`)
})