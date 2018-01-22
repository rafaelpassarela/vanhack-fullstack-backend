import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactMde, { ReactMdeCommands } from 'react-mde';
import Button from 'react-bootstrap/lib/Button';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import { Redirect } from 'react-router';

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
        this.setState({ reactMdeValue: value });
    }

    handleEditModeChange = () => {
        this.setState({ editMode: !this.state.editMode });
    }

    handleCancelChanges = () => {
        this.setState({
            canceled: true,
            editMode: false,
            reactMdeValue: {
                text: this.state.detail.text
            }
        });
    }

    renderCategorySelect() {
        const selected = this.state.detail.categoryId;
        return (
            <select defaultValue={selected}>
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
        
        if (!this.state.readOnly) {
            control = (this.state.editMode) ?
                (<span>
                    <Button bsStyle="success" onClick={this.handleEditModeChange}>Save</Button>&nbsp;&nbsp;&nbsp;
                    <Button bsStyle="danger" onClick={this.handleCancelChanges}>Cancel</Button>
                </span>
                ): (
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
                    <Col xs={12} sm={6} md={6} lg={6}>
                        by <b>{this.state.detail.userName}</b>    <Glyphicon glyph="tags" /> {categoryEdit}
                    </Col>
                    <Col xs={12} sm={5} md={5} lg={5}>
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