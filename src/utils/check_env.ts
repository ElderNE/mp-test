export function checkEnv(locationID: number, 
                         options:Array<{name:string, envID: number}>, 
                         servers:Array<{name:string, locationID: number, envID: number}>):
                         Array<{name:string, envID: number}> {
  //формируем список из доступных сред
  let list: Array<{name:string, envID: number}> = options.filter((options) => {
    for(let j of servers) {
        if(j.locationID === locationID && j.envID === options.envID)
          return options;
    }
    return false;
  });

  return list;
}
