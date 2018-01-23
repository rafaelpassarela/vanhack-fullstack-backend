import React, { Component } from 'react';
import PostCommentView from './post.comment.view';
import Button from 'react-bootstrap/lib/Button';
import FormControl from 'react-bootstrap/lib/FormControl';

//import { getUser } from '../../helpers/cookie.helper';
//import { getCategoryList } from '../../helpers/get.category.list';

class PostCommentList extends Component {

    constructor(props) {
        super(props);

        this.handleEditModeChange = this.handleEditModeChange.bind(this);
        this.handleEditChange = this.handleEditChange.bind(this);

        this.state = {
            editing: false,
            saving: false,
            list: this.props.list,
            newText: ''
        }
    }

    handleEditModeChange() {
        this.setState({ editing: true });
    }

    handleEditChange(e) {
        this.setState({ newText: e.target.value });
    }

    cancelHandler = () => {
        this.setState({ editing: false });
    };

    saveHandler = () => {
        this.setState({ saving: true });

        let data = {
            "id": -1,
            "postID": this.props.postID,
            "userEmail": this.props.userEmail,
            "comment": this.state.newText
        };

        fetch("http://localhost:54163/api/PostComment/Save", {
            method: 'POST',
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(data)
        })
            .then(res => {
                return res.json();
            })
            .then(
            (result) => {

                this.setState({
                    saving: false,
                    editing: false,
                    message: result,
                    list: this.state.list.concat(data)
                });
            },
            (error) => {
                this.setState({
                    saving: false,
                    message: error.message + ' - ' + error.stack
                });
            });
    };

    render() {
        let commentList = this.state.list;

        let list = null;
        if (commentList !== undefined) {
            list = commentList.map((item, i) =>
                <PostCommentView key={i} data={item} />
            );
        }

        let editPlace = null;
        let caption = (this.state.saving) ? 'Saving' : 'Save';
        let valid = false;
        if (this.state.editing) {
            valid = this.state.newText.length > 10;
            editPlace = (
                <div>
                    <span className="tiny-margin">
                        <FormControl componentClass="textarea" onChange={this.handleEditChange} rows={6} maxLength={2000} placeholder="Description" />
                    </span>
                    <Button bsSize="xsmall" bsStyle="success" onClick={this.saveHandler} disabled={!valid}>{caption}</Button>&nbsp;&nbsp;&nbsp;
                    <Button bsSize="xsmall" bsStyle="danger" onClick={this.cancelHandler} disabled={this.state.sending}>Cancel</Button>
                </div>
            );
        }

        let commentDom = (
            <div className="comment-body">
                Comments - <Button bsSize="xsmall" bsStyle="link" onClick={this.handleEditModeChange} disabled={this.state.editing}>Add New</Button> <br />
                {editPlace}
                {list}
            </div>
        );

        return commentDom;
    }

}

export default PostCommentList;