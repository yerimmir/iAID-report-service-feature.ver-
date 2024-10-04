import React, { Component } from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";
import PropTypes from "prop-types";

import { isEmpty } from "modules/checkError";

import "assets/fonts";

export interface TypographyProps {
  className?: string;

  children?: string | number;
  text?: string | number;
  textStylePreset?: string;
  textStyle?: object;
  textAlign?: string;
  textColor?: string;
  containerStyle?: object;
}

// style (default)
const em = 16; // react-pdf에서 css 단위 중 하나인 em을 지원하지 않는다.... ㅜㅜㅜ
const styles = StyleSheet.create({
  textStyle: {
    // default
    fontFamily: "NanumGothic",
    fontSize: "11.5px",
    textAlign: "left",
  },
  containerStyle: {
    display: "flex",
    width: "100%",
  },
});
const presetStyles = StyleSheet.create({
  caption: {
    // Page 제목 (글씨크기 35)
    fontSize: 35,
    color: "#395b99",
    fontWeight: "bold",
  },
  subtitle: {
    // Subtitle (글씨크기 20)
    fontSize: 20,
    color: "#000000",
    fontWeight: "bold",
  },
  attribute_big: {
    // 속성 (글씨크기 13)
    fontSize: 13,
    color: "#395b99",
    fontWeight: "bold",
  },
  attribute_medium: {
    // 속성 (글씨크기 11.5)
    fontSize: 11.5,
    color: "#395b99",
    fontWeight: "bold",
  },
  attribute_small: {
    // 속성 (글씨크기 10.5)
    fontSize: 10.5,
    color: "#395b99",
    fontWeight: "bold",
  },
  value_big: {
    // 값 (글씨크기 13)
    fontSize: 13,
    color: "#000000",
  },
  value_medium: {
    // 값 (글씨크기 11.5)
    fontSize: 11.5,
    color: "#000000",
  },
  value_small: {
    // 값 (글씨크기 10.5)
    fontSize: 10.5,
    color: "#000000",
  },
  liverHU: {
    fontSize: 11.5,
    color: "#F09F22",
  },
  spleenHU: {
    fontSize: 11.5,
    color: "#395B99",
  },
  less: {
    fontSize: 11.5,
    color: "#F3D7AB",
  },
  normal: {
    fontSize: 11.5,
    color: "#F09F22",
  },
  over: {
    fontSize: 11.5,
    color: "#E85E25",
  },
});

const textStylePresets = Object.keys(presetStyles);
const textAligns = ["left", "center", "right"];

export const Typography: React.FC<TypographyProps> = (props) => {
  let t = "-";
  if (!!props.text) {
    t = `${props.text}`;
  } else {
    if (!!props.children) {
      t = `${props.children}`;
    }
  }

  function checkAvailability(arr, val) {
    return arr.some((arrVal) => val === arrVal);
  }

  return (
    <View style={[styles.containerStyle, props.containerStyle]}>
      <Text
        style={[
          styles.textStyle,
          !!checkAvailability(textStylePresets, props.textStylePreset) &&
            presetStyles[props.textStylePreset],
          !!checkAvailability(textAligns, props.textAlign) && {
            textAlign: props.textAlign,
          },
          !!isEmpty(props.textColor) && { color: props.textColor },
          props.textStyle,
        ]}
      >
        {t}
      </Text>
    </View>
  );
};

const defaultProps = {
  textAlign: "left",
};

Typography.defaultProps = defaultProps;
Typography.propTypes = {
  className: PropTypes.string,

  // text
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  textStylePreset: PropTypes.string,
  textAlign: PropTypes.oneOf(textAligns),
  textColor: PropTypes.string,
  textStyle: PropTypes.object,

  // container
  containerStyle: PropTypes.object,
};

export default Typography;
