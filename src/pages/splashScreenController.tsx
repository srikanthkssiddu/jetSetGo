import { Component } from "react";

interface props {
  navigation: any;
}

interface state {
  slot: string;
  error: string;
  origin: string,
      destination: string
}

export default class SplashScreenController extends Component<props, state> {
  constructor(props: any) {
    super(props);
    this.state = {
      slot: "",
      error: "",
      origin: "",
      destination: ""
    };
  }


  onGetStarted = () => {
    this.props.navigation.navigate("landingPage",{origin:this.state.origin,destination:this.state.destination});
};

getAllResults = () => {
    this.props.navigation.navigate("landingPage",{origin:"",destination:""});
};

}
