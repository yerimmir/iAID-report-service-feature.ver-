import React, { useState } from "react";
import { Image, Font } from "@react-pdf/renderer";
import { Global } from "recharts";
import { useAsync } from "react-async-hook";
import {
  htmlSvgToPdfSvg,
  htmlSvgToPdfSvgSync,
  svgToDataURI,
  withCache,
} from "components/atoms/Rechart/imageFromSvg";
import font from "assets/fonts/MalgunGothicRegular.ttf";
import nanum from "assets/fonts/NanumGothic.ttf";
import nanumBold from "assets/fonts/NanumGothicBold.ttf";

// Font.register({
//   family: "MalgunGothicRegular",
//   fonts: [{ src: font }, { src: font, fontWeight: 700 }],
// });

Font.register({
  family: "MalgunGothicRegular",
  fonts: [{ src: font }, { src: font, fontWeight: 700 }],
});

export const Chart2Img = ({ debug, style, children, width, height }) => {
  const [imageSrc, setImageSrc] = useState("");

  React.useEffect(() => {
    const fetchImageSrc = async () => {
      const Component = React.Children.only(children);
      const response = await chartToImage(Component, width, height);
      setImageSrc(response);
    };

    fetchImageSrc();
  });

  return (
    <div>
      <img alt={""} src={imageSrc} />
    </div>
  );
};

export const Chart2ReactPDFImage = ({
  debug,
  style,
  children,
  width,
  height,
}) => {
  const Component = React.Children.only(children);
  return (
    <Image
      debug={debug}
      style={style}
      source={() => chartToImage(Component, width, height)}
    />
  );
};

export const Chart2ReactPDFSVG = (props) => {
  const { sync } = props;
  if (sync === true) {
    console.log("render as sync");
    return Chart2ReactPDFSVGInSync(props);
  } else {
    return Chart2ReactPDFSVGInAsyncAndCache(props);
  }
};

export const Chart2ReactPDFSVGInSync = (props) => {
  // svg로 바로 그리면, 한글이 깨지고 위치가 안맞음.
  const { debug, style, children, width, height } = props;

  const component = htmlSvgToPdfSvgSync(children);
  const result = React.cloneElement(component, {
    width,
    height,
    debug,
    style,
  });
  return result;
};

export const Chart2ReactPDFSVGInAsyncAndCache = (props) => {
  // svg로 바로 그리면, 한글이 깨지고 위치가 안맞음.
  const { debug, style, children, width, height } = props;
  const task = useAsync(chartToPdfSvg, [children, width, height, debug, style]);

  if (task.result) {
    return task.result;
  }
  return null;
};

// export const Chart2ReactPDFSVG = (props) => {
//   // svg로 바로 그리면, 한글이 깨지고 위치가 안맞음.

//   const { debug, style, children, width, height } = props;

//   // style
//   const component = htmlSvgToPdfSvg2(children);
//   // Global.set("isSsr", false); // animationActive
//   console.log("component; ", component);
//   const result = React.cloneElement(component, {
//     width,
//     height,
//     debug,
//     style,
//   });
//   console.log("result; ", result);
//   return result;

//   const test = chartToPdfSvg([children, width, height, debug, style]);
//   console.log("test: ", test);

//   const task = useAsync(chartToPdfSvg, [children, width, height, debug, style]);

//   if (task.result) {
//     console.log("task result: ", task.result);
//     return task.result;
//   }
//   console.log("return null");
//   return null;
// };

// export const Chart2ReactPDFSVG = async (props) => {
//   // svg로 바로 그리면, 한글이 깨지고 위치가 안맞음.

//   const { debug, style, children, width, height } = props;

//   const task = await chartToPdfSvg([children, width, height, debug, style]);
//   console.log("task: ", task);
//   return task;
//   if (task.result) {
//     console.log("task result: ", task.result);
//     return task.result;
//   }
//   console.log("return null");
//   return null;
// };

const chartToImage = withCache(async (Component, width, height) => {
  const ReactDom = await import("react-dom");

  const div = document.createElement("div");
  const cloned = React.cloneElement(Component, { width, height });

  ReactDom.render(cloned, div);
  const svg = div.querySelector("svg");

  const svgString = new global.XMLSerializer().serializeToString(svg); // dom tree를 javascript 문자화
  const uri = await svgToDataURI(svgString, width, height);

  return uri;
});

const chartToPdfSvg = withCache(
  async (children, width, height, debug, style) => {
    Global.set("isSsr", true); // animationActive
    const component = await htmlSvgToPdfSvg(children);
    Global.set("isSsr", false); // animationActive

    const result = React.cloneElement(component, {
      width,
      height,
      debug,
      style,
    });

    return result;
  }
);
