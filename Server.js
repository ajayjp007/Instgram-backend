const express = require('express')
const connectDB = require('./config/db')
var cors = require('cors');




const app = express()

app.use(cors());
connectDB()

app.use(express.json({extended: false}))

app.get('/', (req, res) => res.send('API Running'))

//routes

app.use('/api/users', require('./routes/api/users'))
app.use('/api/posts', require('./routes/api/posts'))
app.use('/api/profiles', require('./routes/api/profile'))
app.use('/api/auth', require('./routes/api/auth'))


const PORT = process.env.PORT || 5000


app.listen(5000,() => console.log(`server started on port ${PORT}`))