import React, {Component} from 'react';
import axioApi from '../axioConfig';
import CreatableSelect from 'react-select/creatable';

let $this;
class CreatePost extends Component{
    constructor(props){
        super(props);
        this.state={title:'',description:'',tags:[], alltags:[],author:''}
        $this=this;
    }

    componentDidMount(){
        axioApi.get('tags').then((res)=>{
            $this.setState({
                alltags:res.data
            })
        });

    }

    handleOnTitle(e){
        $this.setState({title:e.target.value});
    }

    handleOnDescription(e){
        $this.setState({description:e.target.value});
    }

    handleOnTags=(selsectedtag)=>{
        $this.setState({tags:selsectedtag});
    }

    savePost(){
        const postdata={
            title:$this.state.title,
            description:$this.state.description,
            tags:$this.state.tags,
            author:$this.props.loginuser
        }
        postdata.tags=postdata.tags.map(function(t){
            return t.label;
        })
        console.log(postdata);
        axioApi.post("posttag",postdata).then((res)=>{
            $this.props.history.push('/post');
        });
    }
    render(){
        return(
            <div>
                <hr/>
                <h1>Post Create</h1>
                <br/>
                <div className="form-group">
                    <label>Title</label>
                    <input onChange={this.handleOnTitle} name="title" type="text"
                    className="form-control" id="title" aria-describedby="title" placeholder="Enter title" />
                </div>   
                <div className="form-group">
                    <label>Description</label>
                    <input onChange={this.handleOnDescription} name="description" type="text"
                    className="form-control" id="description" aria-describedby="description" placeholder="Enter description" />
                </div> 
                <div className="form-group">
                    <label>Tags</label>
                    <CreatableSelect
                     isClearable
                     onChange={this.handleOnTags}
                     // onInputChange={this.handleInputChange}
                     options={this.state.alltags}
                     isMulti={true}
                    />
                </div> 
                <button type="submit" onClick={this.savePost} className="btn btn-primary">Add Post</button>
            </div>
        );
    }
}
export default CreatePost;