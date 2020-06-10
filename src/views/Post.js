import React, {Component} from 'react';
import axioApi from '../axioConfig';
import {Link} from 'react-router-dom';

let $this;
class Post extends Component{
    constructor(props){
        super(props);
        this.state={'posts': [], userid:''}
        $this=this;
        // const redirectfrom=this.props.location.redirectfrom;
        // if(redirectfrom==='createpost'){
        //     window.location.reload();
        // }
    }

    componentDidMount(){
    
    }
    authSuccess(){
        $this.getData();
    }
    getData(){
        alert($this.props.loginuser);
         axioApi.get('posts?author='+$this.state.userid).then((res)=>{
            $this.setState({'posts':res.data});
        });
    }

    deletePost(id){
        axioApi.get('removepost', {_id : id}).then((res)=>{
            $this.getData();
        });
    }

    tabRows(){
        return $this.state.posts.map(function(post,i){
            return <tr key={i}>
                        <td>{post.title}</td>
                        <td>{post.description}</td>
                        <td>{(post.author)? post.author.name:''}</td>
                        <td><Link to={"/editPost/"+post._id}>
                                <button class="btn btn-warning">Edit</button>
                            </Link>/
                             <button class="btn btn-danger" onClick={()=>$this.deletePost(post._id)}>Delete</button></td>
                   </tr>;
        });
    }

    render(){
        return(
            <div>
                <hr/>
                <h1>Post page</h1>
                <Link className="nav-link" to="/createpost">
                    <button class="btn btn-primary">Create Post</button>
                </Link>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>description</th>
                            <th>Author Name</th>
                            <th>Option</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.tabRows()}
                    </tbody>
                </table>
            </div>
        );
    }
}
export default Post;