import { makeAutoObservable, runInAction } from "mobx";
import * as mobx from 'mobx';
import { createContext } from "react";
import sample from "./data.json";

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout((resolve), ms));
}

export interface Location {
  locationID: number;
  name: string;
}

export interface Env {
  envID: number;
  name: string;
}

export interface Server {
  serverID: number;
  name: string;
  locationID: number;
  envID: number;
}

export interface DataOut {
  locationID: number;
  envID: number;
  hint: string;
  form_index?: number;
}

export interface PropsSetDataOut {
  text_hint?: string;
  form_index: number;
  id_name: string;
  id_type?: number;
}

export class Store {
  isLoaded = false;
  locations: Location[] = [];
  envs: Env[] = [];
  servers: Server[] = [];
  data_out: DataOut[] = [{locationID: 0, envID: 0, hint: ""}];


  fetchData = async () => {
    await sleep(3000);
    runInAction(() => {
      this.locations = sample.locations;
      this.envs = sample.envs;
      this.servers = sample.servers;
      this.isLoaded = true;
      //первая локация отображается, выставляем значения 
      //если сделать пустым, первая локация будет отображаться только после добавления
      this.data_out = [{locationID: this.locations[0].locationID, envID: this.envs[0].envID, hint: ""}];
    });
  };
  
  //смена значений в форме, form_index - номер формы, id_name - тип инпута
  //text_hint, id_type значения(приходят всегда не пустые)
  setDataOut = ({text_hint = "", form_index, id_name, id_type = 0}:PropsSetDataOut) => {
    runInAction(() => {
      this.data_out.forEach((index: any, i: number) => {
        if(i === mobx.toJS(form_index))
          switch(id_name) {
            case 'hint':
              this.data_out[i].hint = text_hint;
              break;
            case 'locationID':
              this.data_out[i].locationID = id_type;
              break;
            case 'envID':
              this.data_out[i].envID = id_type;
              break;       
          }
      });
    });
  }

  //удаление локации(на входе номер ячейки массива)
  delDataOut = (numb: number) => {
    runInAction(() => {
      this.data_out.splice(numb, 1);
    });
  }

  //добавление локации, на входе данные для добавления
  addDataOut = (data_in: DataOut) => {
    runInAction(() => {
      this.data_out.push(data_in);
    });
  }

  constructor() {
    makeAutoObservable(this);
  }
}

export const store = new Store();
export const storeContext = createContext(store);