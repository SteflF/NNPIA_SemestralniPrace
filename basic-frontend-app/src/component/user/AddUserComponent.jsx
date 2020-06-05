import React, { Component, Fragment } from 'react'
import UserService from "../../service/UserService";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {Helmet} from "react-helmet";

class AddUserComponent extends Component{

    constructor(props){
        super(props);
        this.state ={
            username: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            message: null
        }
        this.saveUser = this.saveUser.bind(this);
    }

    saveUser = (e) => {
        e.preventDefault();
        let user = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName
        };
        UserService.addUser(user)
            .then(res => {
                if(res.data.status === 200){
                    this.setState({message : 'Registrace úspěšná!'});
                    this.props.history.push('/');
                }else{
                    this.setState({message : res.data.message});
                }
                console.log(res);
            });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    render() {
        return(
            <Fragment>
                <Helmet>
                    <title>Add user | UPCE</title>
                </Helmet>
                <Container>
                    <Typography variant="h4" style={style}>Registration</Typography>

                    <form style={formContainer}>

                        <TextField label="USERNAME" fullWidth margin="normal" name="username" defaultValue={this.state.username} onChange={this.onChange} required/>

                        <TextField label="PASSWORD" type="password" fullWidth margin="normal" name="password" defaultValue={this.state.password} onChange={this.onChange} required/>

                        <TextField label="FIRST NAME" fullWidth margin="normal" name="firstName" defaultValue={this.state.firstName} onChange={this.onChange} required/>

                        <TextField label="LAST NAME" fullWidth margin="normal" name="lastName" defaultValue={this.state.lastName} onChange={this.onChange} required/>

                        <TextField label="EMAIL" type="email" fullWidth margin="normal" name="email" defaultValue={this.state.email} onChange={this.onChange} required/>

                        <Button variant="contained" color="primary" onClick={this.saveUser}>Register</Button>
                    </form>
                </Container>
            </Fragment>
        );
    }
}
const formContainer = {
    display: 'flex',
    flexFlow: 'row wrap'
};

const style ={
    display: 'flex',
    justifyContent: 'center'

}

export default AddUserComponent;