const API_KEY = "10b700c8dcb71bb4940de32344f24494"

// 1. need an event listener for input box ('submit')
// 2. get what they typed in, fetch data from the weather api for the city
// 3. fill out the forecast / graph

function handleFormSubmit(event) {
  //handle submit event
  event.preventDefault()
  // get the input they typed in 
  const input = document.querySelector('#city')
  // use the .value to get the text 
  const whatTheyTyped = input.value
  fetchCurrentWeather(whatTheyTyped)
  fetchFiveDayForecast(whatTheyTyped)
}

function fetchCurrentWeather(city) {
  //fetch current weather based on city
  fetch('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=' + API_KEY + '&units=imperial') 
  .then((response) => response.json())
  .then((json) => displayCurrentWeather(json))
}

function displayCurrentWeather(json) {
  //render current weather data to the DOM using provided IDs and json from API
  // update our html 
  const tableCell = document.querySelector('#temp')
  const lowCell = document.querySelector('#low')
  const highCell = document.querySelector('#high')
  const humidityCell = document.querySelector('#humidity')
  const cloudCell = document.querySelector('#cloudCover')
  const currentTemperature = json.main.temp
  tableCell.innerHTML = currentTemperature
  lowCell.innerHTML = json.main.temp_min
  highCell.innerHTML = json.main.temp_max
  humidityCell.innerHTML = json.main.humidity
  cloudCell.innerHTML = json.clouds.all
  console.log(json)
}


function fetchFiveDayForecast(city) {
  //fetch five day forecast data based on city
  fetch('http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&APPID=' + API_KEY + '&units=imperial') 
  .then(response => response.json())
  .then(json => {
  displayFiveDayForecast(json)
  createChart(json)
  })
  
}

function displayFiveDayForecast(json) {
  //render five day forecast data to the DOM using provided IDs and json from API
  
  let innerHTMLString = ''
  for (let forecast of json.list) {
    // 3 things: we want the day, the low, and the high
    let currentDivString = '<div>'
    const day = forecast.dt_txt
    const low = forecast.main.temp_min
    const high = forecast.main.temp_max
    currentDivString = currentDivString + "<p>" + day + "</p>" + "<p>" + low + "</p>" + "<p>" + high + "</p>" + "</div>"
    innerHTMLString = innerHTMLString + currentDivString
    
    // put this in a div 
  // const div =  document.createElement() 
  
  }
  const aside = document.querySelector('aside')
  aside.innerHTML = innerHTMLString
  
}

function createChart(json) {
  //Bonus: render temperature chart using five day forecast data and ChartJS
  const dateLabels = json.list.map((forecast) => forecast.dt_txt)
  const ctx = document.getElementById('WeatherChart').getContext('2d')
  const tempData = json.list.map((forecast) => forecast.main.temp)
  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: dateLabels,
        datasets: [{
            label: '# of Votes',
            data: tempData,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});
}
document.addEventListener('DOMContentLoaded', function() {
  //add event listener here for form submission
  document.addEventListener('submit', handleFormSubmit)
  
})
