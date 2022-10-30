const WEEK_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const nextFiveDays = ({ forecastData }) => {
  const fiveDaysWeather = [];
  for (let i = 0; i < forecastData.list.length; i = i + 8) {
    const dateInstance = new Date(forecastData.list[i].dt_txt);
    const day = dateInstance.toLocaleString("en-US", { weekday: "long" });
    const monthNumber = dateInstance.toLocaleString("en-US", {
      day: "numeric",
    });
    fiveDaysWeather.push({
      day: day.substring(0, 3),
      date: `${monthNumber}/${day}`,
      iconIndex: forecastData.list[i].weather[0].icon,
      low: forecastData.list[i].main.temp_min,
      high: forecastData.list[i].main.temp_max,
      wind: forecastData.list[i].wind.speed,
      desc: forecastData.list[i].weather[0].description,
    });
  }

  console.log(fiveDaysWeather);

  return (
    <div className="next-5-days">
      <h2 className="heading">Next 5 days</h2>

      <div className="container">
        {fiveDaysWeather.map((dayData) => {
          return (
            <div className="row">
              <div className="date">
                {dayData.day}
                <div className="label">{dayData.date}</div>
              </div>
              <div className="low">
                {dayData.low}&deg;
                <div className="label">Low</div>
              </div>
              <div className="high">
                {dayData.high}&deg;
                <div className="label">High</div>
              </div>
              <div className="icon">
                <img
                  src={`icons/${dayData.iconIndex}.png`}
                  alt={`${dayData.description}`}
                />
              </div>
              <div className="wind">
                {dayData.wind}
                <div className="label">Wind</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default nextFiveDays;
