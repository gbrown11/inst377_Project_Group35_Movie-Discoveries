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
var apiKey = 'ALBFOW3yuAaUXG6k0S2LQ2LZPF0sIj3D6bo2wzvo'


// Creating a supabase client
const supabase = supabaseModule.createClient(supabaseUrl, supabaseKey)

// setting up the app for express
const app = express()
const port = 3000

// mounting the body-parser library into the application after npm install.
app.use(bodyParser.json())

app.use(express.static(__dirname + '/public'))



//Rendering the Front End to the user browser
app.get('/', (req, res)=>{
    res.sendFile('public/index.html', {root:__dirname})
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



app.get('/movieDetails', async (req, res)=>{

    const movietitle = req.query.title
    console.log('This is param:',movietitle)

    const {data, error} = await supabase
        .from('titleID')
        .select()
        .eq('title', movietitle.trim())
        

        //console.log('THE ID',data[0].id)


    var movieId = data[0].id

    fetch(`https://api.watchmode.com/v1/title/${movieId}/details/?apiKey=${apiKey}&append_to_response=sources`)
        .then((response)=>response.json())
        .then((response)=>{

            res.send(JSON.stringify(response))
            return;

        })
    
})


app.listen(port, ()=>{
    console.log('SERVER APP IS LIVE')
})
