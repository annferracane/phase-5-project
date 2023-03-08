import { useState } from "react";
import { Alert, Collapse, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

function ActionAlerts({ messages, severity }) {
  // State
  const [open, setOpen] = useState(true);

  // Styles array of alert messages
  const messageArray = messages.map (message =><Alert key={message[0]} severity={ severity } action={ <IconButton aria-label="close" color="inherit" size="small" onClick={() => { setOpen(false); }} > <CloseIcon fontSize="inherit" /> </IconButton> } sx={{ mb: 2 }}>{message[1]}</Alert>)
  
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
        <br></br>
        <Collapse in={open}>
        { messageArray }
        </Collapse>
    </Stack>
  );
}

export default ActionAlerts;