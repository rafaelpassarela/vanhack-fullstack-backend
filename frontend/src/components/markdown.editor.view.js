import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactMde, { ReactMdeCommands } from 'react-mde';
import { Redirect } from 'react-router';
import Button from 'react-bootstrap/lib/Button';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

import PostController from './posts/post.controller';

//import PostModel from '../model/post.model';

class MarkdownEditor extends Component {
    constructor(props) {
        super(props);
        this.renderCategorySelect = this.renderCategorySelect.bind(this);

        this.state = {
            reactMdeValue: { text: this.props.detail.text, selection: null },
            editMode: this.props.editMode,
            readOnly: this.props.readOnly,
            detail: this.props.detail,
            canceled: false
        };
    }

    handleValueChange = (value) => {
        let det = {
            categoryName: this.state.detail.categoryName,
            categoryId: this.state.detail.categoryId,
            id: this.state.detail.id,
            text: value.text,
            userName: this.state.detail.userName
        };
        this.setState({ reactMdeValue: value, detail: det });
    }

    handleCategoryChange = (e) => {
        let det = {
            categoryName: this.state.detail.categoryName,
            categoryId: e.target.value,
            id: this.state.detail.id,
            text: this.state.detail.text,
            userName: this.state.detail.userName
        };
        this.setState({ detail: det });
    }

    handleEditModeChange = () => {
        this.setState({ editMode: !this.state.editMode });
    }

    handleCancelChanges = () => {
        this.setState({
            canceled: true,
            editMode: false,
            reactMdeValue: {
                text: this.props.detail.text
            }
        });
    }

    renderCategorySelect() {
        const selected = this.state.detail.categoryId;
        return (
            <select defaultValue={selected} onChange={this.handleCategoryChange}>
                {this.props.categoryList.map((data, i) =>
                    <option key={i} value={data.id}>{data.name}</option>
                )};
            </select>
        );
    }

    render() {

        let options = {
            toolbar: this.state.editMode,
            textarea: this.state.editMode,
            preview: true,
            previewHelp: this.state.editMode
        };

        if (this.state.canceled && this.state.detail.id === -1) {
            return <Redirect to='/' />;
        }

        let control = undefined;
        let data = this.state.detail;

        if (!this.state.readOnly) {
            control = (this.state.editMode) ?
                (<span>
                    <PostController data={data} onCancel={this.handleCancelChanges} />
                </span>
                ) : (
                    <span>
                        <Button bsStyle="link" onClick={this.handleEditModeChange}>Edit</Button>
                    </span>);
        }

        const categoryEdit = (!this.state.readOnly && this.state.editMode) ?
            (
                <span>
                    {this.renderCategorySelect()}
                </span>
            ) : (
                <span>{this.state.detail.categoryName}</span>
            );

        return (
            <div className="rmd-container">
                <Row className="show-grid">
                    <Col xs={12} sm={12} md={12} lg={12}>
                        by <b>{this.state.detail.userName}</b>    <Glyphicon glyph="tags" /> {categoryEdit}
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                        {control}
                    </Col>
                </Row>

                <ReactMde
                    textAreaProps={{
                        id: 'ta1',
                        name: 'ta1',
                    }}
                    value={this.state.reactMdeValue}
                    onChange={this.handleValueChange}
                    commands={ReactMdeCommands.getDefaultCommands()}
                    visibility={options}
                />
            </div>
        )
    }
}

MarkdownEditor.defaultProps = {
    editMode: false,
    readOnly: true
};

MarkdownEditor.propTypes = {
    detail: PropTypes.object.isRequired,
    categoryList: PropTypes.array
}

export default MarkdownEditor;