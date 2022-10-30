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
      <h2 className="next-5-days__heading">Next 5 days</h2>

      <div className="next-5-days__container">
        {fiveDaysWeather.map((dayData, index) => {
          return (
            <div className="next-5-days__row" key={dayData.day + index}>
              <div className="next-5-days__date">
                {dayData.day}
                <div className="next-5-days__label">{dayData.date}</div>
              </div>
              <div className="next-5-days__low">
                {dayData.low}&deg;
                <div className="next-5-days__label">Low</div>
              </div>
              <div className="next-5-days__high">
                {dayData.high}&deg;
                <div className="next-5-days__label">High</div>
              </div>
              <div className="next-5-days__icon">
                <img
                  src={`icons/${dayData.iconIndex}.png`}
                  alt={`${dayData.description}`}
                />
              </div>
              <div className="next-5-days__wind">
                {dayData.wind + " km/h"}
                <div className="next-5-days__label">Wind</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default nextFiveDays;
