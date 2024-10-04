import React, { Component } from "react";
import { View, StyleSheet } from "@react-pdf/renderer";
import PropTypes from "prop-types";

import Typhography from "components/atoms/Typography/Typography";

export interface DescriptionProps {
    text?: string;
    containerStyle?: object;
}

const styles = StyleSheet.create({
    // container
    containerStyle: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column",
        width: "100%",
        justifyContent: "center",
        backgroundColor: "#EFEFEF",
        borderRadius: 10,
        padding: 7,
    },
});

/**
 * Description 컴포넌트
 * @param props 
 * @returns 
 */
export const Description: React.FC<DescriptionProps> = (props) => {
    return (
        <View style={[styles.containerStyle, props.containerStyle]}>
            <Typhography
                text={props.text}
                textStylePreset={"value_medium"}
            ></Typhography>
        </View>
    );
};

Description.propTypes = {
    // header Section
    text: PropTypes.string.isRequired,
    //
    containerStyle: PropTypes.object,
};

export default Description;
