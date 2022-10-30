const WeatherByHour = ({ forecastData }) => {
  const [startDate, _] = forecastData.list[0].dt_txt.split(" ");

  const todaysData = [];

  for (const currentData of forecastData.list) {
    const [date, hour] = currentData.dt_txt.split(" ");
    if (startDate === date) {
      todaysData.push({
        hour: hour.split(":")[0],
        iconIndex: currentData.weather[0].icon,
        temprature: currentData.main.temp,
        description: currentData.weather[0].description,
      });
    } else {
      break;
    }
  }
  return (
    <div className="weather-by-hour">
      <h2 className="heading">Today's weather</h2>

      <div className="container">
        {todaysData.map((data) => (
          <div className="item" key={data.hour}>
            <div className="hour">
              {data.hour}
              {Number(data.hour) >= 12 ? ":00 PM" : ":00 AM"}
            </div>
            <img
              src={`icons/${data.iconIndex}.png`}
              className="icon"
              alt={`${data.description}`}
            />
            <div>{data.temprature}&deg;</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherByHour;
