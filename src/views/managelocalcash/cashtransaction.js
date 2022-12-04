import React,{useState,useRef,useEffect} from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';
import MaterialTable,{ MTableAction} from "material-table";
import {tableIcons} from '../Table/Tableicon'
import {useGetCashTransactionQuery,useGetOrganizationBranchQuery} from '../../store/bus_api';
import {toEthiopianDateString} from 'gc-to-ethiopian-calendar'
import { useSelector } from 'react-redux';
export default function CashTransaction() {
  const [branch,setBranch]=useState()
  const {data}=useGetCashTransactionQuery()
  const {data:branchData,isSuccess:isSuccessb}=useGetOrganizationBranchQuery()
  const userinfo=useSelector(state=>state.userinfo)

  useEffect(()=>{
    let branchList = branchData?.branch?.reduce(function(acc, cur, i) {
      acc[cur._id] = cur.description;
      return acc;
      }, {});
      setBranch(branchList)
  },[isSuccessb])
  return (
    <React.Fragment>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Manage Cash</Card.Title>
                            <Row style={{float:'right'}}>
                            </Row>
                        </Card.Header>
                        <Card.Body>
                        <MaterialTable
                        style={{zIndex:0,fontSize:'14px'}}
                         components={{
                          Container: props => <div {...props} elevation={0}/>,
                     }}
                         responsive
      title="Cash Transaction"
      // ,render:rowData=>toEthiopianDateString(rowData?.departureDateAndTime)
      columns={userinfo.calender=="ec"?[
        {title: "id", field: "_id", hidden: true},
        { title: 'Casher Name', field: 'fullName'},
        { title: 'Phone Number', field: 'phoneNumber'},
        { title: 'Casher Branch', field: 'branch',lookup:branch,type:String},
        { title: 'Amount', field: 'amount'},
        { title: 'Transaction', field:"isCollected",lookup:{true:"Collect",false:"Lend"}},
        { title: 'Collected By', field: 'collectedBy'},
        { title: 'Collecter Phone', field: 'collectorPhone'},
        { title: 'Transaction Date', field: 'updatedAt',type:'date',
        render:rowData=>toEthiopianDateString(rowData?.updatedAt)},
      ]:[
        {title: "id", field: "_id", hidden: true},
        { title: 'Casher Name', field: 'fullName'},
        { title: 'Phone Number', field: 'phoneNumber'},
        { title: 'Casher Branch', field: 'branch',lookup:branch,type:String},
        { title: 'Amount', field: 'amount'},
        { title: 'Transaction', field:"isCollected",lookup:{true:"Collect",false:"Lend"}},
        { title: 'Collected By', field: 'collectedBy'},
        { title: 'Collecter Phone', field: 'collectorPhone'},
        { title: 'Transaction Date', field: 'updatedAt',type:'date'},
      ]}
      data={data?.map(e=>({...e}))}
      icons={tableIcons}
      options={{
        search:false,
        exportAllData:true,
        grouping:true,
        maxBodyHeight: '550px',
        rowStyle:  (rowData, i) => {
          if (i % 2) {
              return {backgroundColor: "#f2f2f2"}
          }
      },
      headerStyle: {
        zIndex: "1",backgroundColor:"#6B7AE0",color:"white",
        fontSize:"16px",margin:'0px',padding:'10px 2px'
      },
        actionsColumnIndex: -1,
        exportButton:true,
        exportDelimiter:true,
        pageSize:10,
        columnsButton:true,
        filtering:true,
      }}

    />
  </Card.Body>
        </Card>
        </Col>
         </Row>
  
        </React.Fragment>
  )
}





