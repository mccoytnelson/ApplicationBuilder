require('dotenv').config()
const express = require('express');
const session = require('express-session')
const massive = require('massive')
const authentication = require('./authentication')
const edits = require('./edits')
const uploads = require('./uploads')
const retrieval = require('./retrieval')


const app = express()
app.use(express.json())

let { SERVER_PORT, SECRET, CONNECTION_STRING,DEV } = process.env

app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false,
}))
app.use(async function authBypass(req,res,next){
    if(DEV==='true'){
        let db = req.app.get('db');
        let user = await db.reg_dev();
        req.session.user = user[0];
        next()
    } else {
        next()
    }
})
massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
    console.log('Connected to database')
    app.listen(SERVER_PORT, () => { console.log(`Server running on port: ${SERVER_PORT}`) })
})
app.get('/auth/dev', authentication.devLogin)
app.get('/auth/logout',authentication.logout)
app.get('/api/user-data',authentication.userData)
app.get('/auth/reset', authentication.reset)
app.post('/auth/signup', authentication.signUp )
app.post('/auth/login',authentication.login)

app.put('/edit/userinformation/:id',edits.editUserInformation)

app.post('/create/listing', uploads.uploadListing)
app.post('/create/question',uploads.uploadQuestion)
app.post('/create/multi',uploads.uploadMulti)
app.post('/create/application',uploads.uploadApplication)
app.post('/create/answered',uploads.uploadAnsweredQuestion)

app.get('/retrieve/listings', retrieval.getAllListings)
app.get('/retrieve/listing/:id', retrieval.getSpecificListing)
app.get('/retrieve/company-listings/:id', retrieval.getCompanyListings)
app.get('/retrieve/questions/:id', retrieval.getQuestions)
app.get('/retrieve/applications/:id', retrieval.getCompleted)
app.get('/retrieve/answered/:completed_id/:question_id', retrieval.getAnswered)
app.get('/retrieve/completed/:id', retrieval.getSpecificCompleted)
app.post('/retrieve/multi', retrieval.getMulti)
