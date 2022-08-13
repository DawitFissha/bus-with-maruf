import axios_instance from "./lib-config";
type passengerInfo = {
  passname:string,
  passphone:string,
  sits:number,
}
class AuthService {
  login(phonenumber, organizationcode, password) {
    return axios_instance
      .post(`loginorganizationuser`, {
        phonenumber,
        password, organizationcode
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        // console.log(response.data)
        return response.data;
      });
  }
  logout() {
    localStorage.removeItem("user");
  }
  addUser(newUser){
    return axios_instance 
    .post(`registerorganizationuser`,newUser,)
    
  }

  addRoute(newRoute){
    return axios_instance
    .post(`addroute`,newRoute,)
    .then(response=>{
      return response.data
    })
    .catch(error => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        throw error.response.data

      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
        throw error.message
      }
      console.log(error.config);
    })
  }
  addSchedule(newSchedule){
    return axios_instance.post(`addschedule`,newSchedule)
  }
addBus(newBus){
    return axios_instance.post(`registerbus`,newBus)
  }

  updateRouteInfo(source:string, destination:string, tarif:string, estimatedhour:string, distance:number, id:string) {
    console.log(`${source}`)
    return axios_instance.put(`updaterouteinfo/${id}`, {
      source,
      destination, tarif, estimatedhour, distance,
    });
  }
  lockSit(sits:number[],schedule:string) {
    console.log(sits)
    return axios_instance.put(`locksit/${schedule}`, {
      sits
    });
  }

 bookTicket(passengerInfo:passengerInfo[],schedule:string){
  return axios_instance.put(`bookticketfromschedule/${schedule}`,passengerInfo, )
 }
 
  updateBusInfo(busplateno:string, bussideno:string, driversuername:string, isactive:boolean, totalsit:number, id:string) {

    return axios_instance.put(`updateorganizationbus/${id}`, {
      busplateno,
      bussideno, driversuername, isactive, totalsit,
    }, );
  }
  // getCurrentUser() {
  //   return JSON.parse(localStorage.getItem('user'));;
  // }
}
export default new AuthService();