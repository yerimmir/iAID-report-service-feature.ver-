import React, { Component } from "react";
import { View, StyleSheet } from "@react-pdf/renderer";
import PropTypes from "prop-types";

import Typography from "components/atoms/Typography/Typography";
import SVGIcon from "components/atoms/SVGIcon/SVGIcon";

export interface LabelWithIconProps {
    label?: string | number;
    labelAlign?: string;
    labelContainerStyle?: object;

    // icon
    iconName?: string;
    iconWidth?: number;
    iconHeight?: number;
    iconLeft?: boolean;
    iconContainerStyle?: object;

    // container
    containerStyle?: object;
}

// style (default)
const styles = StyleSheet.create({
    labelContainerStyle: {
        width: "100%",
    },
    iconContainerStyle: {
        width: "100%",
    },
    containerStyle: {
        display: "flex",
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
});

export const LabelWithIcon: React.FC<LabelWithIconProps> = (props) => {
    // icon
    if (props.iconLeft === true) {
        return (
            <View style={[styles.containerStyle, props.containerStyle]}>
                <SVGIcon
                    name={props.iconName}
                    size={props.iconWidth}
                    containerStyle={props.iconContainerStyle}
                />
                <Typography
                    text={props.label}
                    textAlign={props.labelAlign}
                    textStylePreset={"attribute_medium"}
                    containerStyle={props.labelContainerStyle}
                ></Typography>
            </View>
        );
    }
    // icon이 글자 오른편 (default)
    else {
        return (
            <View style={[styles.containerStyle, props.containerStyle]}>
                <Typography
                    text={props.label}
                    textAlign={"right"}
                    textStylePreset={"attribute_medium"}
                    containerStyle={props.labelContainerStyle}
                ></Typography>
                <SVGIcon
                    name={props.iconName}
                    size={props.iconWidth}
                    containerStyle={props.iconContainerStyle}
                />
            </View>
        );
    }
};

const defaultProps = {
    iconLeft: false,
};

LabelWithIcon.defaultProps = defaultProps;
LabelWithIcon.propTypes = {
    // label
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    labelAlign: PropTypes.string,
    labelContainerStyle: PropTypes.object,

    // icon
    iconName: PropTypes.string,
    iconWidth: PropTypes.number,
    iconHeight: PropTypes.number,
    iconLeft: PropTypes.bool,
    iconContainerStyle: PropTypes.object,

    // container
    containerStyle: PropTypes.object,
};

export default LabelWithIcon;
