import React, { useContext } from 'react';
import { storeContext } from "../../store";
import * as mobx from 'mobx';
import { observer } from "mobx-react-lite";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVial, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import LocationFormOption from '../../components/forms/location-form-option';
import { checkServer } from '../../utils/check_server';
import LocationFormServers from '../../components/forms/location-form-servers';
import LocationFormInput from '../../components/forms/location-form-input';
import './style.css';

interface LocationFormProps {
  form_index: number,
}

const LocationForm:React.FC<LocationFormProps> = observer(function LocationForm({form_index}) {

  const store = useContext(storeContext);

  //формируем список серверов
  let list: string = checkServer([store.data_out[form_index].locationID,
                                  store.data_out[form_index].envID], 
                                  mobx.toJS(store).servers);
  
  //удаление локации
  function deleteLocation(form_index: number) {
    store.delDataOut(form_index);
  }

  return  <form className='LocationForm'>
            <div className='LocationForm-element'>
              <h2><FontAwesomeIcon icon={faVial} /> Тестовая локация {form_index+1}</h2>
              <h2 onClick={() => deleteLocation(form_index)}><FontAwesomeIcon icon={faTrashCan} className="LocationForm-icon__color"/></h2>
            </div>
            <div className='LocationForm-element'>
              <LocationFormOption options={mobx.toJS(store).locations} 
                                  id_name={"locationID"} 
                                  text={"Локация"}
                                  val={store.data_out[form_index].locationID}
                                  form_index={form_index}/>   
              <LocationFormOption options={mobx.toJS(store).envs} 
                                  id_name={"envID"} 
                                  text={"Среда"}
                                  val={store.data_out[form_index].envID}
                                  form_index={form_index}/>
              <LocationFormServers text={"Серверы"} list={list}/>
            </div>
            <LocationFormInput hint={store.data_out[form_index].hint} form_index={form_index}/>
          </form>;
  });

  export default React.memo(LocationForm);