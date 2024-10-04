import { Svg, G, Text, Path, Font, Polygon } from "@react-pdf/renderer";
import React from "react";

import font from "assets/fonts/MalgunGothicRegular.ttf";
import nanum from "assets/fonts/NanumGothic.ttf";
import nanumBold from "assets/fonts/NanumGothicBold.ttf";

// Font.register({
//   family: "Nanum Gothic",
//   src: "https://fonts.gstatic.com/ea/nanumgothic/v5/NanumGothic-ExtraBold.ttf",
// });

Font.register({
  family: "Nanum Gothic",
  fonts: [{ src: nanum }, { src: nanumBold, fontWeight: 700 }],
});

const PdfSVG: any = Svg;
const PdfG: any = G;

const RightArrow = (props) => {
  const length =
    props.difference >= 0
      ? String(props.difference).length
      : String(props.difference).substring(1, props.difference.length).length;
  return (
    <PdfSVG
      height="100px"
      width="100px"
      viewBox="0 0 512 512"
      style={{ margin: "auto 0 auto 40px" }}
    >
      <PdfG>
        <Polygon
          points="512,256.001 195.491,18.616 195.491,153.599 0,153.599 0,358.403 195.491,358.403 195.491,493.384"
          style={{ fill: "#C6D9F1" }}
        />
        <Text
          x="10"
          y="300"
          style={
            length > 2
              ? {
                  fontSize: "115px",
                  fontWeight: "bold",
                  textAlign: "right",
                  color: "black",
                  fontFamily: "Nanum Gothic",
                }
              : {
                  fontSize: "140px",
                  fontWeight: "bold",
                  textAlign: "right",
                  color: "black",
                  fontFamily: "Nanum Gothic",
                }
          }
        >
          {props.difference > 10
            ? `+ ${props.difference}`
            : props.difference >= 0
            ? `+   ${props.difference}`
            : props.difference <= -10
            ? `-  ${String(props.difference).substring(
                1,
                props.difference.length
              )}`
            : `-    ${String(props.difference).substring(
                1,
                props.difference.length
              )}`}
        </Text>
        <Text
          x="320"
          y="300"
          style={{
            fontSize: "80px",
            fontWeight: "thin",
            textAlign: "left",
            color: "black",
            fontFamily: "Nanum Gothic",
          }}
        >
          세
        </Text>
      </PdfG>
    </PdfSVG>
  );
};

export default RightArrow;
