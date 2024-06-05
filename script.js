function showSection(sectionId) {
    hideSection();
    document.getElementById(sectionId).style.display = 'block';
}

function hideSection(){
    const section = document.querySelectorAll('.section');
    section.forEach(section => section.style.display = 'none');
}

showSection('homePage');

document.querySelector('.search-btn').addEventListener('click', function() {
  const city = document.querySelector('.city-input').value;
  if (city) {
      fetchWeatherData(city);
  } else {
      alert("Please enter a city name.");
  }
});

async function fetchWeatherData(city) {
  const apiKey = '1af9a00253a511b86c8b4401a49e1673';
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  
  try {
      const weatherResponse = await fetch(weatherUrl);
      const weatherData = await weatherResponse.json();
      const forecastResponse = await fetch(forecastUrl);
      const forecastData = await forecastResponse.json();


      updateCurrentWeather(weatherData);
      updateForecast(forecastData);
  } catch (error) {
      console.error('Error fetching weather data:', error);
  }
}

function getWeatherBackground(condition) {
  switch (condition.toLowerCase()) {
      case 'clear':
          return 'url(https://c1.wallpaperflare.com/preview/804/778/325/sky-background-nature-blue.jpg)'; 
      case 'clouds':
          return 'url(https://images.pexels.com/photos/158163/clouds-cloudporn-weather-lookup-158163.jpeg?cs=srgb&dl=pexels-pixabay-158163.jpg&fm=jpg)'; 
      case 'rain':
          return 'url(https://i3.wp.com/images.news18.com/ibnlive/uploads/2021/07/1627056776_clouds-1600x900.jpg?ssl=1)'; 
      case 'snow':
          return 'url(https://i.pinimg.com/originals/20/88/6c/20886ce215a8179b115f9675af93e2aa.jpg)'; 
      case 'thunderstorm':
          return 'url(https://images.unsplash.com/photo-1594760467013-64ac2b80b7d3?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8NHx8fGVufDB8fHx8fA%3D%3D)'; 
      case 'drizzle':
          return 'url(https://cdn.windy.app/site-storage/posts/October2023/nature-grass-snow-fog-mist-morning-41797-pxhere.com.jpg)'; 
      default:
          return 'url(https://www.desktopbackground.org/download/o/2011/11/23/301566_beautiful-hd-wallpapers-weather-and-phenomena-backgrounds_1920x1080_h.jpg)'; 
  }
}

function updateCurrentWeather(data) {
  const currentWeather = document.querySelector('.current-weather .details');
  const weatherCondition = data.weather[0].main;
  const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  currentWeather.querySelector('h2').textContent = `${data.name} (${data.weather[0].description})`;
  currentWeather.querySelector('h6:nth-child(2)').textContent = `Temperature: ${data.main.temp}°C`;
  currentWeather.querySelector('h6:nth-child(3)').textContent = `Wind: ${data.wind.speed} M/S`;
  currentWeather.querySelector('h6:nth-child(4)').textContent = `Humidity: ${data.main.humidity}%`;

  let imgElement = currentWeather.querySelector('img');
  if (!imgElement) {
      imgElement = document.createElement('img');
      currentWeather.appendChild(imgElement);
  }
  imgElement.src = iconUrl;
  imgElement.alt = data.weather[0].description;

  console.log(weatherCondition)

  const section = document.querySelector('#homePage');
  section.style.backgroundImage = getWeatherBackground(weatherCondition);
  section.style.backgroundSize = 'cover'; 
  section.style.backgroundPosition = 'center'; 
  section.style.backgroundRepeat = 'no-repeat'; 
}

function updateForecast(data) {
  const forecastCards = document.querySelectorAll('.weather-cards .card');
  const forecasts = [];

  forecastCards.forEach((card, index) => {
      if (index < 5) {
          const forecast = data.list[index * 8];
          const date = new Date(forecast.dt_txt);
          const iconUrl = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`;

          const forecastData = {
              date: date.toDateString(),
              temp: `Temp: ${forecast.main.temp}°C`,
              wind: `Wind: ${forecast.wind.speed} M/S`,
              humidity: `Humidity: ${forecast.main.humidity}%`,
              iconUrl: iconUrl,
              description: forecast.weather[0].description
          };

          forecasts.push(forecastData);

          card.querySelector('h3').textContent = forecastData.date;
          card.querySelector('h6:nth-child(2)').textContent = forecastData.temp;
          card.querySelector('h6:nth-child(3)').textContent = forecastData.wind;
          card.querySelector('h6:nth-child(4)').textContent = forecastData.humidity;

          let imgElement = card.querySelector('img');
          if (!imgElement) {
              imgElement = document.createElement('img');
              card.appendChild(imgElement);
          }
          imgElement.src = forecastData.iconUrl;
          imgElement.alt = forecastData.description;
      }
  });
}

async function fetch_news() {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 31);
    const dateFormatted = currentDate.toISOString().split('T')[0];

    const api_key = 'addef33392ec438b8a2b2aa8e484dad3';

    try {
        const response = await fetch(`https://newsapi.org/v2/everything?q=floods&from=${dateFormatted}&sortBy=publishedAt&apiKey=${api_key}`);

        if (!response.ok) {
            throw new Error("News not found");
        }

        const data = await response.json();
        displayNews(data.articles);

    } catch (error) {
        console.error(error);
    }
}
fetch_news();

function displayNews(articles) {
    const newsRow = document.getElementById('newsRow');

    articles.forEach(article => {
        const col = document.createElement('div');
        col.className = 'col-md-4 mb-4';

        const card = document.createElement('div');
        card.className = 'card h-100';

        if (article.urlToImage) {
            const image = document.createElement('img');
            image.className = 'card-img-top';
            image.src = article.urlToImage;
            card.appendChild(image);
        }

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        const title = document.createElement('h5');
        title.className = 'card-title';
        title.textContent = article.title;
        cardBody.appendChild(title);

        const description = document.createElement('p');
        description.className = 'card-text';
        description.textContent = article.description || 'No description available.';
        cardBody.appendChild(description);

        const link = document.createElement('a');
        link.href = article.url;
        link.className = 'btn btn-primary';
        link.textContent = 'Read more';
        link.target = '_blank';
        cardBody.appendChild(link);

        card.appendChild(cardBody);
        col.appendChild(card);
        newsRow.appendChild(col);
    });
}

const ws = new WebSocket('ws://localhost:8080');

ws.onopen = () => {
    console.log('Connected to WebSocket');
};

ws.onmessage = (event) => {
    const message = event.data;
    alert('Received: ' + message);


};

ws.onclose = () => {
    console.log('Connection closed');
};







