import React, {Component} from 'react';
import asioApi from '../axioConfig';
import qs from 'qs';
let $this;

class Login extends Component{
    constructor(props){
        super(props);

        this.state={email:'',password:''};
        $this=this;
    }

    handleEmailChange(e){
        $this.setState({
            email:e.target.value
        })
    }
    handlePasswordChange(e){
        $this.setState({
            password:e.target.value
        })
    }
    loginHandle(e){
        e.preventDefault();

        const user={email:$this.state.email, password:$this.state.password}
        asioApi.post("auth/login",qs.stringify(user)).then((res)=>{

            if(res.data.auth === true){
                localStorage.setItem('token',res.data.token);

                asioApi.defaults.headers.common['x-access-token']=res.data.token;
                //$this.props.history.push('/');
                $this.props.history.push({
                    pathname:'/',
                    redirectfrom:'login'
                })
            }
        }).catch((err)=>{
            alert("Username password mismatch");
            console.log(err);
        });
    }


    render(){
        return(
            <div>
                <h2>Login</h2>
                <br/>
                <form onSubmit={this.loginHandle}>
                <div className="form-group"> 
                    <label>Email</label>
                    <input onChange={this.handleEmailChange} type="email" className="form-control" id="exampleInputEmail"
                     aria-describedby="email" placeholder="Enter Email" />
                </div>
                <div className="form-group"> 
                    <label>Password</label>
                    <input onChange={this.handlePasswordChange} type="password" className="form-control" id="exampleInputPassword" placeholder="*****" />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
        );
    }
}
export default Login;