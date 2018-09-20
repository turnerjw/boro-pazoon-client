import React, { Component } from "react";

class Canvas extends Component {
    constructor() {
        super();
        this.state = {
            drawing: false,
            current: {
                x: null,
                y: null
            }
        };
    }

    componentDidMount() {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext("2d");
        ctx.font = "40px Courier";
        ctx.fillText("Test Text", 210, 75);

        canvas.addEventListener("mousedown", this.onMouseDown, false);
        canvas.addEventListener("mouseup", this.onMouseUp, false);
        canvas.addEventListener('mouseout', this.onMouseUp, false);
        canvas.addEventListener('mousemove', throttle(this.onMouseMove, 10), false);
    }

    onMouseDown = e => {
        this.setState({
            drawing: true,
            current: {
                x: e.clientX,
                y: e.clientY
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

        // drawLine(
        //     current.x,
        //     current.y,
        //     e.clientX,
        //     e.clientY,
        //     current.color,
        //     true
        // );
    };

    onMouseMove = e => {
        const { drawing } = this.state;
        if (!drawing) {
            return;
        }
        // drawLine(
        //     current.x,
        //     current.y,
        //     e.clientX,
        //     e.clientY,
        //     current.color,
        //     true
        // );
        this.setState({
            current: {
                x: e.clientX,
                y: e.clientY
            }
        });
    };

    render() {
        return (
            <div>
                <canvas ref="canvas" width={640} height={425} />
            </div>
        );
    }
}
export default Canvas;
