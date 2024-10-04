import React from "react";
import { Global } from "recharts";

import { htmlSvgToPdfSvg } from "../Rechart/imageFromSvg";

export const ChartSvg = ({ debug, style, children, width, height }) => {
  return chartToPdfSvg(children, width, height, debug, style);
};

const chartToPdfSvg = (children, width, height, debug, style) => {
  Global.set("isSsr", true);
  const component = htmlSvgToPdfSvg(children);
  Global.set("isSsr", false);

  // @ts-ignore
  const result = React.cloneElement(component, { width, height, debug, style });
  return result;
};

export default ChartSvg;
