// Importing the modules



const express = require('express') // importing express module
const bodyParser = require('body-parser') // importing body-parser to identify Json from user request
const supabaseModule = require('@supabase/supabase-js') // importing supabase to create database client
const { response } = require('express')

// supabase 
var supabaseUrl = 'https://mcljyaucbvrdkwsgwpuo.supabase.co'
//prettier-ignore
var supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1jbGp5YXVjYnZyZGt3c2d3cHVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU4OTg2MzYsImV4cCI6MjAzMTQ3NDYzNn0.Nz6l90Pd_AQm7E_LeaS7uPtR3FHpoFESGiWdRFQsmtw`;

//Watchmode API key
var apiKey = 'ZeLov6MaUiKYAh22NDsLwOqE9SBcptOVFM7lOlfP'


// Creating a supabase client
const supabase = supabaseModule.createClient(supabaseUrl, supabaseKey)

// setting up the app for express
const app = express()
const port = 3000

// mounting the body-parser library into the application after npm install.
app.use(bodyParser.json())

app.use(express.static(__dirname + '/public'))

// This function will populate the supabase with movie listing from watchmode API
/*const initializDataBase = async ()=>{
    
    const {data, error} = await supabase
        .from('movieTitles')
        .select('*').limit(1)

        console.log("data",data)

    if (error){
        console.log('Error checking database')

    }

    if (data.length === 0){


        // url request coming from user must end with '/movie_lists'
        fetch(`https://api.watchmode.com/v1/list-titles/?apiKey=${apiKey}`)

            .then((response)=>response.json())
            .then(async (response) =>{

                console.log("there is response:", response['titles'])
                const movieTitles = response['titles']

                const {data, error} = await supabase
                .from('MovieTitles')
                .insert(movieTitles)

            })


    }
}
*/

//Rendering the Front End to the user browser
app.get('/', (req, res)=>{
    res.sendFile('public/homepage.html', {root:__dirname})
})

// fetching movie listing from watchmode.com

app.get('/movie_lists', async (req, res)=>{
    // url request coming from user must end with '/movie_lists'
    fetch(`https://api.watchmode.com/v1/list-titles/?apiKey=${apiKey}`)
    .then((response)=>response.json())
    .then(async (response)=>{
        console.log("there is response:", response['titles'])
        const movieTitles = response['titles']

        // check to see if the database if empty
        const {data, error}= await supabase
            .from('MovieTitles')
            .select('id')

            console.log('DATA', data)
        
        if (data.length === 0){
            const {data, error} = await supabase
            .from('MovieTitles')
            .insert(movieTitles)

            res.send(data)
            
        }
        else{
            const {data, error} = await supabase
                .from('MovieTitles')
                .select()

                res.send(data)
            
        }
        
    })

})



app.get('/movieDetails/:value', async (req, res)=>{
    // This GET will recieve a title convert to id and generate movie details
    const value = req.params.value;

    const {data, error}= await supabase
        .from('TitleMapId')
        .select('id')
        .eq('title', value)


    fetch(`https://api.watchmode.com/v1/title/${data}/details/?apiKey=ZeLov6MaUiKYAh22NDsLwOqE9SBcptOVFM7lOlfP&append_to_response=sources`)
        .then((response)=>response.json())
        .then((response)=>{
            
            res.send(JSON.stringify(response))

        })
    
})





// Call initialization database when the server starts
//initializDataBase();





app.listen(port, ()=>{
    console.log('APP IS LIVE')
})
