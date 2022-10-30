const CurrentTemprature = ({ temprature, summary, iconIndex }) => {
  return (
    <div className="current-temperature">
      <div className="icon-container">
        <img src={`icons/${iconIndex}.png`} className="icon" alt="" />
      </div>
      <div className="content-container">
        <div className="value">{temprature}&deg;</div>
        <div className="summary">{summary}</div>
      </div>
    </div>
  );
};

export default CurrentTemprature;
