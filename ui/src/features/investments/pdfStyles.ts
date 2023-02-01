import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  homePage: {
    flexDirection: "row",
    backgroundColor: "#FFF",
  },
  page: {
    backgroundColor: "#FFF",
    margin: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    width: "100%",
  },
  tableSection: {
    marginTop: 10,
    marginBottom: 10,
    width: "100%",
    flexGrow: 1,
  },
  tableRow: {
    display: "flex",
    flexDirection: "row",
    borderWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderStyle: "solid",
    borderColor: "#bfbfbf",
    marginLeft: 10,
    marginRight: 10,
    width: "90%",
    justifyContent: "space-between",
  },
  bodyCell: {
    display: "flex",
    width: "40%",
    fontSize: 10,
  },
  smallBodyCell: {
    display: "flex",
    width: "60%",
    fontSize: 8,
  },
  idText: {
    fontSize: 10,
  },
  titleText: {
    fontSize: 20,
  },
});
