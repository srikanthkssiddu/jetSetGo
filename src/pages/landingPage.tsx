import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  SafeAreaView,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  Platform,
  Image,
  TouchableWithoutFeedback,
  Modal,
  FlatList,
  ActivityIndicator,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import LandingPageController, { FlightData } from "./landingPageController";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export default class LandingPage extends LandingPageController {
  renderEachItem = ({ item }: { item: FlightData }) => {
    return (
      <View style={styles.eachItemView}>
        <View style={styles.sectionOne}>
          <View style={styles.subSectionOne}>
            <FontAwesome name="plane" size={20} style={styles.planeIcon} />
            <Text style={styles.airLineTitle}>{item.airline}</Text>
          </View>
          <View style={styles.subSectionTwo}>
            <Text style={styles.airLineModel}>Price - {item.price} Rs</Text>
          </View>
        </View>
        <View style={styles.sectionTwo}>
          <View style={styles.partOne}>
            <Text style={styles.travelTimeText}>
              {item.departureTime.slice(11, 16)}
            </Text>
            <Text style={styles.travelCityText}>{item.origin}</Text>
          </View>
          <View style={styles.partTwo}>
            <Text style={styles.totalTravelTimeText}>{item.duration}</Text>
            <View style={styles.travelHours}>
              <View style={styles.horLine} />
              <Image
                source={require("../../assets/planeIcon.jpeg")}
                style={styles.flightIcon}
              />
              <View style={styles.horLine} />
            </View>
          </View>
          <View style={styles.partThree}>
            <Text style={styles.travelTimeText}>
              {item.arrivalTime.slice(11, 16)}
            </Text>
            <Text style={styles.travelCityText}>{item.destination}</Text>
          </View>
        </View>
        <View style={styles.sectionThree}>
          <TouchableOpacity
            style={styles.ViewDetails}
            onPress={() => {
              this.openDetailsModal(), this.setSingleItem(item);
            }}
          >
            <Text style={styles.ViewDetailsText}>View Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  renderFlightsData = () => {
    return (
      <>
        <View style={styles.topSection}>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={this.openFilterModal}
          >
            <Text style={styles.sortButtonText}>Filter</Text>
            <FontAwesome name="filter" size={18} color="#800000" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sortButton}
            onPress={this.openSortModal}
          >
            <Text style={styles.sortButtonText}>Sort</Text>
            <MaterialCommunityIcons name="sort" size={18} color="#800000" />
          </TouchableOpacity>
        </View>
        <View style={styles.flightsView}>
          <FlatList
            data={this.state.filteredFlights}
            renderItem={this.renderEachItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </>
    );
  };

  renderByAirline = (item: any) => {
    const filtersText = this.state.filtersText;
    return (
      <TouchableOpacity
        onPress={() => this.selectFilterOption(item)}
        testID="new"
        style={styles.sortModalButton}
      >
        <Text
          style={{
            marginLeft: 10,
            fontWeight: "500",
            fontSize: 13,
            color: filtersText === item ? "#78716C" : "#292524",
          }}
        >
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  renderDetailsModal = () => {
    const item = this.state.singleItem;
    if (!item) {
      return null;
    }
    return (
      <Modal visible={this.state.detailsModal} transparent={true}>
        <TouchableWithoutFeedback onPress={() => this.openDetailsModal()}>
          <View style={styles.sortModalViewOne1}>
            <View style={styles.eachItemView1}>
              <View style={styles.sectionOne}>
                <View style={styles.subSectionOne}>
                  <FontAwesome
                    name="plane"
                    size={20}
                    style={styles.planeIcon}
                  />
                  <Text style={styles.airLineTitle}>{item.airline}</Text>
                </View>
                <View style={styles.subSectionTwo}>
                  <Text style={styles.airLineModel}>
                    Price - {item.price} Rs
                  </Text>
                </View>
              </View>
              <View style={styles.sectionTwo}>
                <View style={styles.partOne}>
                  <Text style={styles.travelTimeText}>
                    {item.departureTime.slice(11, 16)}
                  </Text>
                  <Text style={styles.travelCityText}>{item.origin}</Text>
                </View>
                <View style={styles.partTwo}>
                  <Text style={styles.totalTravelTimeText}>
                    {item.duration}
                  </Text>
                  <View style={styles.travelHours}>
                    <View style={styles.horLine} />
                    <Image
                      source={require("../../assets/planeIcon.jpeg")}
                      style={styles.flightIcon}
                    />
                    <View style={styles.horLine} />
                  </View>
                </View>
                <View style={styles.partThree}>
                  <Text style={styles.travelTimeText}>
                    {item.arrivalTime.slice(11, 16)}
                  </Text>
                  <Text style={styles.travelCityText}>{item.destination}</Text>
                </View>
              </View>
              <View>
                <View style={styles.extraDetailsView}>
                  <Text style={styles.leftText}>Seats avaiable :</Text>
                  <Text style={styles.rightText}>-{item.seatsAvailable}</Text>
                </View>
                <View style={styles.extraDetailsView}>
                  <Text style={styles.leftText}>AirCraft :</Text>
                  <Text style={styles.rightText}>-{item.aircraft}</Text>
                </View>
                <View style={styles.extraDetailsView}>
                  <Text style={styles.leftText}>Flight number :</Text>
                  <Text style={styles.rightText}>-{item.flightNumber}</Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };

  render() {
    const SortText = this.state.sortText;
    const loadingState = this.state.dataLoading;
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar animated={true} />
        <View style={styles.header}>
          <TouchableOpacity onPress={this.goBack}>
            <AntDesign
              name="left"
              size={18}
              color="#ffffff"
              style={styles.bellIcon}
            />
          </TouchableOpacity>

          <Text style={styles.appTitle}>jetSetGo</Text>
          <FontAwesome5
            name="bell"
            size={18}
            color="#ffffff"
            style={styles.bellIcon}
          />
        </View>

        {loadingState && (
          <View style={styles.emptyScreen}>
            <Text style={styles.emptyScreenText}>Fetching your results...</Text>
            <ActivityIndicator color="#800000" />
          </View>
        )}

        {!loadingState && this.state.filteredFlights.length > 0 && (
          <View>{this.renderFlightsData()}</View>
        )}

        {!loadingState && this.state.filteredFlights.length === 0 && (
          <View style={styles.emptyScreen}>
            <Text style={styles.emptyScreenText}>No flights available</Text>
          </View>
        )}

        <Modal visible={this.state.filterModal} transparent={true}>
          <TouchableWithoutFeedback onPress={this.openFilterModal}>
            <View style={styles.sortModalViewOne}>
              <View style={styles.filterModalViewTwo}>
                <Text style={styles.airLineModel}>By Airline</Text>
                <FlatList
                  data={this.state.uniqueAirlines}
                  renderItem={({ item }) => this.renderByAirline(item)}
                  keyExtractor={(item, index) => index.toString()}
                />
                <TouchableOpacity
                  onPress={() => this.clearFilters()}
                  style={styles.sortModalButton}
                >
                  <Text
                    style={{
                      marginLeft: 5,
                      fontWeight: "700",
                      fontSize: 12,
                      marginBottom: -5,
                      color: "#808080",
                    }}
                  >
                    Clear filters
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        <Modal visible={this.state.sortModal} transparent={true}>
          <TouchableWithoutFeedback
            onPress={this.openSortModal}
            testID="editTwo"
          >
            <View style={styles.sortModalViewOne}>
              <View style={styles.sortModalViewTwo}>
                <Text style={styles.airLineModel}>Sort By Price</Text>
                <TouchableOpacity
                  onPress={() => this.selectSortOption("low")}
                  testID="new"
                  style={styles.sortModalButton}
                >
                  <MaterialCommunityIcons
                    name="slope-uphill"
                    size={20}
                    color={SortText === "low" ? "#78716C" : "#292524"}
                  />
                  <Text
                    style={{
                      marginLeft: 10,
                      fontWeight: "500",
                      fontSize: 13,
                      color: SortText === "low" ? "#78716C" : "#292524",
                    }}
                  >
                    Low to High
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.selectSortOption("high")}
                  style={styles.sortModalButton}
                >
                  <MaterialCommunityIcons
                    name="slope-downhill"
                    size={20}
                    color={SortText === "high" ? "#78716C" : "#292524"}
                  />
                  <Text
                    style={{
                      marginLeft: 10,
                      fontWeight: "500",
                      fontSize: 13,
                      color: SortText === "high" ? "#78716C" : "#292524",
                    }}
                  >
                    High to Low
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
        {this.renderDetailsModal()}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  flightsView: {
    height: "83%",
  },
  extraDetailsView: {
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    margin: 10,
  },
  leftText: {
    fontSize: 14,
    color: "#800000",
    fontWeight: "700",
  },
  rightText: {
    fontSize: 12,
    color: "#808080",
    fontWeight: "500",
  },
  emptyScreen: {
    backgroundColor: "#ffffff",
    width: "95%",
    height: "85%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    borderRadius: 15,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  emptyScreenText: {
    fontSize: 20,
    fontWeight: "500",
    color: "#800000",
  },
  header: {
    width: "95%",
    paddingHorizontal: 10,
    backgroundColor: "#800000",
    height: 90,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  bellIcon: {
    marginTop: 25,
  },
  appTitle: {
    fontWeight: "600",
    fontSize: 22,
    alignSelf: "center",
    marginTop: 20,
    color: "#ffffff",
  },

  flightIcon: {
    width: 32,
    height: 32,
    borderRadius: 15,
  },
  eachItemView: {
    backgroundColor: "#ffffff",
    width: "95%",
    alignSelf: "center",
    marginTop: 20,
    height: 165,
    borderRadius: 15,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  eachItemView1: {
    backgroundColor: "#ffffff",
    width: "95%",
    alignSelf: "center",
    marginTop: 20,
    borderWidth: 1,
    height: 225,
    borderRadius: 15,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  sectionOne: {
    height: 42.5,
    marginTop: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  subSectionOne: {
    width: "70%",
    flexDirection: "row",
  },
  subSectionTwo: {
    width: "30%",
    flexDirection: "row",
  },
  planeIcon: {
    marginLeft: 15,
  },
  airLineTitle: {
    fontSize: 14,
    marginLeft: 20,
    fontWeight: "600",
  },
  airLineModel: {
    fontSize: 12,
    fontWeight: "500",
    color: "#808080",
  },

  sectionTwo: {
    height: 70,
    marginTop: -5,
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  partOne: {
    width: "27.5%",
    margin: 2.5,
  },
  partTwo: {
    width: "40%",

    margin: 2.5,

    alignItems: "center",
    justifyContent: "center",
  },
  partThree: {
    width: "27.5%",
    margin: 2.5,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  horLine: {
    width: "30%",
    height: 2,
    backgroundColor: "#800000",
    margin: 5,
  },
  travelHours: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },
  sectionThree: {
    height: 45,
  },
  ViewDetails: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 5,
    backgroundColor: "#800000",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  ViewDetailsText: {
    fontSize: 15,
    color: "#ffffff",
    fontWeight: "500",
  },
  travelTimeText: {
    fontSize: 14,
    fontWeight: "400",
    color: "#a9a9a9",
  },
  travelCityText: {
    fontSize: 15,
    fontWeight: "900",
    color: "#292524",
  },
  totalTravelTimeText: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#808080",
  },
  topSection: {
    height: 50,
    width: "90%",
    marginVertical: 15,
    marginHorizontal: 15,

    flexDirection: "row",
  },
  filterButton: {
    flex: 1,
    marginHorizontal: 15,
    marginVertical: 7.5,
    borderColor: "#800000",
    borderWidth: 1.5,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  sortButtonText: {
    fontSize: 15,
    color: "#800000",
    fontWeight: "500",
    marginRight: 10,
  },
  sortButton: {
    flex: 1,
    marginHorizontal: 15,
    marginVertical: 7.5,
    borderColor: "#800000",
    borderWidth: 1.5,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  sortModalViewOne: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
  },
  sortModalViewOne1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  sortModalViewTwo: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "#F5F5F4",
    position: "relative",
    left: 90,
    bottom: 200,
  },
  sortModalButton: {
    flexDirection: "row",
    padding: 7.5,
    marginLeft: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  filterModalViewTwo: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "#F5F5F4",
    position: "relative",
    right: 80,
    bottom: 130,
    height: 245,
  },
});
