import React from "react";
import { Document, Page, PDFViewer } from "@react-pdf/renderer";
import PDFStyle from "assets/PDFStyle";
import SarcopeniaTable from "components/organisms/SarcopeniaTable/SarcopeniaTable";

export default {
    component: SarcopeniaTable,
    title: "organisms/SarcopeniaTable",
};

const Template = function (args) {
    return (
        <PDFViewer
            width={PDFStyle.viewer.width}
            height={PDFStyle.viewer.height}
        >
            <Document>
                <Page size={"A4"} style={PDFStyle.page}>
                    <SarcopeniaTable {...args} />
                </Page>
            </Document>
        </PDFViewer>
    );
};

export const Default = Template.bind({});
Default.args = {};
