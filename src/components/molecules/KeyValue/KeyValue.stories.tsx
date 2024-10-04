import React from "react";
import { Document, Page, PDFViewer } from "@react-pdf/renderer";
import PDFStyle from "assets/PDFStyle";

import KeyValue from "components/molecules/KeyValue/KeyValue";

export default {
    component: KeyValue,
    title: "molecules/KeyValue",
};

const Template = function (args) {
    return (
        <PDFViewer
            width={PDFStyle.viewer.width}
            height={PDFStyle.viewer.height}
        >
            <Document>
                <Page size={"A4"} style={PDFStyle.page}>
                    <KeyValue {...args} />
                </Page>
            </Document>
        </PDFViewer>
    );
};

export const TextOnly = Template.bind({});
TextOnly.args = {
    data: {
        attr: "체중 점수",
        value: "96점",
    },

    // key
    keyLabelStyle: {
        textAlign: "right",
        fontSize: 10,
        fontWeight: "bold",
        color: "#395B99",
    },
    keyContainerStyle: {
        width: "100px",
    },

    // splitter
    splitterStyle: {
        width: "1px",
        height: "80%",
        marginLeft: "2px",
        marginRight: "2px",
        backgroundColor: "#707070",
    },

    // value
    valueLabelStyle: {
        textAlign: "right",
    },
    valueLabelContainerStyle: {
        width: "70px",
    },
    containerStyle: {
        width: "180px",
    },
};

export const Default = Template.bind({});
Default.args = {
    data: {
        attr: "체중조절",
        value: "-2.6kg",
        iconName: "arrowUp",
    },
    // key
    keyLabelStyle: {
        textAlign: "right",
        fontWeight: "bold",
        color: "#395B99",
    },
    keyLabelContainerStyle: {},
    keyIconContainerStyle: {
        width: "25px",
    },
    keyContainerStyle: {
        width: "100px",
    },

    // splitter
    splitterStyle: {
        width: "1px",
        height: "80%",
        marginLeft: "2px",
        marginRight: "2px",
        backgroundColor: "#707070",
    },

    // value
    valueLabelStyle: {
        textAlign: "right",
    },
    valueLabelContainerStyle: {
        width: "70px",
    },
    containerStyle: {
        width: "180px",
    },
};

export const Debug = Template.bind({});
