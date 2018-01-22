import React, { Component } from 'react';
import MarkdownEditor from '../markdown.editor.view';

class PostNewView extends Component {
    
    render() {
        
        return (
            <div>
                <MarkdownEditor text="" editMode="true" readOnly="false" />
            </div>
        );

    }

}

export default PostNewView;
