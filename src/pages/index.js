import React, { Component } from "react";
import io from "../../node_modules/socket.io-client";

class App extends Component {
    constructor() {
        super();
        this.state = {
            endpoint: "https://boro-pazoon-server-kvcqxgohop.now.sh"
        };
    }

    componentDidMount() {
        const { endpoint } = this.state;
        const socket = io(endpoint);
    }

    render() {
        return <div>Hello world!</div>;
    }
}

export default App;
