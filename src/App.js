import React,{Component} from 'react';
import './App.css';
import {Switch,Route,BrowserRouter,Link} from 'react-router-dom';
import Home from './views/Home';
import Register from './views/Register';
import Login from './views/Login';
import Post from './views/Post';
import CreatePost from './views/CreatePost';
import EditPost from './views/EditPost';
import PostDetail from './views/PostDetail';
import HocTech from './views/HocTech';
import AuthMiddleware from './AuthMiddleware';

let token=localStorage.getItem('token');
class App extends Component{
  ShowLogin(){
    let loginorlogout=<Link className="nav-link" to="/login">Login</Link>;
    if(token){
      loginorlogout=<a className="nav-link" href="" onClick={this.logout}>Logout</a>
    }
    return loginorlogout;
  }
  logout(){
    localStorage.removeItem('token');
    this.history.push('/');
  }
  showRegisterOrPost(){
    let registerOrPost=<Link className="nav-link" to="/register">Register</Link>;
    if(token){
      registerOrPost=<Link className="nav-link" to="/post">User Posts</Link>;
    }
    return registerOrPost;
  }
  render(){
  return (
    <div>
       <div className="header">
        <nav className="navbar navbar-expand-lg navbar-light bg-light ">
          <div className="collapse navbar-collapse container" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
              {this.showRegisterOrPost()}
              </li>
              <li className="nav-item">
                {this.ShowLogin()}
              </li>
            </ul>
          </div>
        </nav>
       </div> 

       <div className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/post" component={AuthMiddleware(Post)} />
            <Route path="/createpost" component={AuthMiddleware(CreatePost)} />
            <Route path="/editPost/:id" component={AuthMiddleware(EditPost)} />
            <Route path="/postDetail/:id" component={PostDetail} />
            <Route path="/hoctech" component={HocTech} />
          </Switch>
       </div> 
       <div className="container">
         <br/>
         <h6>Footer</h6>
       </div> 
    </div>
  );
}
}

export default App;
