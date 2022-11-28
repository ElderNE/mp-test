import React, { useContext} from 'react';
import { storeContext } from "../../../store";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import './style.css';

interface InputText {
  hint: string,
  form_index: number,
}

const LocationFormInput:React.FC<InputText> = ({hint, form_index}) => {

  //отслеживаем изменения поля ввода
  const store = useContext(storeContext);
  function changeInput(e:React.ChangeEvent<HTMLInputElement>){
    let text_hint: string = e.target.value;
    let id_name: string = "hint";
    store.setDataOut({text_hint, form_index, id_name});
  }

  return (
    <div className='LocationForm-prompt'>
      <label htmlFor="habit">Подсказка</label>
      <input type={'text'} 
             maxLength={500} 
             id="habit" 
             placeholder={'Комментарий по локации'}
             value={hint}
             onChange={(e) => changeInput(e)}/>
      <div className='LocationForm-icon1'><FontAwesomeIcon icon={faQuestion}/></div>
    </div>
  );
};

export default React.memo(LocationFormInput);