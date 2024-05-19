// This page will control the recommended page
//document.getElementById('heading').innerHTML +=""
window.onload = function(){
    loadTitiles()
}

async function loadTitiles(){

    const host = window.location.origin
    //form_select = document.getElementById('movie-title')
    fetch(`${host}/releases`)
        .then((res)=>res.json())
        .then((res)=>{
            form_select = document.getElementById('movie-title')
            console.log("recommended page DATA:", res)
            //const movie_titles = res.title
            res.forEach((obj)=>{
                let x = obj.title
                const option = document.createElement('option')
                option.value = obj.id
                option.innerHTML = obj.title
                form_select.appendChild(option)


            })

            
        })



}



function displayMovie(){
    const host = window.location.origin
    const movieDetailsDIV = document.getElementById('movieDetailsArea')
    const movieID = document.getElementById('movie-title').value;

    fetch(`${host}/newrelease?title=${movieID}`)
        .then((res)=>res.json())
        .then((res)=>{
            console.log('THE MOVIE SELECTED IS:', res)
            const info = res[0]

            const source = document.getElementById('source')
            const date = document.getElementById('date')
            const movietitle = document.getElementById('title')
            
            const type = document.getElementById('type')
            
            source.innerHTML = `<strong>Streaming service: </strong>${info.source_name}`
            date.innerHTML = `<strong>Movie released date: </strong>${info.source_release_date}`
            movietitle.innerHTML = `<strong>Title: </strong>${info.title}`
            type.innerHTML = `<strong>Type: </strong>${info.type}`



            const poster = document.getElementById("poster")

            let existingImage = poster.querySelector('img')

            if(existingImage){
            existingImage.remove();
            }

            const img = document.createElement('img')
            img.src = info.poster_url
            img.alt = "Movie poster"
            img.width = 500
            img.height = 490
            poster.appendChild(img)





        })




}