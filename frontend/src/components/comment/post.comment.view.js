import React, { Component } from 'react';

class PostCommentView extends Component {

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

export default PostCommentView;