// This code is used to fetch movie details at the front end
const host = window.location.origin 

// use this fetch method to get movie details
const title = 'movie title here'

fetch(`${host}/movieDetails?title=${encodeURIComponent(title)}`)
    .then((res)=>res.json())
    .then((res)=>{

        console.log(res)
    })

