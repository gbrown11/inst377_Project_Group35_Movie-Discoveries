const host = window.location.origin 

// use this function to get the movie details
async function sendTitleForDetail(value){
    fetch(`${host}/movieDetails${encodeURIComponent(value)}`)

        .then((res)=>res.json())
        .then((res)=>{

            console.timeLog('Movie Title details', res)
            
            // to display the movie details. Its a json file
        })



}