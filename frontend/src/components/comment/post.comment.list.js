import React, { Component } from 'react';
import PostCommentView from './post.comment.view';

//import { getUser } from '../../helpers/cookie.helper';
//import { getCategoryList } from '../../helpers/get.category.list';

class PostCommentList extends Component {

    render() {
        let data = this.props.data;

        let comment = (
            <div>
                <span className="tiny-margin">
                    <i>{data.userEmail}</i> says:
                </span>
                <div className="inner-comment">
                    {data.comment}
                </div>
            </div>
        );

        return (comment);
    }

}

export default PostCommentList;