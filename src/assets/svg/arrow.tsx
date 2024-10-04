import { Svg, G, Text, Path, Font } from "@react-pdf/renderer";
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
  fonts: [{ src: nanum }, { src: nanumBold, fontWeight: 1700 }],
});

const PdfSVG: any = Svg;
const PdfG: any = G;

const Arrow = (props) => {
  return (
    <PdfSVG width="150px" height="100px" viewBox="-1.5 3 20 15">
      <PdfG>
        <Path d="M14 15.5V12H1V8h13V4.5l5.25 5.5L14 15.5z" fill="#C6D9F1" />
        <Text
          x="2"
          y="11.5"
          style={{
            fontSize: "4px",
            fontWeight: "thin",
            textAlign: "left",
            color: "black",
            fontFamily: "Nanum Gothic",
          }}
        >
          {props.difference >= 0
            ? `+ ${props.difference}`
            : `- ${String(props.difference).substring(
                1,
                props.difference.length
              )}`}
        </Text>
        <Text
          x="10"
          y="11.5"
          style={{
            fontSize: "3px",
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

export default Arrow;
