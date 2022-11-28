export function checkServer(serv:number[], servers:Array<{name:string, locationID?: number, envID?: number}>):string {
    let list: string = "";
    //если совпадают locationID и envID, то сервер в списке
    //спискок формируем от старшего сервера к младшему (по макету)
    for(let i = servers.length-1; i >= 0 ; i--){
      if(servers[i].locationID === serv[0] && servers[i].envID === serv[1]) {
        if(list){
          list = list + ', ' + servers[i].name;
        }
        else{
          list = servers[i].name;
        }
      }
    }

    return list;
}
