import React from 'react';
import mqtt from 'mqtt';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ButtonGroup from 'react-bootstrap/ButtonGroup'

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
        return <Container className='border rounded'>
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
                                <Col ><Form.Control type="range" /></Col>
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
