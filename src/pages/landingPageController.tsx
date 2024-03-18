import { Component } from "react";

interface props {
  navigation: any;
}

export interface FlightData {
  id: number;
  gate: string;
  price: number;
  origin: string;
  airline: string;
  aircraft: string;
  duration: string;
  arrivalTime: string;
  destination: string;
  flightNumber: string;
  departureTime: string;
  seatsAvailable: number;
}

interface state {
  slot: string;
  error: string;
  filtersText: string;
  filterModal: boolean;
  sortModal: boolean;
  detailsModal: boolean;
  sortText: string;
  flights: FlightData[];
  filteredFlights: FlightData[];
  origin: string;
  destination: string;
  dataLoading: boolean;
  uniqueAirlines: any[];
  singleItem: any;
}

export default class LandingPageController extends Component<props, state> {
  constructor(props: any) {
    super(props);
    this.state = {
      slot: "",
      error: "",
      filtersText: "",
      filterModal: false,
      sortModal: false,
      detailsModal: false,
      sortText: "",
      flights: [],
      filteredFlights: [],
      origin: props.route ? props.route.params.origin : "",
      destination: props.route ? props.route.params.destination : "",
      dataLoading: false,
      uniqueAirlines: [],
      singleItem: null,
    };
  }

  componentDidMount() {
    this.getFlightsData();
  }
  getFlightsData = () => {
    this.setState({ dataLoading: true });
    fetch("https://api.npoint.io/378e02e8e732bb1ac55b")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ flights: data });
        this.setState({ dataLoading: false });
        this.filterFlights(this.state.origin, this.state.destination);
        this.extractUniqueAirlines();
      })
      .catch((error) => {
        console.error("Error fetching flight data:", error);
      });
  };

  filterFlights = (origin: string, destination: string) => {
    if (origin === "" || destination === "") {
      this.setState({ filteredFlights: this.state.flights });
    } else {
      const { flights } = this.state;
      const filteredFlights = flights.filter(
        (flight) =>
          flight.origin === origin && flight.destination === destination
      );
      this.setState({ filteredFlights });
    }
  };
  extractUniqueAirlines = () => {
    const airlinesSet = new Set();
    this.state.flights.forEach((flight) => airlinesSet.add(flight.airline));
    const uniqueAirlines = Array.from(airlinesSet);
    this.setState({ uniqueAirlines });
  };
  sortFlightsByPrice = (sortOrder: string) => {
    const { filteredFlights } = this.state;
    const sortedFlights = [...filteredFlights];
    sortedFlights.sort((a, b) => {
      if (sortOrder === "low") {
        return a.price - b.price;
      } else if (sortOrder === "high") {
        return b.price - a.price;
      }
      return 0;
    });
    this.setState({ filteredFlights: sortedFlights });
  };

  filterFlightsByAirline = (airlineName: string) => {
    const { flights } = this.state;
    const filteredFlights = flights.filter(
      (flight) => flight.airline === airlineName
    );
    this.setState({ filteredFlights: filteredFlights });
  };

  openFilterModal = () => {
    this.setState({ filterModal: !this.state.filterModal });
  };

  openSortModal = () => {
    this.setState({ sortModal: !this.state.sortModal });
  };
  openDetailsModal = () => {
    this.setState({ detailsModal: !this.state.detailsModal });
  };

  setSingleItem = (item: any) => {
    this.setState({ singleItem: item });
  };

  selectSortOption = (text: string) => {
    this.setState({ sortText: text });
    this.sortFlightsByPrice(text);
  };

  selectFilterOption = (text: string) => {
    this.setState({ filtersText: text }, () => {
      this.filterFlightsByAirline(this.state.filtersText);
    });
  };
  clearFilters = () => {
    this.setState({
      sortText: "",
      filtersText: "",
      sortModal: false,
      filterModal: false,
    });

    this.getFlightsData();
  };
  goBack = () => {
    this.props.navigation.navigate("splashScreen");
  };
}
