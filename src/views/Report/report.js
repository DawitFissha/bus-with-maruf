import React,{useEffect,useState} from 'react';

import * as WebDataRocksReact from 'react-webdatarocks';
import "webdatarocks/webdatarocks.highcharts";
import UserService from "../../services/user.service"

export function Report (){

   let myRef = null;
   myRef = React.createRef();
   const [xy,setxy]=useState([]);
   const [content, setContent] = useState({ content: '' });
   useEffect(() => {
    // fetch("https://jsonPlaceholder.typicode.com/users").then(resp=>resp.json()).then(resp=>setData(resp))
   
    UserService.getAllTripHistory().then(
      response => {
        setContent({
          content: response.data


        }); setxy(response.data)
        console.log(xy)


      },
      error => {
        setContent({
          content:
            'error'
        });
      }
    );

  }, [xy]);

    return (

    <div>
      <div id="pivot-container"></div> 
      <link rel="stylesheet" type="text/css" href="theme/lightblue/webdatarocks.min.css"/>
     
      <WebDataRocksReact.Pivot 
        toolbar={true} report={{
          "dataSource": {
              "dataSourceType": "json",
              "data": xy
          },
          "slice": {
              "reportFilters": [{
                      "uniqueName": "Color"
                  },
                  {
                      "uniqueName": "Destination"
                  }
              ],
              "rows": [{
                      "uniqueName": "Category",
                      "filter": {
                          "members": [
                              "Category.Clothing",
                              "Category.Cars"
                          ],
                          "negation": true
                      }
                  },
                  {
                      "uniqueName": "Business Type"
                  }
              ],
              "columns": [{
                      "uniqueName": "Measures"
                  },
                  {
                      "uniqueName": "Country",
                      "filter": {
                          "members": [
                              "Country.United Kingdom"
                          ],
                          "negation": true
                      }
  
                  }
              ],
              "measures": [{
                      "uniqueName": "Price",
                      "aggregation": "sum",
                      "format": "currency"
                  },
                  {
                      "uniqueName": "Discount",
                      "aggregation": "sum",
                      "active": false,
                      "format": "currency"
                  }
              ],
              "expands": {
                  "rows": [{
                          "tuple": [
                              "Category.Accessories"
                          ]
                      },
                      {
                          "tuple": [
                              "Category.Bikes"
                          ]
                      }
                  ]
              }
          },
            
          "conditions": [{
                  "formula": "#value < 2000",
                  "measure": "Price",
                  "format": {
                      "backgroundColor": "#f45328",
                      "color": "#FFFFFF"
                  }
              },
              {
                  "formula": "#value > 150000",
                  "measure": "Price",
                  "format": {
                      "backgroundColor": "#0598df",
                      "color": "#FFFFFF"
                  }
              }
          ]
      }}/>,

    </div>
    );
  }




