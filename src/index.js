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
        host={window.HOSTNAME}
        port={window.HOSTPORT}
        publish_channel={window.CHANNEL}
      />
    </div>
  </div >,
  document.getElementById('root')
);