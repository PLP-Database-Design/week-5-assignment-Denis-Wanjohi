const express = require('express')
const app = express()
const mysql = require('mysql2')
// const env = require('./env')
require('dotenv').config();

const connection = mysql.createConnection({
    host:process.env.DB_HOST,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
    user:process.env.DB_USERNAME
    
})

connection.connect((err)=>{
    if(err){
        console.error('Error connecting:' + err.stack)
        return;
    }
    console.log('connected to db')
})

const sql = 'SELECT * FROM patients';

connection.query(sql,(error,res)=>{
    if(error){
        console.error('error in querry')
        return
    }
    // console.log('Results',res)
})
app.use(express.json());

// Question 1 goes here
app.get('/patients',(req,res)=>{
    connection.query(
        'SELECT patient_id,first_name,last_name,date_of_birth FROM patients',
        (err,results)=>{
            if(err){
                console.error('Error in getting the patients data Q1')
                return;
            }
            console.log(results)
            res.send(results)

        }
    )
})

// Question 2 goes here
app.get('/providers',(req,res)=>{
    connection.query(
        'SELECT first_name,last_name,provider_specialty FROM providers',
        (err,results)=>{
            if(err){
                console.error('Error in getting the providers data Q2')
                return;
            }
            console.log(results)
            res.send(results)
        }
    )
})

// Question 3 goes here
app.get('/patients/names',(req,res)=>{
    connection.query(
        'SELECT * FROM patients where first_name like ?',[`%${req.query.name}%`],
        (err,results)=>{
            if(err){
                console.error('Error in getting the patient data Q3')
                return;
            }
            console.log(results)
            res.send(results)
        }
    )
})

// Question 4 goes here
app.get('/providers/specialty',(req,res)=>{
    connection.query(
        'SELECT * FROM providers where provider_specialty like ?',[`%${req.query.specialty}`],
        (err,results)=>{
            if(err){
                console.log(err)
                console.error('Error in getting the providers data Q4')
                return;
            }
            console.log(results)
            res.send(results)
        }
    )
})


// listen to the server
const PORT = 3000
app.listen(PORT, () => {
  console.log(`server is runnig on http://localhost:${PORT}`)
})