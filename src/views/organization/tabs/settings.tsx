import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Divider from '@mui/material/Divider'
const settings = {
    Refund:[
        {
            id:'0',
            settingDescription:'Maximum number of days for refund',
            settingValue:10,

        },
        {
            id:'1',
            settingDescription:'returned Amount in Percent',
            settingValue:60,
        }
    ],
    Schedule:[
            {
                id:'2',
                settingDescription:'Prepare Schedule days before',
                settingValue:10,
            },
            {
                id:'3',
                settingDescription:'Bus Mandatory during schedule preparation',
                settingValue:false,
            },
            {
                id:'4',
                settingDescription:'Cashiers can preare Schedule',
                settingValue:true,
            }
    ]
}
export default function Settings() {

    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleChange =
      (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
      };
  return (
    <div>
        
      {
        Object.keys(settings).map((key,index)=>{
            return (
                <Accordion expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography >{key}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {
                    settings[key].map((setting:any)=>(
                        <>
                        <Typography key={setting.id}>
                            {setting.settingDescription}    
                        </Typography>
                        <Divider/>
                        </>
                    ))
                  }
                </AccordionDetails>
              </Accordion>
            )
        })
      }
        
     
      {/* <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Accordion 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion> */}
    </div>
  );
}
