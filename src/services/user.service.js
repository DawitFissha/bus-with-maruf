import axios_instance from "./lib-config";

class UserService {
  getPublicContent() {
    return axios_instance.get('getorganizationroute');
  }
  getReservedSit() {
    return axios_instance.get('getreservedsit/6214d859b3778328889ce30a');
  }
  getBusList() {
    return axios_instance.get('getorganizationactivebus');
  }
  getUserList() {
    return axios_instance.get('getallorganizationuser');
  }
  getBookedList() {
    return axios_instance.get('bookedList');
  }
  getDrivers() {
    return axios_instance.get(`getuserbyrole?role=driver`);
  }
  getRedats() {
    return axios_instance.get( `getuserbyrole?role=redat`);
  }
  getCashiers() {
    return axios_instance.get(`getuserbyrole?role=casher`);
  }
  getRoutes() {
    return axios_instance.get(`getorganizationroute`);
  }
  getSchedules() {
    return axios_instance.get(`getallschedule`);
  }
}

export default new UserService();
