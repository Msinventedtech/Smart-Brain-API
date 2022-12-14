const experess = require('express');
const BodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');


const register= require('./controller/register');
const signin = require ('./controller/signin'); 
const profile = require ('./controller/profile');
const image = require ('./controller/image'); 

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

const db = knex({
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: true 
    }
  });

const app =experess();
const saltRounds = 10;

app.use(BodyParser.json());
app.use(cors())



app.get('/', (req, res)=>{res.send('success')})
app.post('/signin',( req, res) => {signin.handleSignin( req, res, db, bcrypt)})
app.post('/register', (req , res) => {register.handleRegister(req, res, db, bcrypt, saltRounds)}) //Dependency Injection
app.get('/profile/:id',(req , res) => {profile.handleProfileGet(req, res, db)})
app.put('/image', (req , res) => {image.handleImage(req, res, db)} )
app.post('/imageurl', (req , res) => {image.handleApiCall(req, res)} )


app.listen(process.env.PORT || 3000, ()=>{
    console.log(`app is running on port ${process.env.PORT}`);
})


/*
/--> res = this is working
/signin  --> POST ==> success/fail
/register --> POST = user
/profile/:userID --> GET = user
/image --> PUT-->user
*/