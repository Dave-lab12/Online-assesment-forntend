import React, { useState, useEffect } from "react";
import InternGraph from "./InternGraph";

const Analytics = ({ internAnalytics }) => {
  const [osType, setOsType] = useState([]);
  const [browser, setBrowser] = useState([]);
  const osData = [];
  const browserData = [];
  function countDuplicates(arr) {
    const osType = {};
    arr.forEach(function (value) {
      osType[value] = 0;
    });
    arr.forEach(function (value) {
      osType[value]++;
    });
    return osType;
  }

  useEffect(() => {
    if (internAnalytics.data) {
      internAnalytics.data.map((intern) => {
        osData.push(intern.attributes.osType);
        browserData.push(intern.attributes.browser);
      });
      setOsType(countDuplicates(osData));
      setBrowser(countDuplicates(browserData));
    }
  }, [internAnalytics]);

  const osKeys = Object.keys(osType);
  const browserKeys = Object.keys(browser);
  osKeys &&
    osKeys.forEach((item) => {
      osData.push({
        type: item,
        value: osType[item],
      });
    });
  browserKeys &&
    browserKeys.forEach((item) => {
      browserData.push({
        type: item,
        value: browser[item],
      });
    });

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div style={{ flex: 1 }}>
        <h1>Operating Systems Used</h1>
        <InternGraph data={osData} />;
      </div>
      <div style={{ flex: 1 }}>
        <h1>Browsers used</h1>
        <InternGraph data={browserData} />;
      </div>
    </div>
  );
};

export default Analytics;
