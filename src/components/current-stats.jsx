const CurrentStats = ({ currentStats }) => {
  return (
    <div className="current-stats">
      {Object.keys(currentStats).map((statKey, index) => {
        return (
          <div key={statKey + index}>
            <div className="value">{currentStats[statKey]}</div>
            <div className="label">
              {statKey[0].toLocaleUpperCase() + statKey.slice(1)}
            </div>
          </div>
        );
      })}
      {/* <div>
        <div class="current-stats__value">23&deg;</div>
        <div class="current-stats__label">High</div>
        <div class="current-stats__value">14&deg;</div>
        <div class="current-stats__label">Low</div>
      </div>
      <div>
        <div class="current-stats__value">7mph</div>
        <div class="current-stats__label">Wind</div>
        <div class="current-stats__value">0%</div>
        <div class="current-stats__label">Rain</div>
      </div>
      <div>
        <div class="current-stats__value">05:27</div>
        <div class="current-stats__label">Sunrise</div>
        <div class="current-stats__value">20:57</div>
        <div class="current-stats__label">Sunset</div>
      </div> */}
    </div>
  );
};

export default CurrentStats;
