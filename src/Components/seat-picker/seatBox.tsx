import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const SeatBox = styled(Paper)(({ theme}) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    margin:theme.spacing(.4),
    // textAlign:'center',
    width:"20"
  }));
  export default SeatBox