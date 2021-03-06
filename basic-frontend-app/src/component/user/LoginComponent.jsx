import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import AuthService from '../../service/AuthService';
import {Helmet} from "react-helmet";
import UserService from "../../service/UserService";
import {Link} from "react-router-dom";

class LoginComponent extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            message: '',
        }
        this.login = this.login.bind(this);
    }

    componentDidMount() {
        localStorage.removeItem("userId");
        localStorage.removeItem("userInfo");
        console.log("state props: ", this.props);
    }

    login = (e) => {
        e.preventDefault();
        const credentials = {username: this.state.username, password: this.state.password};

        AuthService.login(credentials).then(res => {
            if(res.data.status === 200){
                localStorage.setItem("userInfo", JSON.stringify(res.data.result));
                UserService.fetchUserByName(this.state.username).then(
                    res => {
                        window.localStorage.setItem("userId", res.data.result.id);
                    }
                );
                this.props.history.push('/products');
            }else {
                this.setState({message: res.data.message});
            }
        });
    };

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    render() {
        return(
            <React.Fragment>
                <Helmet>
                    <title>Login | UPCE</title>
                </Helmet>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6">
                            React User Application
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Container maxWidth="sm">
                    <Typography variant="h4" style={styles.center}>Login</Typography>
                    <form>
                        <Typography variant="h4" style={styles.notification}>{this.state.message}</Typography>
                        <TextField type="text" label="USERNAME" fullWidth margin="normal" name="username" value={this.state.username} onChange={this.onChange}/>

                        <TextField type="password" label="PASSWORD" fullWidth margin="normal" name="password" value={this.state.password} onChange={this.onChange}/>

                        <Button variant="contained" color="secondary" onClick={this.login}>Login</Button>
                        <Link className="btn btn-secondary ml-1" to="/registration">Registration</Link>
                    </form>
                </Container>
            </React.Fragment>
        )
    }
}

const styles= {
    center :{
        display: 'flex',
        justifyContent: 'center'

    },
    notification: {
        display: 'flex',
        justifyContent: 'center',
        color: '#dc3545'
    }
}

export default LoginComponent;