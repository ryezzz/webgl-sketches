import React, { FC, useRef, useState, useEffect } from "react";
import * as d3 from "d3"


export const loadData = (url) => {
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    React.useEffect(() => {
      d3.csv(url).then((d) => {
        setData(d);
        setLoading(false);
      });
      return () => undefined;
    }, []);
    return data;
  };
