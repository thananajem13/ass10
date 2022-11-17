import 'dotenv/config' 
import express from 'express'
import connectDB from './DB/connection.js'
import { addFirstAdmin } from './src/helper/admin.js';
import * as indexRouter from './src/modules/index.router.js'
import {generateQR} from './src/services/generateQRCode.js'
import { cronJobPdfEmail } from './src/services/sendPdfUsingCronJobs.js';
const app = express()
const port = process.env.PORT
app.use(express.json())
app.use(express.urlencoded({extended:true}));
connectDB()
addFirstAdmin() 
cronJobPdfEmail()
app.use(`${process.env.BASEURL}/uploads` , express.static('./uploads'))
app.use(`${process.env.BASEURL}/auth`,indexRouter.authRouter)
app.use(`${process.env.BASEURL}/user`,indexRouter.userRouter)
app.use(`${process.env.BASEURL}/post`,indexRouter.postRouter)
app.use('*',(req,res)=>{
    res.status(404).send('404 page not found please check your method and url')
})
 
app.listen(port, () => console.log(`Example app listening on port ${port}!`))