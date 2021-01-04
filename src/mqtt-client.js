import React from 'react';
// import mqtt from 'mqtt';

// export default () => {
//     const [connectionStatus, setConnectionStatus] = React.useState(false);
//     const [messages, setMessages] = React.useState([]);

//     useEffect(() => {
//         const client = mqtt.connect("mqtt://test.mosquitto.org:1883");
//         client.on('connect', () => setConnectionStatus(true));
//         client.on('message', (topic, payload, packet) => {
//             setMessages(messages.concat(payload.toString()));
//         });
//     }, []);

//     return (<>{lastMessages.map((message) => (<h2>{message}</h2>))}</>)
// }
