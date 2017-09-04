import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, Form, TextArea } from 'semantic-ui-react';
import { addPost } from '../../actions';
import * as ReadableAPI from '../../utils/ReadableAPI';
var _ = require('lodash');

class AddPostModalElement extends Component {

    state = {isOpen: false}

    handleChange = (e, { name, value }) => {
        this.setState({ [name]: value })
    }

    handleSubmit = () => {
        this.submitPost();
        this.setState({ 
            title: '', 
            owner: '', 
            category: '', 
            message: '', 
            isOpen: false })
    }

    openModal = () => {
        this.setState({isOpen: true});
    }

    submitPost(){
        const { createPost } = this.props;
        ReadableAPI.createPost({
            title: this.state.title, 
            owner: this.state.owner, 
            category: this.state.category, 
            body: this.state.message}).then(post => {
            createPost(post);
        });
    }

    render() {
        console.log(this.props);
        const { categories } = this.props;
        categories.map(category => {
            category['key'] = category.name
            category['text'] = _.upperFirst(category.name)
            category['value'] = category.name
            delete category['path']; 
            return category;
        })

        return (
            <Modal open={this.state.isOpen} trigger={<Button onClick={this.openModal}>Add Post</Button>}>
                <Modal.Header>Add Post</Modal.Header>
                <Modal.Content>
                  <Modal.Description>
                    <Form onSubmit={this.handleSubmit}>
                    <Form.Group widths='equal'>
                      <Form.Input label='Title' name='title' placeholder='e.g. redux is great' onChange={this.handleChange}/>
                      <Form.Input label='Owner' name='owner' placeholder='e.g. Philipp' onChange={this.handleChange}/>
                      <Form.Select label='Category' name='category' options={categories} placeholder='e.g. Redux' onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group widths='equal'>
                      <Form.Field control={TextArea} label='Message' name='message' placeholder='What do you think...' onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Button>Submit</Form.Button>
                  </Form>
                  </Modal.Description>
                </Modal.Content>
            </Modal>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createPost: data => dispatch(addPost(data)),
    };
}

function mapStateToProps(state) {
    return {categories: state.reducer.categories};
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPostModalElement);
