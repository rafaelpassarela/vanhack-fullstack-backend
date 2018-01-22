import React, { Component } from 'react';
import MarkdownEditor from './markdown.editor.view';

class HomeMain extends Component {

    render() {
        return (
            <div>
                <MarkdownEditor text="# Test by prop" readOnly="true" />
            </div>
        );
    }

}

export default HomeMain;