import React, { Component } from "react";
import io from "../../node_modules/socket.io-client";
import YouTube from "react-youtube";
import SPSHeader from "../components/header";
import { ChromePicker } from "react-color";
import "../styles/styles.css";
import Canvas from "../components/canvas";

class App extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: "https://boro-pazoon-server.glitch.me/",
      videoData: {
        timestamp: null,
        id: null
      },
      color: {
        hex: null
      }
    };
  }

  componentDidMount() {
    const { endpoint } = this.state;
    const socket = io(endpoint);

    socket.emit("add user", "Bob Ross (" + Date.now() + ")");

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

  handleColorChange = (color, event) => {
    this.setState({
      color: color
    });
  };

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
      <div className="sps-page sps-page--full-width">
        <div className="sps-body sps-body--collapse-550">
          <aside class="sps-body__sidebar sps-body__sidebar--400">
            <SPSHeader />
            <div className="sps-card">
              <div class="sps-card__header">
                <h4 class="sps-card__title">
                  <i class="sps-icon sps-icon-heart" aria-hidden="true" />
                  Bob Vision
                </h4>
              </div>
              <div className="sps-card__body">
                <YouTube
                  videoId={this.state.videoData.id}
                  opts={opts}
                  onReady={this._onReady}
                />
              </div>
            </div>
            <ChromePicker
              color={this.state.color}
              onChange={this.handleColorChange}
            />
          </aside>
          <section class="sps-main-content sps-column-layout">
            <Canvas />
          </section>
        </div>
      </div>
    );
  }
}

export default App;
