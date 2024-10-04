import React from "react";
import { Document, Page, PDFViewer } from "@react-pdf/renderer";
import PDFStyle from "assets/PDFStyle";
import Description from "components/molecules/Description/Description";

export default {
    component: Description,
    title: "molecules/Description",
};

const Template = function (args) {
    return (
        <PDFViewer
            width={PDFStyle.viewer.width}
            height={PDFStyle.viewer.height}
        >
            <Document>
                <Page size={"A4"} style={PDFStyle.page}>
                    <Description {...args} />
                </Page>
            </Document>
        </PDFViewer>
    );
};

export const Default = Template.bind({});
Default.args = {
    text: "복부의 근육 면적은 182.1cm²으로, 근육양이 매우 훌륭합니다. 붉은색은 순수 근육, 노랑색과 파란색은 근육 내 포함된 지방으로, 근육 내 지방이 적은 매우 좋은 질의 근육을 보유하고 있습니다",
};

export const Debug = Template.bind({});
