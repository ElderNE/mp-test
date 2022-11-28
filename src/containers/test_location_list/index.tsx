import { useContext } from 'react';
import * as mobx from 'mobx';
import { observer } from "mobx-react-lite";
import { storeContext } from "../../store";
import TestLocationForm from '../text_location_from';
import './style.css';

const TestLocationsList = observer(function TestLocationsList() {
  
  //получение данных
  const store = useContext(storeContext);
  let locationsList = store.data_out;
  
  //добавление новой локации (после загрузки данных)
  function addLocation(){
    if(store.isLoaded)
      store.addDataOut({locationID: store.locations[0].locationID, 
                        envID: store.envs[0].envID, 
                        hint: ""});
  }

  return (
      <div className='TestLocationsList'>
        {locationsList.map((location, index) => (
          <TestLocationForm key={`location-${index}`} form_index={index}/>
        ))}
        <button className={store.isLoaded? 'TestLocationsList_button' : 'TestLocationsList_button-gray'}
                onClick={() => addLocation()}>
          <span className='TestLocationsList_span'>+</span>
          Добавить тестовую локацию...
        </button>
        <button className='TestLocationsList_button'
                onClick={() => {console.log(mobx.toJS(store).data_out);}}>
          Вывести результат в консоль
        </button>
      </div>
    );
  });

  export default TestLocationsList;