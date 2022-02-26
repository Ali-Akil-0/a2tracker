import "./App.css";
import { FormControl } from "@mui/material";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import InfoBox from "./InfoBox";
import Map from "./Map";
import Table from "./Table";
import LineGraph from "./LineGraph";
import "leaflet/dist/leaflet.css";
import { Card, CardContent, cardMediaClasses, Typography } from "@mui/material";

//"https://disease.sh/v3/covid-19/countries"

function App() {
  const [countries, setCountries] = useState(["USA", "UK", "MOROCCO"]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapZoom, setMapZoom] = useState(5);
  const [mapCountries, setMapCountries] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -404796 });
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries").then(
        (response) => {
          response.json().then((Data) => {
            const countries = Data.map((country) => ({
              name: country.country,
              value: country.countryInfo.iso2,
            }));
            setCountries(countries);
            setTableData(Data);
            setMapCountries(Data);
          });
        }
      );
    };
    getCountriesData();
  }, [countries]);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;
    setCountry(countryCode);

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
        console.log("The latitude is testing ", data.countryInfo.lat);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(1);
      });
  };

  return (
    <div className="app">
      <div className="app__left">
        {/* Header */}
        <div className="app__header">
          {/* Title */}
          <h1>COVID-19 TRACKER</h1>
          {/* Dropdown */}
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
          {/* InfoBoxes */}
          <InfoBox
            title="Coronavirus Cases"
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          />
          <InfoBox
            title="Recovered "
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          />
          <InfoBox
            title="Deaths"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          />
          {/* InfoBoxes */}
        </div>
        {/* Map */}
        <Map countries={mapCountries} center={mapCenter} zoom={mapZoom} />
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          {/* sidebar */}
          {/* Table */}
          <Table countries={tableData} />
          <h3>Worldwide new cases</h3>

          {/* Chart */}
          <LineGraph />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
