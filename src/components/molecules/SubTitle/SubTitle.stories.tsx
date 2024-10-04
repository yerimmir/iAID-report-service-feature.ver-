import React from "react";
import { Document, Page, PDFViewer } from "@react-pdf/renderer";
import PDFStyle from "assets/PDFStyle";

import SubTitle from "components/molecules/SubTitle/SubTitle";

export default {
    component: SubTitle,
    title: "molecules/SubTitle",
};

const Template = function (args) {
    return (
        <PDFViewer
            width={PDFStyle.viewer.width}
            height={PDFStyle.viewer.height}
        >
            <Document>
                <Page size={"A4"} style={PDFStyle.page}>
                    <SubTitle {...args} />
                </Page>
            </Document>
        </PDFViewer>
    );
};

export const Default = Template.bind({});
Default.args = {
    title: "표준 참고자료",
};

export const Debug = Template.bind({});
