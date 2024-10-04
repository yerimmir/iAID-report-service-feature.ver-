import React from "react";
import { Svg, Path } from "@react-pdf/renderer";

export default React.memo((props) => {
    const { width, height } = props;

    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox="0 0 17.209 9.578"
        >
            <Path
                id="Icon_ionic-ios-arrow-up"
                dataName="Icon ionic-ios-arrow-up"
                d="M10,8.512l4.961,4.965a.938.938,0,1,0,1.324-1.328L10.664,6.523A.936.936,0,0,0,9.371,6.5l-5.66,5.648a.938.938,0,1,0,1.324,1.328Z"
                transform="translate(-2.938 -5.674)"
                fill="red"
                stroke="red"
                strokeWidth="1"
            />
        </Svg>
    );
});
