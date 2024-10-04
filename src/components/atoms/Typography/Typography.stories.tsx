import React from "react";
import { Document, Page, PDFViewer } from "@react-pdf/renderer";
import PDFStyle from "assets/PDFStyle";

import Typography from "components/atoms/Typography/Typography";

export default {
    component: Typography,
    title: "atoms/Typography",
};

const Template = function (args) {
    return (
        <PDFViewer
            width={PDFStyle.viewer.width}
            height={PDFStyle.viewer.height}
        >
            <Document>
                <Page size={"A4"} style={PDFStyle.page}>
                    <Typography {...args} />
                </Page>
            </Document>
        </PDFViewer>
    );
};

export const Text = Template.bind({});

Text.argTypes = {
    textStylePreset: {
        control: {
            type: "select",
            options: ["none", "h1", "h2", "h3", "h4", "h5", "h6"],
        },
    },
    textAlign: {
        control: {
            type: "select",
            options: ["left", "center", "right"],
        },
    },
};
Text.args = {
    text: "test",
    textAlign: "left",
    textStylePreset: "none",
    textStyle: {
        fontSize: 13,
        color: "red",
    },
};

export const Default = Template.bind({});

Default.argTypes = {
    textStylePreset: {
        control: {
            type: "select",
            options: ["none", "h1", "h2", "h3", "h4", "h5", "h6"],
        },
    },
    textAlign: {
        control: {
            type: "select",
            options: ["left", "center", "right"],
        },
    },
};
Default.args = {
    // text
    text: "test",
    textStylePreset: "none",
    textAlign: "left",
    textStyle: {
        fontFamily: "MalgunGothic",
        fontSize: 16,
        textAlign: "left",
    },

    // container
    containerStyle: {
        display: "flex",
        backgroundColor: "#cccccc",
    },
};

export const Debug = Template.bind({});
