const searchSongs = () => {
    const inputText = document.getElementById('inputText').value
    const url = ` https://api.lyrics.ovh/suggest/${inputText}`
    fetch(url)
        .then(res => res.json())
        .then(data => displaySongs(data.data))
        .catch(err => {
            if(inputText === ''){
                displayErr('You should search something!')
            }
            else{
                displayErr('oopss! Something went wrong! please try again sometime later. Stay tune!')
            }
        })

}

// document.getElementById('inputButton').addEventListener('click', searchSongs)


const navSongs = artist => {
    const url = `https://api.lyrics.ovh/suggest/${artist}`
    fetch(url)
        .then(res => res.json())
        .then(data => displaySongs(data.data))
        .catch(err => displayErr('oopss! Something went wrong! please try again sometime later. Stay tune!'))
}


const displaySongs = songs => {
    const songCard = document.getElementById('song-card')
    songCard.innerHTML = ''
    document.getElementById('lyricsDiv').innerHTML = ''
    document.getElementById('err-msg').innerHTML = ''
    songs.forEach(song => {
        const songDiv = document.createElement('div')
        songDiv.className = "single-result row align-items-center my-3 p-3"
        songDiv.innerHTML = `
            <div div class="col-md-9" >
                <h3 class="lyrics-name">${song.title}</h3>
                <p class="author lead">Song by <span>${song.artist.name}</span></p>
                <audio controls>
                    <source src="${song.preview}" type="audio/ogg">
                </audio>
            </div >
            <div class="col-md-3 text-md-right text-center">
                <button class="btn btn-success" onclick="searchLyrics('${song.artist.name}', '${song.title}')">Get Lyrics</button>
            </div>
            `
        songCard.appendChild(songDiv)
    })
}


const searchLyrics = (artist, title) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`

    fetch(url)
        .then(res => res.json())
        .then(data => displayLyrics(data))
        .catch(err => displayErr('Failed to load lyrics. Try again later!'))
}


const displayLyrics = lyrics => {
    const lyricsDiv = document.getElementById('lyricsDiv')
    lyricsDiv.innerText = lyrics.lyrics;
}


const displayErr = err => {
    const errMsg = document.getElementById('err-msg')
    errMsg.innerText = err
}