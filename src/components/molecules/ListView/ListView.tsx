import React, { CSSProperties, Component } from "react";
import { View, StyleSheet } from "@react-pdf/renderer";
import PropTypes from "prop-types";

export interface ListViewProps {
  className?: string;

  items: any[];
  itemsInRow?: number;
  renderItem?: any;
  itemStyle?: object;
  itemContainerStyle?: object;

  // header (필수사항 아님)
  headerItems?: any[];
  headerDirection?: string;
  renderHeaderItem?: any;
  headerItemStyle?: object;
  headerContainerStyle?: object;

  containerStyle?: object;
}

const styles = StyleSheet.create({
  // item
  itemStyle: {
    width: "100%",
    marginTop: "2px",
    marginBottom: "2px",
  },
  itemContainerStyle: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "space-between",
    flexWrap: "wrap",
  },

  // header
  headerItemStyle: {
    width: "100%",
    // marginTop: "2px",
    marignBottom: "2px",
  },
  headerContainerStyle: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignContent: "space-around",
    flexWrap: "wrap",
  },

  // container
  containerStyle: {
    display: "flex",
    width: "98%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "space-between",
    flexWrap: "wrap",
  },
});

/**
 * item들 flex로 정렬해서 배치 후 출력하는 컴포넌트
 * @param props
 * @returns
 */
export const ListView: React.FC<ListViewProps> = (props) => {
  const {
    items = [],
    itemsInRow = 1,
    renderItem,
    itemStyle,
    itemContainerStyle,
    headerItems,
    headerDirection = "row",
    renderHeaderItem,
    headerItemStyle,
    headerContainerStyle,
    containerStyle,
  } = props;

  // CSS Flex Items
  //   (https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Mastering_Wrapping_of_Flex_Items)
  //   (https://velog.io/@choonghee-lee/%EB%B2%88%EC%97%AD-A-Complete-Guide-to-Flexbox)
  // CSS Grid Item으로 고려해보면 좋을 것 같음 (bootstrap 연동해서)

  // 구조 참고 (https://codesandbox.io/s/lb9bn?file=/index.js)
  //          (https://material-ui.com/components/lists/)\
  //          (https://ko.reactjs.org/docs/jsx-in-depth.html)

  // item의 가로길이를 조절해서 한 행에 배치되는 item 수 조절
  // (길이, direction 조절 등의 이유로 변수를 선언하고, style을 적용해야함)
  let newItemStyle = { ...styles.itemStyle, ...itemStyle };
  let newHeaderItemStyle = {
    ...styles.headerItemStyle,
    ...headerItemStyle,
  };
  let newHeaderContainerStyle = {
    ...styles.headerContainerStyle,
    ...headerContainerStyle,
  };
  let newContainerStyle = {
    ...styles.containerStyle,
    ...containerStyle,
  };

  const rate = 100 / itemsInRow;
  newItemStyle.width = rate + "%";

  const backgroundColorArray = ["white", "#E6BDBE", "#A8A0B8", "#A18986"];

  if (headerItems) {
    if (headerDirection === "row") {
      // @ts-ignore
      newContainerStyle.flexDirection = "column";
      newHeaderContainerStyle.flexDirection = "row";
      newHeaderItemStyle.width = newItemStyle.width;
    } else {
      newContainerStyle.flexDirection = "row";
      // @ts-ignore
      newContainerStyle.flexWrap = "no-wrap";
      // @ts-ignore
      newHeaderContainerStyle.flexDirection = "column";
    }

    return (
      <View style={newContainerStyle}>
        <View style={newHeaderContainerStyle}>
          {headerItems?.map((item, idx) => {
            let bgColor = backgroundColorArray[idx];
            return (
              <View
                key={idx}
                style={[newHeaderItemStyle, { backgroundColor: bgColor }]}
              >
                {!!renderHeaderItem && renderHeaderItem(item)}
              </View>
            );
          })}
        </View>
        <View style={[styles.itemContainerStyle, itemContainerStyle]}>
          {items?.map((item, idx) => {
            function bgColor() {
              if (idx < items.length / 4) {
                return backgroundColorArray[0];
              } else if (
                idx >= items.length / 4 &&
                idx < (items.length / 4) * 2
              ) {
                return backgroundColorArray[1];
              } else if (
                idx >= (items.length / 4) * 2 &&
                idx < (items.length / 4) * 3
              ) {
                return backgroundColorArray[2];
              } else {
                return backgroundColorArray[3];
              }
            }
            return (
              <View
                key={idx}
                style={[newItemStyle, { backgroundColor: bgColor() }]}
              >
                {renderItem(item)}
              </View>
            );
          })}
        </View>
      </View>
    );
  } else {
    return (
      <View style={newContainerStyle}>
        {items?.map((item, idx) => {
          return (
            <View key={idx} style={newItemStyle}>
              {renderItem(item)}
            </View>
          );
        })}
      </View>
    );
  }
};

const defaultProps = {
  itemsInRow: 1,
  headerDirection: "row",
};

ListView.defaultProps = defaultProps;
ListView.propTypes = {
  className: PropTypes.string,

  // item
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  itemsInRow: PropTypes.number,
  renderItem: PropTypes.any,
  itemStyle: PropTypes.object,
  itemContainerStyle: PropTypes.object,

  // header (필수사항 아님)
  headerItems: PropTypes.arrayOf(PropTypes.any),
  headerDirection: PropTypes.string,
  renderHeaderItem: PropTypes.any,
  headerItemStyle: PropTypes.object,
  headerContainerStyle: PropTypes.object,

  // containerStyle
  containerStyle: PropTypes.object,
};

export default ListView;
