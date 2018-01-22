import React, { Component } from 'react';
import MarkdownEditor from '../markdown.editor.view';
import { getUser } from '../../helpers/cookie.helper';
import { getCategoryList } from '../../helpers/get.category.list';

class PostNewView extends Component {
    constructor(props) {
        super(props);

        this.categoryCallback = this.categoryCallback.bind(this);

        this.state = { categories: [] };
    }

    categoryCallback(newData) {
        this.setState({ categories: newData });
    }

    componentDidMount() {
        getCategoryList(this.categoryCallback);
    }

    render() {

        const data = { text: '', id: -1, userName: getUser(), categoryName: '', categoryID: 1 };
        const list = this.state.categories;

        return (
            <div>
                <MarkdownEditor detail={data} readOnly={false} editMode={true} categoryList={list} />
            </div>
        );

    }

}

export default PostNewView;
