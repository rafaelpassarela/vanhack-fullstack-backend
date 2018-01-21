import React, { Component } from 'react';
import MarkdownEditor from './markdown.editor.view';

class HomeMain extends Component {

    render() {
        return (
            <MarkdownEditor text="# Test by prop" />
        );
    }

}

export default HomeMain;