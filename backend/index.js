import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

import authRoutes from './routes/auth.Routes.js'
import messagesRoutes from './routes/messages.Routes.js'
import userRoutes from './routes/user.Routes.js'

import connectToMongoDB from './db/connectToMongoDB.js'

dotenv.config()
const app = express();
const PORT = process.env.PORT

app.use(express.json());
app.use(cookieParser()); 


app.use("/api/auth", authRoutes)
app.use("/api/messages", messagesRoutes)
app.use("/api/users", userRoutes)







app.listen (PORT, () => { 
    connectToMongoDB();
    console.log(`Running on PORT ${PORT}`)
}) 