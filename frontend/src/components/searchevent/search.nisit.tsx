import React, { useState } from 'react';
import { NisitHeader } from '../header/nisit.header';
// material ui import
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { ThemeProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useStyles } from './style';
import { theme } from './../theme/theme';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import Autocomplete from '@material-ui/lab/Autocomplete';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import VisibilityIcon from '@material-ui/icons/Visibility';
import TurnedInIcon from '@material-ui/icons/TurnedIn';

import { api, setAuthToken } from '../../api/jsonPlaceholder.instance';

const typenames = [
  'กิจกรรมมหาวิทยาลัย',
  'กิจกรรมเพื่อเสริมสร้างสมรรถนะ ด้านพัฒนาคุณธรรม จริยธรรม',
  'กิจกรรมเพื่อเสริมสร้างสมรรถนะ ด้านพัฒนาทักษะการคิดและการเรียนรู้',
  'กิจกรรมเพื่อเสริมสร้างสมรรถนะ ด้านพัฒนาทักษะเสริมสร้างความสัมพันธ์ระหว่างบุคคลและการสื่อสาร',
  'กิจกรรมเพื่อเสริมสร้างสมรรถนะ ด้านพัฒนาสุขภาพ',
  'กิจกรรมเพื่อสังคม',
];

export function MyResult() {
  const classes = useStyles();
  return (
    <div>
        <Box className={classes.actybox}
              boxShadow={5}
              display="flex" 
              p={3} 
              m={3}
              bgcolor="#b9f6ca" >
          <List className={classes.actybox}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary={"ชื่อกิจกรรม"}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    color="textPrimary"
                  >
                  วันที่จัด<br/>
                  สถานที่<br/>
                  ประเภท<br/>
                  <VisibilityIcon/> 0 view<br/>
                  <TurnedInIcon/> กูไม่กดหรอก <br/>
                  </Typography>
                  <br/>
                  {" — Wish I could come, but I'm out of town this…"}
                </React.Fragment>
              }
            />
          </ListItem>
          </List>
        </Box>
    </div> 
  );
}

export const SearchEvent : React.FC = () => {
  const classes = useStyles();
  const [ eventName, setEventName ] = useState('')
  const [ eventType, setEventType ] = useState<string[]>([]);
  const [ startDate, setStartDate ] = useState(null);
  const [ endDate, setEndDate ] = useState(null)
  
  const searchOnChange = ( e: any ) => {
    setEventName(e.target.value);
  }

  const startDateOnChange = ( e : any ) => {
    setStartDate(e.target.value);
  }

  const endDateOnChange = ( e : any ) => {
    setEndDate(e.target.value);
  }

  const eventTypeChange = ( e : any, values : any ) => {
    setEventType(values)
  }

  const search = async () => {
    const payload = {
      event_name : eventName,
      event_type : eventType,
      event_start_time : startDate,
      event_end_time : endDate
    }
    const token = localStorage.getItem('token');
    setAuthToken(token)
    const res = await api.post('events/search/', payload)
    console.log(res)
  }
  
  return (
    <ThemeProvider theme={theme}>
      <NisitHeader/>
      <div className={classes.midpage}> 
      <Container component="main" maxWidth="md">
        <ThemeProvider theme={theme}>
          <CssBaseline />   
          <Typography variant="h6" align="center" color="textPrimary">
            ค้นหากิจกรรม
          </Typography>  
          <Grid container spacing={1}>
          <Grid item xs={4}>
          <TextField
                  variant="outlined"
                  margin="dense"
                  required
                  fullWidth
                  name="key"
                  label="ค้นหาด้วยชื่อกิจกรรม"
                  type="key"
                  id="key"
                  onChange = { searchOnChange }
                />
          </Grid>

          <Grid item xs={2}>
          <TextField
                    variant="outlined"
                    margin="dense"
                    required
                    fullWidth
                    id="startdate"
                    label="วันที่เริ่มกิจกรรม"
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange = { startDateOnChange }
                    >
                  </TextField>
            </Grid>

            <Grid item xs={2}>
            <TextField
                    variant="outlined"
                    margin="dense"
                    required
                    fullWidth
                    id="enddate"
                    label="วันที่กิจกรรมสิ้นสุด"
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange = { endDateOnChange }
                    >
              </TextField>
            </Grid>

            <Grid item xs={4}>
            <Autocomplete
              multiple
              id="type"
              options={typenames}
              filterSelectedOptions
              renderInput={(params) => (<TextField {...params} label="เลือกประเภทของกิจกรรม" placeholder="ประเภทของกิจกรรม" />)}
              onChange = { eventTypeChange }
              />
            </Grid>
            </Grid>
            <Grid container spacing={1}>
            <Grid item xs={1}>
            <Button 
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.submit}><SearchOutlinedIcon/> ค้นหา </Button>
            </Grid>
            <Grid item xs={1}>
            </Grid>
            </Grid>
            </ThemeProvider>
            <Typography variant="h6" align="center" color="textPrimary">
            ผลการค้นหา
          </Typography>    
      </Container></div>
      <br/>
      <br/>
      <Container fixed>
        <Typography  component="main" style={{ backgroundColor: '#eeeeee', height: '100vh' }}>
        <Grid container direction="column" alignItems="center">
        <Box className={classes.actybox}
              boxShadow={5}
              display="flex" 
              p={3} 
              m={3}
              bgcolor="#b9f6ca" >
          <List className={classes.actybox}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary={"ชื่อกิจกรรม"}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    color="textPrimary"
                  >
                  วันที่จัด<br/>
                  สถานที่<br/>
                  ประเภท
                  <Typography align="right">
                  <Button>ดูรายละเอียดเพิ่มเติม</Button><br />
                  <VisibilityIcon/> 0 view <TurnedInIcon/> ยังไม่ได้ติดตาม
                  </Typography>
                  
                  </Typography>
                  <br/>
                
                </React.Fragment>
              }
            />
          </ListItem>
          </List>
        </Box>
        <Box className={classes.actybox}
              boxShadow={5}
              display="flex" 
              p={3} 
              m={3}
              bgcolor="#b9f6ca" >
          <List className={classes.actybox}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary={"ชื่อกิจกรรม"}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    color="textPrimary"
                  >
                  วันที่จัด<br/>
                  สถานที่<br/>
                  ประเภท
                  <Typography align="right">
                  <Button>ดูรายละเอียดเพิ่มเติม</Button><br />
                  <VisibilityIcon/> 999M view <TurnedInIcon/> กำลังติดตาม
                  </Typography>
                  
                  </Typography>
                  <br/>
                  
                </React.Fragment>
              }
            />
          </ListItem>
          </List>
        </Box>  
        <MyResult /> 
      </Grid>
      
      </Typography>
      </Container>
      <Box mt={10}></Box>
    </ThemeProvider>   
  );
}
