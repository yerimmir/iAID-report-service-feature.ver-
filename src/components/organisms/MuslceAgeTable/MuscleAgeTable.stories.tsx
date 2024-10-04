import React from "react";
import { Document, Page, PDFViewer } from "@react-pdf/renderer";
import PDFStyle from "assets/PDFStyle";
import MuscleAgeTable from "./MuscleAgeTable";

export default {
  component: MuscleAgeTable,
  title: "organisms/MuslceAgeTable",
};

const Template = (args) => {
  return (
    <PDFViewer width={PDFStyle.viewer.width} height={PDFStyle.viewer.height}>
      <Document>
        <Page size={"A4"} style={PDFStyle.page}>
          <MuscleAgeTable {...args}></MuscleAgeTable>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export const MuscleAge = Template.bind({});

MuscleAge.args = {
  age: 20,
  muscleAge: 49,
};
