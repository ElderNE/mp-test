import { useContext, useEffect } from "react";
import { storeContext } from "./store";
import TestLocationsList from './containers/test_location_list';

export default function App() {

  //получение данных
  const store = useContext(storeContext);
  useEffect(() => {
    store.fetchData();
  },[])

  return (
    <div className="App">
      <TestLocationsList />
    </div>
  );
}