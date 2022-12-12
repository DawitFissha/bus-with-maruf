import * as React from 'react'
import {StationHeader} from './stationHeader'
import StationList from './stationList'
export default function SalesStation(props:{branches:any[]}){
    const {branches} = props
      return (
          <>
          <StationHeader/>
          <StationList stationList={branches}/>
          </>
      )
  }