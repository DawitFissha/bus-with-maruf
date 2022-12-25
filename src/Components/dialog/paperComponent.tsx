import Paper, { PaperProps } from '@mui/material/Paper';
import Draggable from 'react-draggable';
const Draggable1:any = Draggable 
export default function PaperComponent(props: PaperProps) {
    return (
      <Draggable1
        handle="#draggable-dialog-title"
        cancel={'[class*="MuiDialogContent-root"]'}
      >
        <Paper {...props} />
      </Draggable1>
    );
  }