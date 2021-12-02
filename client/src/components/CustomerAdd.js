import React from 'react';
import {post} from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import  TextField  from '@material-ui/core/TextField';
import  Button  from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
    hidden : {
        display : 'none'
    }
});

class CustomerAdd extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            file: null,
            userName : '',
            birthday : '',
            gender : '',
            job : '',
            fileName : '',
            open : false
        }
        //바인딩처리
        // this.handleClickOpen = this.handleClickOpen.bind(this);
        // this.handleClose = this.handleClose.bind(this);
    }
    // =()=> 이거 자동 바인딩처리
    handleClickOpen = () =>{
        this.setState({
            open : true
        });
    }
    handleClose = () =>{
        this.setState({
            file: null,
            userName : '',
            birthday : '',
            gender : '',
            job : '',
            fileName : '',
            open : false
        });
    }
    //실제 add 하는 함수
    addCustomer =() => {
        const url = '/api/customers';
        const formData = new FormData();
        formData.append('image',this.state.file);
        formData.append('name',this.state.userName);
        formData.append('birthday',this.state.birthday);
        formData.append('gender',this.state.gender);
        formData.append('job',this.state.job);
        const config = {
            headers:{
                'content-type' : 'multipart/form-data'
            }
        }
        /*
        // 키 / 값 쌍 표시
        for(var pair of formData.entries()) {
        console.log(pair[0]+ ', '+ pair[1]);
        }
        */
        return post(url,formData,config);
    }
    //submit이 일어나면 실행되는 함수
    handleFormSubmit = (e) =>{
        console.log(">>>");
        //alert(this.state.birthday);
        e.preventDefault();
        this.addCustomer()
            .then((response) => {
                console.log(response.data);
                this.props.stateRefresh();
                
            })
        this.setState({
            file: null,
            userName : '',
            birthday : '',
            gender : '',
            job : '',
            fileName : '',
            open : false
        })
        //this.handleClose();
        //전체 업로드가 아닌 추가된 고객 데이터만 넣어야한다..
        //window.location.reload();
        
    }
    handleFileChange = (e) =>{
        this.setState({
            //여러 파일들 중 하나 첫번째 꺼
            file : e.target.files[0],
            fileName : e.target.value
        })
    }
    handleValueChange = (e) =>{
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }
    render(){
        const {classes} = this.props;

        return (
            <div>
                <Button variant='contained' color = 'primary' onClick={this.handleClickOpen}>고객 추가하기</Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>고객 추가</DialogTitle>
                    <DialogContent>
                        <input className ={classes.hidden} accept="image/*" id="raised-button-file" type="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange} /><br/>
                        <label htmlFor="raised-button-file">
                            <Button variant="contained" color="primary" component="span" name="file" >
                                {this.state.fileName === ""?"프로필 이미지 선택" : this.state.fileName}
                            </Button>
                        </label>
                        <br/>
                        <TextField label="이름" type = "text" name = "userName" value={this.state.userName} onChange={this.handleValueChange}/><br/>
                        <TextField label="생년월일" type = "text" name = "birthday" value={this.state.birthday} onChange={this.handleValueChange}/><br/>
                        <TextField label="성별" type = "text" name = "gender" value={this.state.gender} onChange={this.handleValueChange}/><br/>
                        <TextField label="직업" type = "text" name = "job" value={this.state.job} onChange={this.handleValueChange}/><br/>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>추가</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
            // <form onSubmit = {this.handleFormSubmit}>
            //     <h1>고객 추가</h1>
            //     프로필 이미지  : <input type="file" name ="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange} /><br/>
            //     이름 : <input type = "text" name = "userName" value={this.state.userName} onChange={this.handleValueChange}/><br/>
            //     생년월일 : <input type = "text" name = "birthday" value={this.state.birthday} onChange={this.handleValueChange}/><br/>
            //     성별 : <input type = "text" name = "gender" value={this.state.gender} onChange={this.handleValueChange}/><br/>
            //     직업 : <input type = "text" name = "job" value={this.state.job} onChange={this.handleValueChange}/><br/>
            //     <button type = "submit">추가하기</button>
            // </form>
        )
    }


}

export default withStyles(styles)(CustomerAdd);