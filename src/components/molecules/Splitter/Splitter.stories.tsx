import React from "react";
import { Document, Page, PDFViewer } from "@react-pdf/renderer";
import PDFStyle from "assets/PDFStyle";

import Splitter from "components/molecules/Splitter/Splitter";

export default {
    component: Splitter,
    title: "molecules/Splitter",
};

const Template = function (args) {
    return (
        <PDFViewer
            width={PDFStyle.viewer.width}
            height={PDFStyle.viewer.height}
        >
            <Document>
                <Page size={"A4"} style={PDFStyle.page}>
                    <Splitter {...args} />
                </Page>
            </Document>
        </PDFViewer>
    );
};

export const Line = Template.bind({});
Line.args = {
    lineLeftStyle: {
        width: "30%",
        backgroundColor: "#3f484E",
    },
    lineRightStyle: {
        width: "70%",
        backgroundColor: "#395b99",
    },
    containerStyle: {
        height: "15px",
    },
};

export const Default = Template.bind({});
Default.args = {
    lineLeftStyle: {
        width: "30%",
        backgroundColor: "#3f484E",
    },
    lineRightStyle: {
        width: "70%",
        backgroundColor: "#395b99",
    },
    containerStyle: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        justifyContent: "center",
        height: "10px",
    },
};

export const Debug = Template.bind({});
