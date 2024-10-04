import { StyleSheet } from "@react-pdf/renderer";

const PDFStyle = StyleSheet.create({
  viewer: {
    width: "100%",
    height: "1150px",
  },
  page: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

export default PDFStyle;
