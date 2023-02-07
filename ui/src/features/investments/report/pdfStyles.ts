import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  pageContent: {
    backgroundColor: "#FFF",
    paddingHorizontal: 40,
    marginVertical: 20,
    position: "relative",
    height: "80%",
  },
  detailsSection: {
    paddingVertical: 10,
  },
  smallSection: {
    paddingVertical: 10,
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
});

export const textStyles = StyleSheet.create({
  body: {
    fontSize: 10,
    marginBottom: 5,
    lineHeight: 1.2,
  },
  subheading: {
    fontSize: 14,
    color: "#05016D",
    paddingBottom: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    textDecoration: "underline",
  },
});

export const headerStyles = StyleSheet.create({
  headerArea: {
    backgroundColor: "#14022c",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  image: {
    width: 100,
  },
});

export const footerStyles = StyleSheet.create({
  footerSection: {
    position: "absolute",
    bottom: 0,
    left: 40,
  },
  number: {
    fontSize: 13,
  },
});
