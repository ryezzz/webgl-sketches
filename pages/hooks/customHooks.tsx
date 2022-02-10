import React, { FC, useRef, useState, useEffect } from "react";
import * as d3 from "d3";
import { formatDataFunct } from "../utils/utils";
import useSWR from "swr";
import axios from "axios";

export const loadDataFromCsv = (
  url: string,
  formatFunction: Function = formatDataFunct
) => {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    d3.csv(url).then((d: Array<any>) => {
      // TODO: I'm going to loop through all 4 different date options to calculate swarm positions before actually loading. This needs to live in a seperate util. This will speed up the UX a bit. The only thing that will be calculated live will be from/to animations. An option to hide elments while loading is to first return a default layout so that something's on the screen. Eventually this could be part of a back end.
      let formattedDate = formatFunction(d as [any]);

      setData(formattedDate as any[any]);
    });
    // Todo: this needs error handling
    //  if (Error) throw Error;
  }, []);

  return data;
};

export const loadDataFromTSV = (
  url: string,
  formatFunction: Function = formatDataFunct
) => {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    d3.tsv(url).then((d: Array<any>) => {
      let formattedDate = formatFunction(d as [any]);

      setData(formattedDate as any[any]);
    });
  }, []);

  return data;
};

export const loadDataFromJson = (url: string) => {
  // const [data, setData] = React.useState([]);
  // React.useEffect(() => {
  //   d3.json(url).then((d) => {
  //     let formattedDate = d as [any]

  //     setData(formattedDate as any[any]);
  //   });
  //   // Todo: this needs error handling
  //   //  if (Error) throw Error;

  // }, []);

  const address = `${url}`;
  const fetcher = async (url: string) =>
    await axios.get(url).then((res) => res.data);
  const { data, error } = useSWR(address, fetcher);
  return data;
};

export const usePrevious = (value: any, defaultRef: any) => {
  const ref = useRef(defaultRef);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};
