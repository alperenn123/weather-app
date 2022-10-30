const CurrentStats = ({ currentStats }) => {
  return (
    <div className="current-stats">
      {Object.keys(currentStats).map((statKey, index) => {
        return (
          <div key={statKey + index}>
            <div className="current-stats__value">{currentStats[statKey]}</div>
            <div className="current-stats__label">
              {statKey[0].toLocaleUpperCase() + statKey.slice(1)}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CurrentStats;
