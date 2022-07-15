import axios from "axios";
import authHeader from './auth-header';
const API_URL = "https://melabus.herokuapp.com/";
axios.defaults.withCredentials = true

type passengerInfo = {
  passname:string,
  passphone:string,
  sits:number,
}
class AuthService {
  login(phonenumber, organizationcode, password) {
    return axios
      .post(API_URL + `loginorganizationuser`, {
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
    return axios.post(`${API_URL}registerorganizationuser`,newUser, { headers: authHeader() })
  }

  addRoute(newRoute){
    return axios.post(`${API_URL}addroute`,newRoute, { headers: authHeader() })
  }
  addSchedule(newSchedule){
    return axios.post(`${API_URL}addschedule`,newSchedule, { headers: authHeader() })
  }
addBus(newBus){
    return axios.post(`${API_URL}registerbus`,newBus, { headers: authHeader() })
  }

  updateRouteInfo(source:string, destination:string, tarif:string, estimatedhour:string, distance:number, id:string) {
    console.log(`${source}`)
    return axios.put(API_URL + `updaterouteinfo/${id}`, {
      source,
      destination, tarif, estimatedhour, distance,
    }, { headers: authHeader() });
  }
  lockSit(sits:number[],schedule:string) {
    console.log(sits)
    return axios.put(API_URL + `locksit/${schedule}`, {
      sits
    }, { headers: authHeader() });
  }

 bookTicket(passengerInfo:passengerInfo[],schedule:string){
  return axios.put(`${API_URL}bookticketfromschedule/${schedule}`,passengerInfo, { headers: authHeader() })
 }
 
  updateBusInfo(busplateno:string, bussideno:string, driversuername:string, isactive:boolean, totalsit:number, id:string) {

    return axios.put(API_URL + `updateorganizationbus/${id}`, {
      busplateno,
      bussideno, driversuername, isactive, totalsit,
    }, { headers: authHeader() });
  }
  // getCurrentUser() {
  //   return JSON.parse(localStorage.getItem('user'));;
  // }
}
export default new AuthService();