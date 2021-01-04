import React from 'react';
import mqtt from 'mqtt';

class Slider extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };
    }
    handleChange = (event) => {
        this.setState({ value: event.target.value });
    }
    render() {
        return <input className="test" type="range" min={this.props.min} max={this.props.max} value={this.state.value} onChange={this.handleChange} />;
    }
    componentDidUpdate() {

    }
}

class Button extends React.Component {
    constructor(props) {
        super(props);
        this.state = { date: new Date() };
    }
    componentDidMount() { }
    componentWillUnmount() { }
    render() { return <button onClick={this.props.onClick}>{this.props.label}</button>; }
}

class LightControl extends React.Component {
    constructor(props) {
        super(props)
        let client = mqtt.connect('ws://' + props.host + ':' + props.port)
        // client.on('connect', function () {
        //     client.subscribe('presence', function (err) {
        //         if (!err) {
        //             client.publish('presence', 'Hello mqtt')
        //         }
        //     })
        // })
        // client.on('message', function (topic, message) {
        //     console.log(message.toString())
        // })
        this.client = client
        this.sendOn = this.sendOn.bind(this)
        this.sendOff = this.sendOff.bind(this)
    }
    sendOn() {
        this.client.publish("control/wohnzimmer/licht/licht", "led(511, 1023, 0, 128)")
    }
    sendOff() {
        this.client.publish("control/wohnzimmer/licht/licht", "led(0, 0, 0, 0)")
    }
    render() {
        return <div >
            <Button label="An" onClick={this.sendOn} />
            <Button label="Aus" onClick={this.sendOff} />
            <Slider />
        </div >
    }
}

export default LightControl;
