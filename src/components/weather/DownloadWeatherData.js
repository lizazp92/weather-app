function DownloadWeatherData({ currentCity, filter, weatherData }) {
  const handleDownload = () => {
    // for now we are storing weather info in a string. before formatting it to txt
    let dataToDownload = null;
    // to filter the data that will be downloaded. data is stored in a string
    switch (filter) {
      case "current":
        dataToDownload = currentWeatherData(weatherData.current);
        break;
      case "3-hour":
        dataToDownload = weatherDataIntervalsDays(
          weatherData.hourly.slice(0, 8)
        );
        break;
      case "5-day":
        dataToDownload = weatherDataIntervalsDays(
          weatherData.hourly
            .filter((item, index) => index % 8 === 0)
            .slice(0, 5)
        );
        break;
      default:
        break;
    }
    // download if there is data available
    if (dataToDownload) {
      downloadFile(dataToDownload, currentCity, filter);
    }
  };

  // current data should be formatted like this
  const currentWeatherData = (currentData) => {
    const dateTime = new Date(currentData.dt * 1000).toLocaleString();
    return `Current weather for ${currentCity}:
    ${dateTime}
    Temp: ${currentData.main.temp} °C
    Info: ${currentData.weather[0].main}
    Humidity: ${currentData.main.humidity} %
    Wind speed: ${currentData.wind.speed} m/s
    Cloudiness: ${currentData.clouds.all} %`;
  };

  //for 3h and 5day interval depending on how many data items we have
  const weatherDataIntervalsDays = (data) => {
    let generatedData = "";
    data.forEach((item) => {
      generatedData += `
    City: ${currentCity}
    ${item.dt_txt}
    Temperature: ${item.main.temp} °C
    Description: ${item.weather[0].main}
    Humidity: ${item.main.humidity} %
    Wind Speed: ${item.wind.speed} m/s
    Cloudiness: ${item.clouds.all} %
    `;
    });
    return generatedData;
  };

  const downloadFile = (dataToDownload) => {
    const element = document.createElement("a");
    const fileToDownload = new Blob([dataToDownload], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(fileToDownload);
    element.download = "Weather-data.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return { handleDownload };
}

export default DownloadWeatherData;
