import React from "react";
import { Document, Page, PDFViewer } from "@react-pdf/renderer";
import PDFStyle from "PDFStyle";

import { TimeLineImage1 } from "assets/images";
import "assets/fonts";

import Timeline from "components/pages/Timeline/Timeline";
export default {
    component: Timeline,
    title: "pages/Timeline",
};

const Template = function (args) {
    return (
        <PDFViewer
            width={PDFStyle.viewer.width}
            height={PDFStyle.viewer.height}
        >
            <Document>
                <Page size={"A4"} style={PDFStyle.page}>
                    <Timeline {...args} />
                </Page>
            </Document>
        </PDFViewer>
    );
};

export const Default = Template.bind({});
Default.args = {
    // title
    title: "Time-line",
    timeLineData: [
        {
            date: "20230302",
            abdominalMuscles: 78.68,
            viseralFat: 59.37,
            subcutaneousFat: 131.35,
        },
        {
            date: "20230304",
            abdominalMuscles: 80,
            viseralFat: 60,
            subcutaneousFat: 131.35,
        },
        // {
        //     date: "2023.03.08",
        //     abdominalMuscles: 78.68,
        //     viseralFat: 59.37,
        //     subcutaneousFat: 131.35
        // },
        // {
        //     date: "2023.03.30",
        //     abdominalMuscles: 78.68,
        //     viseralFat: 59.37,
        //     subcutaneousFat: 131.35
        // },
        // {
        //     date: "2023.03.00",
        //     image: TimeLineImage1,
        //     abdominalMuscles: 78.68,
        //     viseralFat: 59.37,
        //     subcutaneousFat: 131.35
        // },
    ],
};

export const Debug = Template.bind({});
