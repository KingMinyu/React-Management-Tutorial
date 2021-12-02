/* https://ovenapp.io/ 프로토타입 툴 */
import logo from './logo.svg';
import './App.css';
import React from 'react';
import Customer from './components/Customer';
import CustomerAdd from './components/CustomerAdd';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import {withStyles} from '@material-ui/core/Styles';
 import { styled, alpha } from '@material-ui/core/Styles';
import  CircularProgress  from '@material-ui/core/CircularProgress';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

const styles = theme =>({
  root : {
    width : '100%',
    marginTop : theme.spacing(3),
    overFlowx : 'auto'
  },
  progress :{
    margin : theme.spacing.unit * 2
  },
  tableHead :{
    fontSize : '2.0rem'
  },
  menu : {
    marginTop : 15,
    marginTop : 15,
    display : 'flex',
    justifyContent : 'center'
  },
  paper : {
    marginLeft : 18,
    marginRight : 18
  }
})

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));


class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      customers : '',
      completed : 0,
      searchKeyword : ''
    }
  }

  stateRefresh = () =>{
    this.state = {
      customers : '',
      completed : 0,
      searchKeyword : ''
    }
    this.callApi()
       .then(res => this.setState({customers : res}))
       .catch(err => console.log(err));
  }
  componentDidMount(){
    this.timer = setInterval(this.progress , 20);
    this.callApi()
      .then(res => this.setState({customers : res}))
      .catch(err => console.log(err));
  }

  callApi = async () =>{
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  }
  progress =() =>{
    const {completed} = this.state;
    this.setState({completed : completed >= 100 ? 0 : completed +1});
  }
  handleValueChange =(e) =>{
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }
  render(){
    const {classes} = this.props;
    const cellList = ["번호","프로필 이미지", "이름","생년월일","성별","직업","설정"];
    const filteredCustomers = (data) => {
      data = data.filter((c) => {
        return c.name.indexOf(this.state.searchKeyword) > -1;
      });

      return data.map((c)=>{
          return <Customer stateRefresh={this.stateRefresh} key={c.key} id={c.id} image={c.image} name={c.name} birthday={c.birtday} gender={c.gender} job={c.job}/>
      });
    }
    return(
      <div className = {classes.root}>
     <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            고객 정보 관리 시스템
          </Typography>
          <Search >
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              align = 'right'
              name = "searchKeyword"
              value = {this.state.searchKeyword}
              onChange = {this.handleValueChange}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
    <div className ={classes.menu}>
      <CustomerAdd stateRefresh={this.stateRefresh}/>
    </div>
      <Paper className={classes.paper}>
        <Table>
          <TableHead>
            <TableRow>
                {cellList.map(c =>{
                  return<TableCell className = {classes.TableHead}>{c}</TableCell>
                })}
            </TableRow>
          </TableHead>
          <TableBody>
          {this.state.customers ? filteredCustomers(this.state.customers)
          :
            <tableRow>
              <TableCell colSpan="6" align="center">
                  <CircularProgress className = {classes.progress} variant = "indeterminate" value = {this.state.completed} />
              </TableCell>
            </tableRow>}
          </TableBody>
        </Table>
        </Paper>
       
        </div>
    );
  }
}

export default withStyles(styles)(App);
//https://material-ui.com 에서 참고 할 수 있음