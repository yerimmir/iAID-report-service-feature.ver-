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
                d="M10,11.491l4.961-4.965a.938.938,0,1,1,1.324,1.328l-5.621,5.625a.936.936,0,0,1-1.293.027L3.711,7.858A.938.938,0,0,1,5.035,6.53Z"
                transform="translate(-2.938 -5.75)"
                fill="blue"
                stroke="blue"
                strokeWidth="1"
            />
        </Svg>
    );
});
