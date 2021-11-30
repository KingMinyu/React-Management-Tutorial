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
import  CircularProgress  from '@material-ui/core/CircularProgress';

const styles = theme =>({
  root : {
    width : '100%',
    marginTop : theme.spacing(3),
    overFlowx : 'auto'
  },
  table : {
    minWidth : 1080
  },
  progress :{
    margin : theme.spacing.unit * 2
  }
})


class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      customers : '',
      completed : 0
    }
  }

  stateRefresh = () =>{
    console.log("stateRefresh"); 
    this.callApi()
       .then(res => this.setState({customers : res}))
       .catch(err => console.log(err));
    console.log("here!");
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
  render(){
    const {classes} = this.props;
    return(
      <div>
      <Paper className = {classes.root}>
        <Table className = {classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>이미지</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>생년월일</TableCell>
              <TableCell>성별</TableCell>
              <TableCell>직업</TableCell>
              <TableCell>설정</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {this.state.customers ? this.state.customers.map(c => {return( <Customer stateRefresh={this.stateRefresh} key={c.key} id={c.id} image={c.image} name={c.name} birthday={c.birtday} gender={c.gender} job={c.job}/>);})  
          :
            <tableRow>
              <TableCell colSpan="6" align="center">
                  <CircularProgress className = {classes.progress} variant = "indeterminate" value = {this.state.completed} />
              </TableCell>
            </tableRow>}
          </TableBody>
        </Table>
        </Paper>
        <CustomerAdd stateRefresh={this.stateRefresh}/>
        </div>
    );
  }
}

export default withStyles(styles)(App);
//https://material-ui.com 에서 참고 할 수 있음