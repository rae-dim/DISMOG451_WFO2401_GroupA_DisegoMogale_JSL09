try{ //the code inside the try block is attempted to be executed, any errors in the execution are caught in the catch block
    const res = await fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
    //fetches random nature picture. await is used since fetch() returns a promise. await makes us wait until the promise is resolved before moving on to next line
    const data = await res.json() //respnse from API is converted to JSON format
    document.body.style.backgroundImage = `url(${data.urls.regular})` //sets background image to the URL of the random nature picture
    document.getElementById("author").textContent = `By: ${data.user.name}` //displays the author of the picture
} catch (err){ //catches errors that occor in the try block
    document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080)`
    document.getElementById("author").textContent = `By: Dodi Achmad`
 }

try{
    const res = await fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
    if (!res.ok) {
        throw Error("Something went wrong")
    }
    const data = await res.json()
    document.getElementById("crypto-top").innerHTML = `
        <img src=${data.image.small} />
        <span>${data.name}</span>
    `
    document.getElementById("crypto").innerHTML += `
        <p>🎯: $${data.market_data.current_price.usd}</p>
        <p>👆: $${data.market_data.high_24h.usd}</p>
        <p>👇: $${data.market_data.low_24h.usd}</p>
    `
} catch (err) {
    console.error(err)
}

function getCurrentTime() {
    const date = new Date()
    document.getElementById("time").textContent = date.toLocaleTimeString("en-us", {timeStyle: "short"})
}

setInterval(getCurrentTime, 1000) //counts every second to ensure time is completely dynamic/relevant

navigator.geolocation.getCurrentPosition(async position => {
    try {
    const res = await fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`)
    if (!res.ok) {
        throw Error("Weather data not available")
    }
    const data = await res.json()
    const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    document.getElementById("weather").innerHTML = `
        <img src=${iconUrl} />
        <p class="weather-temp">${Math.round(data.main.temp)}º</p>
        <p class="weather-city">${data.name}</p>
    `
    } catch (err) {
        console.error(err)
    }
});
