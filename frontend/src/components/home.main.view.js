import React, { Component } from 'react';
import MarkdownEditor from './markdown.editor.view';
import Alert from 'react-bootstrap/lib/Alert';
import { getUser } from '../helpers/cookie.helper';
import { getCategoryList } from '../helpers/get.category.list';

class HomeMain extends Component {
    constructor(props) {
        super(props);

        this.fetchData = this.fetchData.bind(this);
        this.categoryCallback = this.categoryCallback.bind(this);

        this.state = {
            error: undefined,
            userName: '',
            list: [],
            categoryList: [],
            total: 0,
            category: 0,
            loading: true,
            message: ''
        };
    }

    fetchData() {
        this.setState({ error: undefined, loading: true, message: '' });

        fetch("http://localhost:54163/api/PostData/GetList", {
            method: 'GET',
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(this.props.data)
        })
            .then(res => {
                return res.json();
            })
            .then(
            (result) => {
                this.setState({
                    loading: false,
                    total: result.Records,
                    list: result.List
                });
            },
            (error) => {
                this.setState({
                    loading: false,
                    error,
                    message: error.message + ' - ' + error.stack
                });
            });
    }

    categoryCallback(newData) {
        this.setState({ categoryList: newData });
    }

    componentDidMount() {
        getCategoryList(this.categoryCallback);
        let user = getUser();
        this.setState({
            userName: user
        });

        this.fetchData();
    }

    render() {

        if (!this.state.error && this.state.categoryList.length === 0) {
            return <span>Loading...</span>
        }

        if (this.state.list === undefined) {
            return (
                <div>
                    <Alert bsStyle="danger">
                        <h4>Oh snap! We found an error!</h4>
                        {this.state.message}
                    </Alert>
                </div>);
        }

        if (this.state.error) {
            return (
                <div>
                    <Alert bsStyle="danger">
                        <h4>Oh snap! We found an error!</h4>
                        {this.state.error.message}
                    </Alert>
                </div>);
        }

        const content =
            <div>
                {this.state.list.map((data, i) =>
                    <div key={'dv' + i}>
                        <MarkdownEditor
                            key={'me' + i} detail={data}
                            readOnly={data.userName !== this.state.userName}
                            categoryList={this.state.categoryList} />
                        <hr key={'hr' + i} />
                    </div>
                )}
            </div>;

        return (content);
    }

}

export default HomeMain;