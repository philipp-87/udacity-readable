import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, Icon } from 'semantic-ui-react';
import { addPost, togglePostModal } from '../../actions';
import * as ReadableAPI from '../../utils/ReadableAPI';
import PostAddForm from "./PostAddForm";
var _ = require('lodash');

class PostAddModalElement extends Component {

    submitPost = values => {
        console.log(values);
        ReadableAPI.createPost({
            title: values.title,
            owner: values.author,
            category: values.category,
            body: values.body
        }).then(post => {
            this.props.createPost(post);
        }).then(() => {
            this.toggleModal();
        });
    };

    toggleModal(){
        this.props.togglePostModal(this.props.isOpenPostModal)
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
            <Modal open={this.props.open}>
                <Modal.Header>
                    Add Post
                    <Button style={{float: 'right'}} onClick={() => this.toggleModal()} icon>
                        <Icon name='close'/>
                    </Button>
                </Modal.Header>
                <Modal.Content>
                  <Modal.Description>
                    <PostAddForm onSubmit={this.submitPost} />
                  </Modal.Description>
                </Modal.Content>
            </Modal>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createPost: data => dispatch(addPost(data)),
        togglePostModal: data => dispatch(togglePostModal(data)),
    };
}

function mapStateToProps(state) {
    return {
        categories: state.reducer.categories,
        isOpenPostModal: state.reducer.modal.postModal
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostAddModalElement);
