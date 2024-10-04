import React from "react";
import { Document, Page, PDFViewer } from "@react-pdf/renderer";
import PDFStyle from "../../assets/PDFStyle";

import { Report } from "components/pages/Report";
import { DefaultLabelDetail } from "models/label";

export default {
    component: Report,
    title: "pages/Report",
};

const Template = function (args) {
    return (
        <PDFViewer
            width={PDFStyle.viewer.width}
            height={PDFStyle.viewer.height}
        >
            <Document>
                <Page size={"A4"} style={PDFStyle.page}>
                    <Report {...args} />
                </Page>
            </Document>
        </PDFViewer>
    );
};

export const Default = Template.bind({});
Default.args = {
    title: "Body-inside",
    personalInfo: {
        name: "홍길동",
        age: 36,
        gender: "M",
        height: 180,
        weight: 70,
    },
    sarcopenia: {
        target: "abdomen",
        diagnosis: {
            targetSliceLevel: 1,
            measurement: {
                muscle: {
                    value: 182.1,
                    unit: "cm²",
                    image: "",
                },
                visceralFat: {
                    value: 103.6,
                    unit: "cm²",
                    image: "",
                },
                subcutaneousFat: {
                    value: 57.64,
                    unit: "cm²",
                    image: "",
                },
            },
            statisticalAnalysis: {
                type: "sma_height2",
                tscore: 39.8,
                value: 40.5,
                result: "normal",
            },
        },
    },
};
