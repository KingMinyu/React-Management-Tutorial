import logo from './logo.svg';
import './App.css';
import React from 'react';
import Customer from './components/Customer';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import {withStyles} from '@material-ui/core/Styles';

const styles = theme =>({
  root : {
    width : '100%',
    marginTop : theme.spacing(3),
    overFlowx : 'auto'
  },
  table : {
    minWidth : 1080
  }
})

const customers = [
{
  'id' : 1,
  'image' : 'https://placeimg.com/64/64/1',
  'name' : '민유선',
  'birthday' : '941009',
  'gender' : '여자',
  'job' : '직장인'
}
,{
  'id' : 2,
  'image' : 'https://placeimg.com/64/64/2',
  'name' : '임지현',
  'birthday' : '940404',
  'gender' : '여자',
  'job' : '직장인'
}
,{
  'id' : 3,
  'image' : 'https://placeimg.com/64/64/3',
  'name' : '민우동',
  'birthday' : '190927',
  'gender' : '남자',
  'job' : '댕'
}
]
class App extends React.Component {
  render(){
    const {classes} = this.props;
    return(
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
            </TableRow>
          </TableHead>
          <TableBody>
          {customers.map(c => {return( <Customer key={c.id} id={c.id} image={c.image} name={c.name}birthday={c.birthday}gender={c.gender}job={c.job}/>);})  }
          </TableBody>
        </Table>
        </Paper>
    );
  }
}

export default withStyles(styles)(App);
//https://material-ui.com 에서 참고 할 수 있음