// Importing the modules

const express = require('express') // importing express module
const bodyParser = require('body-parser') // importing body-parser to identify Json from user request
const supabaseModule = require('@supabase/supabase-js') // importing supabase to create database client

// Gordon's supabase 
const supabaseUrl = 'https://dtqvxpsjlpobhkwfwptm.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0cXZ4cHNqbHBvYmhrd2Z3cHRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU2NDI5ODUsImV4cCI6MjAzMTIxODk4NX0.CmtlkgBTADlVwxa-dNWfwaQ4SqmoO6GHZZYPSPr1HNI'

// Creating a supabase client
const supabaseClient = supabaseModule.createClient(supabaseUrl, supabaseKey)

// setting up the app for express
const app = express()
const port = 3000

// mounting the body-parser library into the application after npm install.
app.use(bodyParser.json())

app.use(express.static(__dirname + '/public'))

//Rendering the Front End to the user browser
app.get('/', (req, res)=>{
    res.sendFile('public/temp.html', {root:__dirname})
})


app.listen(port, ()=>{
    console.log('APP IS LIVE')
})
