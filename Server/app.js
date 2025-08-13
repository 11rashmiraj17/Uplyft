const express = require('express')
const cors=require('cors')
const app = express()
//ACCECSSING .env file
require('dotenv').config()

const port=process.env.PORT

//Accessing db 
const connectDB=require("./config/db")

//Using Routes
const router=require('./routes/index')

const cookieParser=require('cookie-parser')

//Connecting client and server
const clientUrl=process.env.CLIENT_DOMAIN
 app.use(cors(
   { origin:clientUrl,
    credentials:true
     }
 ))


app.get('/', (req, res) => {
  res.send('Hello World!')
})
//req content can access through
app.use(express.json())
app.use(cookieParser())

//setting route with /api
app.use('/api',router)

connectDB()
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
