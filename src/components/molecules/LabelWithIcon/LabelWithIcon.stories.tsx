import React from "react";
import { Document, Page, PDFViewer, Svg, Path } from "@react-pdf/renderer";
import PDFStyle from "assets/PDFStyle";

import LabelWithIcon from "components/molecules/LabelWithIcon/LabelWithIcon";

export default {
    component: LabelWithIcon,
    title: "molecules/LabelWithIcon",
};

const Template = function (args) {
    return (
        <PDFViewer
            width={PDFStyle.viewer.width}
            height={PDFStyle.viewer.height}
        >
            <Document>
                <Page size={"A4"} style={PDFStyle.page}>
                    <LabelWithIcon {...args} />
                </Page>
            </Document>
        </PDFViewer>
    );
};

export const Default = Template.bind({});
Default.argTypes = {
    iconName: {
        control: {
            type: "select",
            options: ["arrowUp"],
        },
    },
    labelAlign: {
        control: {
            type: "select",
            options: ["left", "center", "right"],
        },
    },
};
Default.args = {
    // label
    label: "text",
    labelAlign: "left",

    // icon
    iconName: "arrowUp",

    // container
    containerStyle: {
        width: "100px",
    },
};

export const Debug = Template.bind({});
Debug.args = {
    containerStyle: {
        width: "100px",
    },
};
