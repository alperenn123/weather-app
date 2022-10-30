import { useState, useRef } from "react";
import { AsyncPaginate } from "react-select-async-paginate";


const SearchBar = ({onSearchChange}) => {
    const [search, setSearch] = useState(null);
    const cache = useRef({});


  const loadOptions = async (search, loadedOptions) =>  {
    const geoApiUrl = 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities'
    const url = `${geoApiUrl}?minPopulation=1000000&namePrefix=${search}`
    let data;

    if(!cache.current[url]) {
      const options = {
          method: 'GET',
          headers: {
              'X-RapidAPI-Key': 'WgZw94Nj3smshOxdvuEuQ2rHFJ1Qp1NCeYqjsnNkRh8YkGekCQ',
              'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
          }
      };
      const apiResponse = await fetch(url, options);
      data = await apiResponse.json();
      cache.current[url] = data;
    }

    return {
      options: cache.current[url].data.map(city => ({ value: `${city.latitude} ${city.longitude}`,  label: `${city.name}, ${city.countryCode}` })),
      hasMore: false
    };

  }
    const handleOnChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData)
    }

    return (
      <div style={{color:"black"}}>
        <AsyncPaginate 
          placeholder='Search for the city'
          debounceTimeout={600}
          value={search}
          onChange={handleOnChange}
          loadOptions={loadOptions}
        />
      </div>
    )
}


export default SearchBar;