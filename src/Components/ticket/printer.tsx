import * as React from 'react'
import ReactToPrint from 'react-to-print'
import TicketPreview from './ticket-header'
import Ticket from './ticket-in-grid'
const pageStyle = `
  @page {
    size: 220.5mm 120mm;
    margin-top:0;
    margin-left:0;
  }
@media print {
  html,body {
    font-size:12px;
  }
}
`;
export function Print(){
    const componentRef = React.useRef(null)
    return (
        <>
        <ReactToPrint
        pageStyle={pageStyle}
        trigger={()=><button>Print</button>}
        content = {()=> componentRef.current}
        />
        <Ticket ref = {componentRef}/>
        </>
    )
}
// 9.5 x 12.625 inches