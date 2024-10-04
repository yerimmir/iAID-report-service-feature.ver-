import React, { Component } from "react";
import { View, StyleSheet } from "@react-pdf/renderer";
import PropTypes from "prop-types";
import { SVGArrowUp, SVGArrowDown, SVGNoIcon } from "assets/vectors";

import { isEmpty } from "modules/checkError";

const iconSet = {
    noIcon: SVGNoIcon,
    arrowUp: SVGArrowUp,
    arrowDown: SVGArrowDown,
};

export interface SVGIconProps {
    /**
     * classname
     */
    className?: string;

    /**
     * 아이콘명
     */
    name: string;
    /**
     * icon 사이즈
     */
    size?: number;
    /**
     * 아이콘 크기
     */
    color?: string;
    /** 
    * 스타일
    */
    containerStyle?: object;
}

// style (default)
const styles = StyleSheet.create({
    containerStyle: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },
});

export const SVGIcon: React.FC<SVGIconProps> = (props) => {
    const drawIcon = (name, width, height) => {
        let Icon = iconSet[`${name}`];

        if (Icon === null || Icon === undefined) {
            Icon = iconSet["noIcon"];
        }

        /*
        const viewBox = JSON.parse(Icon.viewBox); // viewBox(min-x, min-y, width, height)
        const viewBoxWidth = viewBox[2];   
        const viewBoxHeight = viewBox[3];

        // width, height 값을 지정할 경우, 지정한 값으로, 지정하지 않았을 경우 viewBox width, height로 지정
        const width = iconWidth? iconWidth: viewBoxWidth;
        const height = iconHeight? iconHeight: viewBoxHeight;
        */

        return <Icon width={width} height={height} />;
    };

    return (
        <View style={[styles.containerStyle, props.containerStyle]}>
            {drawIcon(props.name, props.size, props.size)}
        </View>
    );
};

const defaultProps = {
    name: "noIcon",
    size: 10,
};

SVGIcon.propTypes = {
    className: PropTypes.string,

    name: PropTypes.string,
    size: PropTypes.number,
    color: PropTypes.string,

    // container
    containerStyle: PropTypes.object,
};

export default SVGIcon;
