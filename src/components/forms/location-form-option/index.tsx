import React, { useContext } from 'react';
import { storeContext } from "../../../store";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { faEnvira  } from '@fortawesome/free-brands-svg-icons';
import './style.css';

interface OptionProps {
  options: Array<{name:string, locationID?: number, envID?: number, serverID?: number}>,
  id_name: string,
  text: string,
  val: number,
  form_index: number,
}

const LocationFormOption:React.FC<OptionProps> = ({options, id_name, text, val, form_index}) => {

  //отслеживаем изменения поля ввода
  const store = useContext(storeContext);
  function changeInput(e:React.ChangeEvent<HTMLSelectElement>){
    let id_type: number = Number(e.target.value);
    store.setDataOut({id_type, form_index, id_name});
  }

  //сборка универсальная для select-ов locationID и envID
  //данные берутся из соотвествующих полей
  let list = [];
  for(let i of options){
    list.push(
      <option key={i.name} 
              value={i.locationID? i.locationID : i.envID}>
              {i.name}
      </option>
    )
  }

  return (
    <div className='LocationForm-select'>
      <label htmlFor={id_name}>{text}</label>
      <select id={id_name} 
              name={id_name} 
              value={val} 
              onChange={(e) => changeInput(e)}>
        {list}
      </select>
      <div className='LocationForm-icon'>
        <FontAwesomeIcon icon={id_name==="location"?faLocationDot:faEnvira}/>
      </div>
      <div className='LocationForm-icon2'>
        <FontAwesomeIcon icon={faCaretDown}/>
      </div>
    </div>
  );
};

export default React.memo(LocationFormOption);