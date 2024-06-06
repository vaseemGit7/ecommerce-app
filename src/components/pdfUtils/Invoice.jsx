import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import storageManager from "../../utils/storageManager";

const styles = StyleSheet.create({
  page: {
    padding: "10px",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    padding: "10px",
  },
  headerSection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dateSection: {
    display: "flex",
    flexDirection: "row",
    gap: "3px",
    fontSize: "14px",
  },
  dateText: {
    fontSize: "14px",
    fontWeight: "normal",
  },
  titleText: {
    fontSize: "24px",
    fontWeight: "bold",
  },
  smallText: {
    fontSize: "10px",
  },
  heading: {
    width: "100%",
    backgroundColor: "#e5e7eb",
    padding: "5px",
    textAlign: "center",
    border: "2px 0px",
    borderStyle: "solid",
    borderColor: "#262626",
  },
  headingText: {
    fontSize: "14px",
    fontWeight: "bold",
  },
  addressTitle: {
    fontSize: "14px",
    fontWeight: "semibold",
    marginBottom: "6px",
  },
  addressSection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "10px",
  },
  addressDetails: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  orderSummarySection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  productDetailsColumn: {
    display: "flex",
    flexDirection: "col",
    gap: "5px",
  },
  itemLabel: {
    fontSize: "10px",
    fontWeight: "ultrabold",
  },
  dividerLine: {
    width: "100%",
    borderTop: "1px",
    borderStyle: "solid",
    borderColor: "#a3a3a3",
  },
  totalSection: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  totalDetails: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: "10px",
  },
  totalRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: "10px",
  },
  footerSection: {
    width: "100%",
    justifyContent: "flex-end",
    marginBottom: "10px",
  },
  gratitudeText: {
    textAlign: "center",
    fontSize: "14px",
    fontWeight: "bold",
  },
});

const ProductItem = ({ orderDetails, itemName, itemValue }) => {
  return (
    <View style={styles.productDetailsColumn}>
      <Text style={styles.itemLabel}>{itemName}</Text>
      {orderDetails.map((product) => (
        <Text style={styles.smallText} key={product.id}>
          {itemName === "UNIT PRICE"
            ? `Rs. ${product.price}`
            : itemName === "TOTAL PRICE"
            ? `Rs. ${product.price * product.quantity}`
            : product[itemValue]}
        </Text>
      ))}
    </View>
  );
};

const Invoice = ({
  userData,
  orderDetails,
  deliveryCharge,
  totalPrice,
  formattedDate,
  invoiceNo,
}) => {
  const database = storageManager.loadFromLocalStorage("usersDb");
  const userDB = database.find((user) => user.id === userData.id);
  const userDetails = userDB.userDetails;
  const userAddress = userDetails.addresses[0];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.content}>
          <View style={styles.headerSection}>
            <Text style={styles.titleText}>AppName</Text>
            <Text style={styles.titleText}>Invoice</Text>
          </View>
          <View style={styles.headerSection}>
            <View style={styles.dateSection}>
              <Text style={styles.dateText}>Invoice No.</Text>
              <Text style={styles.dateText}>{invoiceNo}</Text>
            </View>
            <Text style={styles.dateText}>{formattedDate}</Text>
          </View>
          <View style={styles.heading}>
            <Text style={styles.headingText}>ADDRESSES</Text>
          </View>
          <View style={styles.addressSection}>
            <View style={styles.addressDetails}>
              <Text style={styles.addressTitle}>Delivery Address</Text>
              <Text style={styles.smallText}>{userDetails.fullName},</Text>
              <Text style={styles.smallText}>{userDetails.phoneNumber},</Text>
              <Text style={styles.smallText}>{userAddress.flatAddress},</Text>
              <Text style={styles.smallText}>{userAddress.streetAddress},</Text>
              <Text style={styles.smallText}>{userAddress.town},</Text>
              <Text style={styles.smallText}>{userAddress.state},</Text>
              <Text style={styles.smallText}>{userAddress.pincode}.</Text>
            </View>
            <View style={styles.addressDetails}>
              <Text style={styles.addressTitle}>Shipped By</Text>
              <Text style={styles.smallText}>Lorem Ipsum,</Text>
              <Text style={styles.smallText}>9876543210,</Text>
              <Text style={styles.smallText}>No.341/B,</Text>
              <Text style={styles.smallText}>
                Duis aute irure dolor, Excepteur,
              </Text>
              <Text style={styles.smallText}>Viverra,</Text>
              <Text style={styles.smallText}>Aliquet,</Text>
              <Text style={styles.smallText}>600006.</Text>
            </View>
          </View>
          <View style={styles.heading}>
            <Text style={styles.headingText}>ORDER SUMMARY</Text>
          </View>
          <View style={styles.orderSummarySection}>
            <ProductItem
              orderDetails={orderDetails}
              itemName={"ART.NO."}
              itemValue={"id"}
            />
            <ProductItem
              orderDetails={orderDetails}
              itemName={"DESC."}
              itemValue={"name"}
            />
            <ProductItem
              orderDetails={orderDetails}
              itemName={"SIZE"}
              itemValue={"size"}
            />
            <ProductItem
              orderDetails={orderDetails}
              itemName={"COLOR"}
              itemValue={"color"}
            />
            <ProductItem
              orderDetails={orderDetails}
              itemName={"QTY."}
              itemValue={"quantity"}
            />
            <ProductItem
              orderDetails={orderDetails}
              itemName={"UNIT PRICE"}
              itemValue={"price"}
            />
            <ProductItem orderDetails={orderDetails} itemName={"TOTAL PRICE"} />
          </View>
          <View style={styles.dividerLine}></View>
          <View style={styles.totalSection}>
            <View style={styles.totalDetails}>
              <View style={styles.totalRow}>
                <Text style={styles.smallText}>PRODUCTS TOTAL:</Text>
                <Text style={styles.smallText}>Rs. {totalPrice}</Text>
              </View>
              <View style={styles.totalRow}>
                <Text style={styles.smallText}>DELIVERY:</Text>
                <Text style={styles.smallText}>
                  {deliveryCharge === 0 ? "Free" : `Rs. ${deliveryCharge}`}
                </Text>
              </View>
              <View style={styles.totalRow}>
                <Text>TOTAL:</Text>
                <Text>Rs. {totalPrice}</Text>
              </View>
            </View>
          </View>
          <View style={styles.footerSection}>
            <Text style={styles.gratitudeText}>
              Thank You for your purchase!
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default Invoice;
