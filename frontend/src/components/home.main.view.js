import React, { Component } from 'react';
import MarkdownEditor from './markdown.editor.view';

class HomeMain extends Component {

    render() {
        return (
            <div>
                <MarkdownEditor text="# Test by prop" />
            </div>
        );
    }

}

export default HomeMain;