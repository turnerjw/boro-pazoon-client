import React, { Component } from "react";

class Canvas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drawing: false,
            current: {
                x: null,
                y: null,
                color: "black"
            },
            canvas: null,
            context: null,
            socket: this.props.socket
        };
    }

    componentDidMount() {
        const { socket } = this.state;
        const canvas = this.refs.canvas;
        const context = canvas.getContext("2d");
        context.font = "40px Courier";
        context.fillText("Test Text", 210, 75);

        canvas.addEventListener("mousedown", this.onMouseDown, false);
        canvas.addEventListener("mouseup", this.onMouseUp, false);
        canvas.addEventListener("mouseout", this.onMouseUp, false);
        canvas.addEventListener(
            "mousemove",
            this.throttle(this.onMouseMove, 10),
            false
        );

        // this.props.socket.on("drawing", data =>{
        //     console.log(data);
        //     this.drawLine(data.x0, data.y0, data.x1, data.y1, false);
        // })

        this.setState({
            canvas: canvas,
            context: context,
            socket: socket
        });
    }

    drawLine = (x0, y0, x1, y1, emit) => {
        const { context, socket } = this.state;
        //const {color} = this.props.color;
        context.beginPath();
        context.moveTo(x0, y0);
        context.lineTo(x1, y1);
        context.strokeStyle = this.props.color.hex;
        context.lineWidth = 2;
        context.stroke();
        context.closePath();

        if (!emit) {
            return;
        }

        this.props.socket.emit("drawing", {
            x0: x0,
            y0: y0,
            x1: x1,
            y1: y1,
            color: this.props.color
        });
    };

    onMouseDown = e => {
        this.setState({
            drawing: true,
            current: {
                x: e.offsetX,
                y: e.offsetY
            }
        });
    };

    onMouseUp = e => {
        const { drawing, current } = this.state;
        if (!drawing) {
            return;
        }

        this.setState({
            drawing: false
        });

        this.drawLine(current.x, current.y, e.offsetX, e.offsetY, true);
    };

    onMouseMove = e => {
        const { drawing, current } = this.state;
        if (!drawing) {
            return;
        }
        this.drawLine(current.x, current.y, e.offsetX, e.offsetY, true);
        this.setState({
            current: {
                x: e.offsetX,
                y: e.offsetY
            }
        });
    };

    // limit the number of events per second
    throttle = (callback, delay) => {
        var previousCall = new Date().getTime();
        return function() {
            var time = new Date().getTime();

            if (time - previousCall >= delay) {
                previousCall = time;
                callback.apply(null, arguments);
            }
        };
    };

    render() {
        return (
            <div className="sps-card">
                <div className="sps-card__header">
                    <h4 className="sps-card__title">
                        <i
                            className="sps-icon sps-icon-hat"
                            aria-hidden="true"
                        />
                        Little Community Canvas
                    </h4>
                </div>
                <div className="sps-card__body">
                    <canvas ref="canvas" width={400} height={400} />
                </div>
            </div>
        );
    }
}
export default Canvas;