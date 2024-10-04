import React from "react";
import { Document, Page, PDFViewer } from "@react-pdf/renderer";
import PDFStyle from "assets/PDFStyle";

import ListView from "components/molecules/ListView/ListView";
import KeyValue from "components/molecules/KeyValue/KeyValue";
import Splitter from "components/molecules/Splitter/Splitter";
import Typhography from "components/atoms/Typography/Typography";

export default {
    component: ListView,
    title: "molecules/ListView",
};

const Template = function (args) {
    return (
        <PDFViewer
            width={PDFStyle.viewer.width}
            height={PDFStyle.viewer.height}
        >
            <Document>
                <Page size={"A4"} style={PDFStyle.page}>
                    <ListView {...args} />
                </Page>
            </Document>
        </PDFViewer>
    );
};

export const ListExample = Template.bind({});
ListExample.args = {
    items: [
        { attr: "적정체중", value: "71.3kg" },
        { attr: "체중조절", value: "-2.6kg", iconName: "arrowUp" },
        { attr: "체중조절", value: "-2.6kg", iconName: "arrowUp" },
        { attr: "체중조절", value: "-2.6kg" },
        { attr: "체중조절", value: "-2.6kg", iconName: "arrowUp" },
        { attr: "체중조절", value: "-2.6kg" },
    ],
    renderItem: (props) => {
        return <KeyValue data={props} />;
    },
    containerStyle: {
        width: "200px",
    },
};

export const TableRowExample = Template.bind({});
TableRowExample.args = {
    items: [25, 24.7, 23.2, 22.8, 33.1, 28.3, 23.5, 19.9],
    itemsInRow: 4,
    renderItem: (props) => {
        return <Typhography text={props}></Typhography>;
    },

    headerDirection: "row",
    headerItems: ["비만도(kg/m)", "체지방률(%)", "비만도(kg/m)", "체지방률(%)"],
    renderHeaderItem: (props) => {
        return <Typhography text={props}></Typhography>;
    },

    // style
    headerContainerStyle: { backgroundColor: "#aaaaaa", borderRadius: 5 },
};

export const TableColExample = Template.bind({});
TableColExample.args = {
    items: [25, 24.7, 23.2, 22.8, 33.1, 28.3, 23.5, 19.9],
    itemsInRow: 4,
    renderItem: (props) => {
        return <Typhography text={props}></Typhography>;
    },

    headerDirection: "column",
    headerItems: ["비만도(kg/m)", "체지방률(%)"],
    renderHeaderItem: (props) => {
        return <Typhography text={props}></Typhography>;
    },

    // style
    headerContainerStyle: {
        width: "120px",
        backgroundColor: "#aaaaaa",
        borderRadius: 5,
    },
};

export const Default = Template.bind({});
Default.args = {
    items: [1, 1, 1, 1],
    renderItem: () => {
        return <Splitter />;
    },
    itemsInRow: 1,
    itemStyle: {
        width: "100%",
    },
    containerStyle: {
        display: "flex",
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "wrap",
    },
};

export const Debug = Template.bind({});
