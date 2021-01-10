import React from 'react';
import mqtt from 'mqtt';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert';

class LightControl extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            connected: false,
            // TODO: ask for current state over mqtt
            light: {
                red: Number(props.max_value) / 2,
                green: Number(props.max_value),
                blue: 0,
                white: Number(props.max_value) / 4,
                intensity: 0.0,
            }
        }
        let client = mqtt.connect('ws://' + props.host + ':' + props.port)
        client.on('connect', function () {
            this.setState({ connected: true })
        }.bind(this))
        client.on('close', function () {
            if (!client.connected) { this.setState({ connected: false }) }
        }.bind(this))
        // client.on('message', function (topic, message) {
        //     console.log(message.toString())
        // })
        this.client = client
        this.sendLightState = this.sendLightState.bind(this)
        this.update_light_state = this.update_light_state.bind(this)
        this.sliderUpdate = this.intensityUpdate.bind(this)
        this.buttonClick = this.buttonClick.bind(this)
        this.intensityUpdate = this.intensityUpdate.bind(this)
        this.temperatureUpdate = this.temperatureUpdate.bind(this)
    }
    update_light_state(values) {
        let new_state = {
            light: {
                red: values.red != null ? values.red : this.state.light.red,
                green: values.green != null ? values.green : this.state.light.green,
                blue: values.blue != null ? values.blue : this.state.light.blue,
                white: values.white != null ? values.white : this.state.light.white,
                intensity: values.intensity != null ? values.intensity : this.state.light.intensity
            }
        }
        this.setState(new_state)
        return new_state
    }
    sendLightState(light_state) {
        let intense = light_state.light.intensity / 100
        let r = Math.floor(light_state.light.red * intense)
        let g = Math.floor(light_state.light.green * intense)
        let b = Math.floor(light_state.light.blue * intense)
        let w = Math.floor(light_state.light.white * intense)
        // TODO: message should be json
        let message = `led(${r}, ${g}, ${b}, ${w})`
        this.client.publish(this.props.publish_channel, message)
    }
    buttonClick(e) {
        let state
        if (e.target.id === "btn_on") {
            state = this.update_light_state({ intensity: 100 })
        }
        if (e.target.id === "btn_off") {
            state = this.update_light_state({ intensity: 0 })
        }
        this.sendLightState(state)
    }
    intensityUpdate(e) {
        let state = this.update_light_state({ intensity: e.target.value })
        this.sendLightState(state)
    }
    temperatureUpdate(e) {
        let state = this.update_light_state({ white: e.target.value }, null)
        this.sendLightState(state)
    }
    render() {
        return <Container className='border rounded'>
            <Row>
                <Col>{this.state.connected ?
                    <Alert variant="success">Connected</Alert> :
                    <Alert variant="danger">Disconnected</Alert>
                }</Col>
                <Col xs="auto">
                    <Button onClick={() => { this.client.reconnect() }}>Reconnect</Button>
                </Col>
            </Row>
            <Row >
                <Col>
                    <Form >
                        <Container>
                            <Row className="text-center">
                                <Col xs="auto" ><Button id="btn_off" onClick={this.buttonClick} >Aus</Button></Col>
                                <Col ><Form.Control
                                    type="range"
                                    value={this.state.light.intensity}
                                    onChange={this.intensityUpdate}
                                /></Col>
                                <Col xs="auto" ><Button id="btn_on" onClick={this.buttonClick} >An</Button></Col>
                            </Row>
                            <Row className="text-center">
                                <Col xs="auto" ><Form.Label  >Warm</Form.Label></Col>
                                <Col ><Form.Control
                                    type="range"
                                    min="0"
                                    max={this.props.max_value}
                                    value={this.state.light.white}
                                    onChange={this.temperatureUpdate}
                                /></Col>
                                <Col xs="auto" ><Form.Label>Kalt</Form.Label></Col>
                            </Row>
                        </Container>
                    </Form>
                </Col>
            </Row>
        </Container >
    }
}

export default LightControl;
