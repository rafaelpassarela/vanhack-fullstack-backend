import React, { Component } from 'react';
import MarkdownEditor from './markdown.editor.view';
import Alert from 'react-bootstrap/lib/Alert';
import PostCommentList from './comment/post.comment.list';
import { getUser } from '../helpers/cookie.helper';
import { getCategoryList } from '../helpers/get.category.list';

class HomeMain extends Component {
    constructor(props) {
        super(props);

        this.fetchData = this.fetchData.bind(this);
        this.categoryCallback = this.categoryCallback.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.state = {
            eof: false,
            lastUrl: '',
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

    handleScroll() {
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset;
        if (windowBottom >= docHeight - 100) {
            this.setState({
                message: 'bottom reached'
            });
            if (this.state.total !== this.state.list.length) {
                this.fetchData();
            }
        } else {
            this.setState({
                message: 'not at bottom'
            });
        }
    }

    fetchData() {
        let url = "http://localhost:54163/api/PostData/GetList?by=3";
        //if (this.state.list.length < this.state.total) {
        url += "&from=" + this.state.list.length;
        //}

        if (this.state.lastUrl === url)
            return;

        this.setState({
            error: undefined,
            loading: true, message: '',
            lastUrl: url
        });

        fetch(url, {
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
                let current = this.state.list;
                for (let i = 0; i < result.List.length; i++) {
                    current.push(result.List[i]);
                }
                
                this.setState({
                    loading: false,
                    lastSize: result.List.length,
                    total: result.Records,
                    list: current
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
        window.addEventListener("scroll", this.handleScroll);
        getCategoryList(this.categoryCallback);
        let user = getUser();
        this.setState({
            userName: user
        });

        this.fetchData();
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
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
                        <PostCommentList list={data.comments} userEmail={this.state.userName} postID={data.id} />
                        <hr key={'hr' + i} />
                    </div>
                )}
            </div>;

        return (content);
    }

}

export default HomeMain;