import React from "react";
import { View, StyleSheet } from "@react-pdf/renderer";
import PropTypes from "prop-types";

export interface SplitterProps {
    className?: string;

    lineLeftStyle?: object;
    lineRightStyle?: object;
    containerStyle?: object;
}

// style (default)
const styles = StyleSheet.create({
    containerStyle: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        justifyContent: "center",
        height: "10px",
    },
    lineLeftStyle: {
        width: "30%",
        backgroundColor: "#3f484E",
    },
    lineRightStyle: {
        width: "70%",
        backgroundColor: "#395b99",
    },
});

/**
 * 컴포넌트 사이 공백 생성
 * @param props 
 * @returns 
 */
export const Splitter: React.FC<SplitterProps> = (props) => {
    // render
    return (
        <View style={[styles.containerStyle, props.containerStyle]}>
            <View style={[styles.lineLeftStyle, props.lineLeftStyle]}></View>
            <View style={[styles.lineRightStyle, props.lineRightStyle]}></View>
        </View>
    );
};

const defaultProps = {};

Splitter.defaultProps = defaultProps;
Splitter.propTypes = {
    className: PropTypes.string,
    lineLeftStyle: PropTypes.object,
    lineRightStyle: PropTypes.object,
    containerStyle: PropTypes.object,
};
export default Splitter;
