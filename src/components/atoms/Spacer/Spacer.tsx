import React, { CSSProperties, Component } from "react";
import { View, StyleSheet } from "@react-pdf/renderer";
import PropTypes from "prop-types";

export interface SpacerProps {
  /**
   * 공백 방향 설정
   */
  direction?: "row" | "col";
  /**
   * 공백 크기 설정
   */
  margin?: string;
  containerStyle? : CSSProperties;
}

const styles = StyleSheet.create({
  containerStyle: {
    //backgroundColor: "#ff0000",
  },
});

export const Spacer: React.FC<SpacerProps> = (props) => {
  return props.direction === "row" ? (
    <View
      style={[
        styles.containerStyle,
        props.containerStyle,
        { width: "100%", height: `${props.margin}` },
      ]}
    ></View>
  ) : (
    <View
      style={[
        styles.containerStyle,
        props.containerStyle,
        { width: `${props.margin}`, height: "100%" },
      ]}
    ></View>
  );
};

Spacer.defaultProps = {
  direction: "row",
  margin: "5px",
};
Spacer.propTypes = {
  direction: PropTypes.any,
  margin: PropTypes.string,
  containerStyle: PropTypes.any,
};
