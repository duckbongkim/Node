const dotenv = require('dotenv');
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser')
const cors = require('cors')
const pageRouter = require('./routes/pageRouter')

dotenv.config()

const app = express();
app.set('port',process.env.PORT || 3000);

app.use(cors());
app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser(process.env.COOKIE_SECRET))

app.use('/',pageRouter);

app.use((req,res,next)=>{
    const error = newError(`${req.method} ${req.url} 라우터 없음`)
    err.status = 404;
    next(err)
})

app.use((err,req,res,next)=>{
    console.error(err)
    res.status(err.status || 500).json({error:message})
})


app.listen(app.get('port'),()=>{
    console.log(`${app.get('port')} 한조 대기중`)
})
