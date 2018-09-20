import React, { Component } from "react";

class Canvas extends Component {
    constructor() {
        super();
        this.state = {
            drawing: false,
            current: {
                x: null,
                y: null,
                color: 'black'
            },
            canvas: null,
            context: null
        };
    }

    componentDidMount() {
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

        this.setState({
            canvas: canvas,
            context: context
        })
    }

    drawLine = (x0, y0, x1, y1, color, emit) => {
        const {canvas, context} = this.state;
        context.beginPath();
        context.moveTo(x0, y0);
        context.lineTo(x1, y1);
        context.strokeStyle = this.props.color.hex;
        context.lineWidth = 2;
        context.stroke();
        context.closePath();
    
        if (!emit) { return; }
        var w = canvas.width;
        var h = canvas.height;
    
        // socket.emit('drawing', {
        //   x0: x0 / w,
        //   y0: y0 / h,
        //   x1: x1 / w,
        //   y1: y1 / h,
        //   color: color
        // });
      }

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

        this.drawLine(
            current.x,
            current.y,
            e.offsetX,
            e.offsetY,
            current.color,
            true
        );
    };

    onMouseMove = e => {
        const { drawing, current } = this.state;
        if (!drawing) {
            return;
        }
        this.drawLine(
            current.x,
            current.y,
            e.offsetX,
            e.offsetY,
            current.color,
            true
        );
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
            <div>
                <canvas ref="canvas" width={640} height={425} />
            </div>
        );
    }
}
export default Canvas;
