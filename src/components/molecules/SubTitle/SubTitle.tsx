import React, { Component } from "react";
import { View, StyleSheet } from "@react-pdf/renderer";
import PropTypes from "prop-types";

import Typhography from "components/atoms/Typography/Typography";
import Splitter from "components/molecules/Splitter/Splitter";

export interface SubTitleProps {
    title?: string;
    containerStyle: object;
}

// style (default)
const styles = StyleSheet.create({
    // title
    titleContainerStyle: {
        marginBottom: "7px",
    },

    // splitter
    splitterLeftStyle: {
        backgroundColor: "#3F484E",
    },
    splitterRightStyle: {
        backgroundColor: "#04ACF3",
    },
    splitterContainerStyle: {
        height: "8px",
    },

    // container
    containerStyle: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        justifyContent: "center",

        marginBottom: "10px",
    },
});

export const SubTitle: React.FC<SubTitleProps> = (props) => {
    return (
        <View style={[styles.containerStyle, props.containerStyle]}>
            <Typhography
                text={props.title}
                textStylePreset={"subtitle"}
                containerStyle={styles.titleContainerStyle}
            ></Typhography>
            <Splitter
                lineLeftStyle={styles.splitterLeftStyle}
                lineRightStyle={styles.splitterRightStyle}
                containerStyle={styles.splitterContainerStyle}
            ></Splitter>
        </View>
    );
};

SubTitle.propTypes = {
    title: PropTypes.string.isRequired,
    containerStyle: PropTypes.object,
};
export default SubTitle;
