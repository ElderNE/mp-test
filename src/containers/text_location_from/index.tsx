import { useContext } from 'react';
import { storeContext } from "../../store";
import { observer } from "mobx-react-lite";
import LocationForm from "../location-form";

interface FormProps {
    form_index: number,
}
  
const TestLocationForm = observer(function TestLocationForm(props: FormProps) {

  const store = useContext(storeContext);
  
  if (!store.isLoaded) {
    return <div>Данные не загружены</div>;
  }
  return  <LocationForm form_index={props.form_index}/>
});

export default TestLocationForm;