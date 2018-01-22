import React, { Component } from 'react';
import MarkdownEditor from './markdown.editor.view';

class HomeMain extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list: [],
            total: 0,
            category: 0
        };
    }

    componentDidMount() {

        
    }

    render() {
        const data1 = { text: '# Test by prop', id: -1, userName: 'badanha', categoryName: 'Games' };
        const data2 = { text: '## Outro teste ', id: -1, userName: 'Joselito', categoryName: 'General' };
        return (
            <div>
                <MarkdownEditor detail={data1} readOnly={true} />
                <MarkdownEditor detail={data2} readOnly={true} />
            </div>
        );
    }

}

export default HomeMain;