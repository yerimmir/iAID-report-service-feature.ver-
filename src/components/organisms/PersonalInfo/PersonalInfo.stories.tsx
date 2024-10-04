import React from "react";
import { Document, Page, PDFViewer } from "@react-pdf/renderer";
import PDFStyle from "assets/PDFStyle";
import PersonalInfo from "components/organisms/PersonalInfo/PersonalInfo";
import { GenderType } from "models/personalInfo";

export default {
  component: PersonalInfo,
  title: "organisms/PersonalInfo",
};

const Template = function (args) {
  return (
    <PDFViewer width={PDFStyle.viewer.width} height={PDFStyle.viewer.height}>
      <Document>
        <Page size={"A4"} style={PDFStyle.page}>
          <PersonalInfo {...args} />
        </Page>
      </Document>
    </PDFViewer>
  );
};

export const Default = Template.bind({});
Default.args = {
  date: { attr: "측정일시", value: "2020.12.01(화)" },
  personalInfo: {
    name: "홍길동",
    age: 36,
    gender: GenderType.M,
    height: 0,
  },
};

export const Debug = Template.bind({});
