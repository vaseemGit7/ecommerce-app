import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({});

const Invoice = () => {
  return (
    <Document>
      <Page size="A4">
        <View>
          <Text>Test</Text>
        </View>
      </Page>
    </Document>
  );
};

export default Invoice;
