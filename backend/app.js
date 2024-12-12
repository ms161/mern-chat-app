const express=require('express')
const app=express()
const userRoutes=require('./routes/userRoutes')
const chatRoutes=require('./routes/chatRoutes')
const cors=require('cors')
const AppError=require('./utils/appError')
app.use(cors())

// body parser, reading data from body into req.body
app.use(express.json())
console.log('app')

const baseUrl='/live-talk/api/v1'
app.use(`${baseUrl}/users`,userRoutes)
app.use(`${baseUrl}/chat`,chatRoutes)


//handlign unhandled routes
app.all('*', (req, res, next) => {
  next(new AppError(`Cant find ${req.originalUrl} on this server`, 404));
  
});

app.use((err,req,res,next)=>{
  const message=err.message || 'Something went wrong.'
  const statusCode=err.statusCode || 500
  res.status(statusCode).json({
    status:'fail',
    message
  })
})
module.exports=app 
