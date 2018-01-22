import React, { Component } from 'react';
import ReactMde, { ReactMdeCommands } from 'react-mde';
import Button from 'react-bootstrap/lib/Button';

class MarkdownEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reactMdeValue: { text: this.props.text, selection: null },
            editMode: this.props.editMode,
            readOnly: this.props.readOnly
        };
    }

    handleValueChange = (value) => {
        this.setState({ reactMdeValue: value });
    }

    handleEditModeChange = () => {
        this.setState({ editMode: !this.state.editMode });
    }

    render() {

        let options = {
            toolbar: this.state.editMode,
            textarea: this.state.editMode,
            preview: true,
            previewHelp: this.state.editMode
        };

        return (
            <div className="rmd-container">
                by Badanha da Silva - <Button bsStyle="primary" onClick={this.handleEditModeChange}>Toggle Edit</Button>
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
    text: '',
    editMode: false,
    readOnly: true
};

export default MarkdownEditor;