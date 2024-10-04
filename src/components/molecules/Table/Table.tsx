import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { View, StyleSheet } from "@react-pdf/renderer";

export interface TableItemProps {
    header?: React.ReactNode;
    value?: React.ReactNode;
}

export interface TableProps {
    className?: string;
    containerStyle?: object;

    items?: TableItemProps[];
    valueOnly?: boolean;
}

const styles = StyleSheet.create({
    headerContainerStyle: {
        display: "flex",
        width: "100%",
        height: "25px",
        backgroundColor: "#EFEFEF",

        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",

        borderTopLeftRadius: "10px",
        borderTopRightRadius: "10px",
        borderBottomLeftRadius: "0px",
        borderBottomRightRadius: "0px",
    },
    bodyContainerStyle: {
        display: "flex",
        width: "100%",

        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",

        borderTopLeftRadius: "0px",
        borderTopRightRadius: "0px",
        borderBottomLeftRadius: "10px",
        borderBottomRightRadius: "10px",

        paddingTop: "5px",
        paddingBottom: "5px",
    },
    bodyItemStyle: {
        display: "flex",
    },

    // container
    containerStyle: {
        display: "flex",
        width: "100%",
        height: "75px",
        flexDirection: "column",
        borderRadius: "10px",
        borderColor: "#D4D4D4",
        borderWidth: "1px",
    },
});

export const Table: React.FC<TableProps> = (props) => {
    return props.valueOnly ? (
        <View style={[styles.containerStyle, props.containerStyle]}>
            <View style={styles.bodyContainerStyle}>
                {props.items?.map((item, key) => {
                    return (
                        <View key={key} style={styles.bodyItemStyle}>
                            {item.value}
                        </View>
                    );
                })}
            </View>
        </View>
    ) : (
        <View style={[styles.containerStyle, props.containerStyle]}>
            <View style={styles.headerContainerStyle}>
                {props.items?.map((item, key) => {
                    return <View key={key}>{item.header}</View>;
                })}
            </View>
            <View style={styles.bodyContainerStyle}>
                {props.items?.map((item, key) => {
                    return (
                        <View key={key} style={styles.bodyItemStyle}>
                            {item.value}
                        </View>
                    );
                })}
            </View>
        </View>
    );
};

const defaultProps = {
    valueOnly: false,
};
Table.defaultProps = defaultProps;
Table.propTypes = {
    className: PropTypes.string,
    containerStyle: PropTypes.object,

    items: PropTypes.arrayOf(PropTypes.any),
    valueOnly: PropTypes.bool,
};
