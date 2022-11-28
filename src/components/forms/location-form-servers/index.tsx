import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faServer } from '@fortawesome/free-solid-svg-icons';
import './style.css';

interface OptionProps {
  list: string;
  text: string;
}

const LocationFormServers:React.FC<OptionProps> = ({list, text}) => {

  return (
    <div className='LocationForm-select'>
      <label>{text}</label>
      <div className='LocationForm-icon3'><FontAwesomeIcon icon={faServer} /></div>
      <div className='LocationForm-serverlist'>{list}</div>
    </div>
  );
};

export default React.memo(LocationFormServers);