import React from "react";
import { Category, lengthUnits } from "./units";

import "./app.css";
import { Unit } from "./Unit";

const backgrounds: { [category in Category]: string } = {
  Absolute: "OrangeRed",
  "Relative to font": "RebeccaPurple",
  "Percentage of viewport": "DodgerBlue",
  "Container query": "ForestGreen"
};

export default function App() {
  return (
    <div className="wrapper">
      <h1 className="whole-row">CSS Length Units</h1>
      {Object.entries(lengthUnits).map(([category, { link, units }]) => (
        <div
          key={category}
          className="escape-from-layout"
          style={
            {
              "--color": backgrounds[category]
            } as React.CSSProperties
          }
        >
          <h2 id={category} className="whole-row">
            <a
              style={{ textDecorationColor: "var(--color)" }}
              href={`#${encodeURIComponent(category)}`}
            >
              {category}
            </a>
            <span style={{ fontSize: "1.1rem", marginLeft: "1ch" }}>
              <a href={link}>(more)</a>
            </span>
          </h2>
          {units.map(([unit, description]) => (
            <Unit key={unit} unit={unit} description={description} />
          ))}
        </div>
      ))}
    </div>
  );
}
