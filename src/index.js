import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import LightControl from './light_control';
import 'bootstrap/dist/css/bootstrap.css';



ReactDOM.render(
  <div>
    <div className="header" />
    <div className="nav" />
    <div className="body">
      <LightControl
        host="192.168.1.3"
        port="9001"
        publish_channel="control/wohnzimmer/licht/licht" />
    </div>
  </div >,
  document.getElementById('root')
);