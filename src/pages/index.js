import React, { Component } from "react";
import io from "../../node_modules/socket.io-client";
import YouTube from "react-youtube";
import { ChromePicker } from "react-color";
import Canvas from "../components/canvas";

class App extends Component {
    constructor() {
        super();
        this.state = {
            endpoint: "https://boro-pazoon-server.glitch.me/",
            videoData: {
                timestamp: null,
                id: null
            }
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

        socket.on("video data", data => {
            console.log(data);
            this.setState({
                videoData: data
            });
        });
    }

    render() {
        const opts = {
            height: "390",
            width: "640",
            playerVars: {
                autoplay: 1,
                controls: 0,
                start: this.state.videoData.timestamp,
                enablejsapi: true,
                showinfo: 0
            }
        };

        return (
            <div>
                <YouTube
                    videoId={this.state.videoData.id}
                    opts={opts}
                    onReady={this._onReady}
                />
                <ChromePicker />
                <Canvas />
            </div>
        );
    }
}

export default App;
