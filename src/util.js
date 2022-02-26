import { Circle, Popup } from "react-leaflet";
import React from "react";
import numeral from "numeral";
const colors = {
  hex: "#CC1034",
  multiplier: 800,
};

export const sowData = (data, casesType = "cases") => {
  data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      fillOpacity={0.4}
      color={colors.hex}
      fillColor={colors.hex}
      radius={Math.sqrt(country[casesType]) * colors.multiplier}
    >
      <Popup>
        <h1>Popup</h1>
      </Popup>
    </Circle>
  ));
};
