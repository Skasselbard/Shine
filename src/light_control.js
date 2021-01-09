import React from 'react';
import mqtt from 'mqtt';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Alert from 'react-bootstrap/Alert';

const MAX = 1023;

class LightControl extends React.Component {
    constructor(props) {
        super(props)
        this.state = { connected: false }
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
        this.sendOn = this.sendOn.bind(this)
        this.sendOff = this.sendOff.bind(this)
        this.sliderUpdate = this.sliderUpdate.bind(this)
    }
    sendOn() {
        this.client.publish(this.props.publish_channel, "led(511, 1023, 0, 128)")
    }
    sendOff() {
        this.client.publish(this.props.publish_channel, "led(0, 0, 0, 0)")
    }
    sliderUpdate(e) {
        const percent = e.target.value / 100
        const r = 511 * percent
        const g = MAX * percent
        const b = 0
        const w = 128 * percent
        // console.log(e)
        this.client.publish(this.props.publish_channel, `led(${r},${g},${b},${w})`)
    }
    render() {
        return <Container className='border rounded'>
            <Row>
                <Col>{this.state.connected ?
                    <Alert variant="success">Connected</Alert> :
                    <Alert variant="danger">Disconnected</Alert>
                }</Col>
            </Row>
            <Row >
                <Col >
                    <ButtonGroup toggle className="w-100">
                        <Button onClick={this.sendOn} >An</Button>
                        <Button onClick={this.sendOff} >Aus</Button>
                    </ButtonGroup >
                </Col>
            </Row>
            <Row >
                <Col>
                    <Form >
                        <Container>
                            <Row className="text-center">
                                <Col xs="auto" ><Form.Label  >Warm</Form.Label></Col>
                                <Col ><Form.Control type="range" onChange={this.sliderUpdate} /></Col>
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
