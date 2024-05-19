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
var apiKey = 'vpB0RRJhNS2TfTf3gMFMnb1GLJgItUgDLLED49nT'


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
        //console.log("there is response:", response['titles'])
        const movieTitles = response['titles']

        // check to see if the database if empty
        const {data, error}= await supabase
            .from('MovieTitles')
            .select('id')

            //console.log('DATA', data)
        
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


    var movieId = data[0].id

    fetch(`https://api.watchmode.com/v1/title/${movieId}/details/?apiKey=${apiKey}&append_to_response=sources`)
        .then((response)=>response.json())
        .then((response)=>{

            res.send(JSON.stringify(response))
            return;

        })
    
})


function populateNewRelease(){
    // This function will populate the database with new release from the watchmode API
    // if the supabase table is populated nothing will be done
    
    fetch(`https://api.watchmode.com/v1/releases/?apiKey=${apiKey}`)
    .then((response)=>response.json())
    .then(async (response)=>{
        //console.log("there is response:", response['releases'])
        const new_release = response['releases']

        // check to see if the database if empty
        const {data, error}= await supabase
            .from('newReleases')
            .select('id')

            //console.log('newReleases DB', data)
        
        if (data.length === 0 || data.length === null ){
            const {data, error} = await supabase
            .from('newReleases')
            .insert(new_release)
            
        }
        else{
            // do nothing
            
        }
        
    })

}



app.get('/releases', async (req, res)=>{

    console.log("Attempting to get new release data")

    // connecting to supabase
    const {data, error} = await supabase
        .from('newReleases')
        .select()

    if(error){
        console.log('Error has occured getting new movie release')
        res.send(error)
    }

    else{
        res.send(data)
    }


})

app.get('/newrelease', async (req, res)=>{
    let value = req.query.title
    const {data, error} = await supabase
        .from('newReleases')
        .select()
        .eq('id', value.trim())
    
    if (error){
        console.log('Error occured when getting movie details')
    }
    else{
        res.send(data)
    }



})



app.listen(port, ()=>{
    console.log('SERVER APP IS LIVE')
    populateNewRelease()

})
