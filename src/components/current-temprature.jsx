const CurrentTemprature = ({ temprature, summary, iconIndex }) => {
  return (
    <div className="current-temperature">
      <div className="current-temperature__icon-container">
        <img
          src={`icons/${iconIndex}.png`}
          className="current-temperature__icon"
          alt=""
        />
      </div>
      <div className="current-temperature__content-container">
        <div className="current-temperature__value">{temprature}&deg;</div>
        <div className="current-temperature__summary">{summary}</div>
      </div>
    </div>
  );
};

export default CurrentTemprature;
