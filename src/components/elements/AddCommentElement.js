import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  Form } from 'semantic-ui-react';
import { addCommentAsync } from '../../actions';

class AddCommentElement extends Component {

    state = {
        owner: ' ', 
        message: ' '
    }

    handleChange = (e, { name, value }) => {
        this.setState({ [name]: value })
    }

    handleSubmit = (event) => {
        this.submitComment();
        this.setState({ 
            owner: ' ', 
            message: ' '
        })
        event.preventDefault();
    }

    submitComment(){
        const { createComment } = this.props;
        createComment({
            body: this.state.message,
            owner: this.state.owner, 
            parentId: this.props.post.id
        });
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit} reply>
                <Form.Input value={this.state.owner} name='owner' placeholder='Your name' onChange={this.handleChange}/>
                <Form.TextArea value={this.state.message} name='message' placeholder='Your message' onChange={this.handleChange}/>
                <Form.Button content='Add comment' labelPosition='left' icon='edit' primary />
            </Form>
            
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createComment: data => dispatch(addCommentAsync(data)),
    };
}

function mapStateToProps() {
    return { };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCommentElement);
