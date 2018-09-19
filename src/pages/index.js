import React, { Component } from "react";
import io from "../../node_modules/socket.io-client";

class App extends Component {
    constructor() {
        super();
        this.state = {
            endpoint: "https://boro-pazoon-server.glitch.me/"
        };
    }

    componentDidMount() {
        const { endpoint } = this.state;
        const socket = io(endpoint);

        socket.emit("add user", "Bob Ross");

        socket.on("user joined", data => {
            console.log(data);
        });

        socket.on("user left", data => {
            console.log(data);
        });
    }

    render() {
        return <div>Hello world!</div>;
    }
}

export default App;
