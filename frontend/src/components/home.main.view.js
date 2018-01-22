import React, { Component } from 'react';
import MarkdownEditor from './markdown.editor.view';

class HomeMain extends Component {

    render() {
        const data = { text: '# Test by prop', id: -1, userName: 'badanha', categoryName: 'Games' };
        return (
            <div>
                <MarkdownEditor detail={data} readOnly={true}  />
            </div>
        );
    }

}

export default HomeMain;