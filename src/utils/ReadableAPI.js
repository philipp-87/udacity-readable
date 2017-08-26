import { getUUID } from './helpers';

const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:5001';

let token = localStorage.token;

if (!token) token = localStorage.token = Math.random().toString(36).substr(-8);

const headers = {
    Accept: 'application/json',
    Authorization: token
};

export const getCategories = () =>
    fetch(`${api}/categories`, { method: 'GET', headers })
        .then(res => res.json())
        .then(data => data.categories);

export const getPostsByCategory = category =>
    fetch(`${api}/${category}/posts`, { method: 'GET', headers }).then(res =>
        res.json()
    );

export const getPosts = () =>
    fetch(`${api}/posts`, { method: 'GET', headers }).then(res => res.json());

export const createPost = data =>
    fetch(`${api}/posts`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: getUUID(),
            timestamp: Date.now(),
            title: data.title,
            body: data.body,
            owner: data.owner,
            category: data.category
        })
    }).then(res => res.json());

export const getPost = id =>
    fetch(`${api}/posts/${id}`, { method: 'GET', headers }).then(res =>
        res.json()
    );

export const votePost = (id, data) =>
    fetch(`${api}/posts/${id}`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            option: data
        })
    }).then(res => res.json());

export const editPost = (id, data) =>
    fetch(`${api}/posts/${id}`, {
        method: 'PUT',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: data.title,
            body: data.body
        })
    }).then(res => res.json());

export const deletePost = id =>
    fetch(`${api}/posts/${id}`, { method: 'DELETE', headers });

export const getCommentsByPostId = id =>
    fetch(`${api}/posts/${id}/comment`, { method: 'GET', headers }).then(res =>
        res.json()
    );

export const createComment = data =>
    fetch(`${api}/comments`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: getUUID(),
            timestamp: Date.now(),
            body: data.body,
            owner: data.owner,
            parentId: data.parentId
        })
    }).then(res => res.json());

export const getComment = id =>
    fetch(`${api}/comments/${id}/`, { method: 'GET', headers }).then(res =>
        res.json()
    );

export const voteComment = (id, data) =>
    fetch(`${api}/comments/${id}`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            option: data.option
        })
    }).then(res => res.json());

export const editComment = (id, data) =>
    fetch(`${api}/comments/${id}`, {
        method: 'PUT',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            timestamp: data.timestamp,
            body: data.body
        })
    }).then(res => res.json());

export const deleteComment = id =>
    fetch(`${api}/comments/${id}`, { method: 'DELETE', headers });

//   GET /categories
// USAGE:
// Get all of the categories available for the app. List is found in categories.js. Feel free to extend this list as you desire.

// GET /:category/posts
// USAGE:
// Get all of the posts for a particular category

// GET /posts
// USAGE:
// Get all of the posts. Useful for the main page when no category is selected.

// POST /posts
// USAGE:
// Add a new post

// PARAMS:
// id - UUID should be fine, but any unique id will work
// timestamp - timestamp in whatever format you like, you can use Date.now() if you like
// title - String
// body - String
// owner - String
// category: Any of the categories listed in categories.js. Feel free to extend this list as you desire.

// GET /posts/:id
// USAGE:
// Get the details of a single post

// POST /posts/:id
// USAGE:
// Used for voting on a post

// PARAMS:
// option - String: Either "upVote" or "downVote"

// PUT /posts/:id
// USAGE:
// Edit the details of an existing post

// PARAMS:
// title - String
// body - String

// DELETE /posts/:id
// USAGE:
// Sets the deleted flag for a post to 'true'.
// Sets the parentDeleted flag for all child comments to 'true'.
////////////////////////////////////////////////////////////////////////////////////////
// GET /posts/:id/comments
// USAGE:
// Get all the comments for a single post

// POST /comments
// USAGE:
// Add a comment to a post

// PARAMS:
// id: Any unique ID. As with posts, UUID is probably the best here.
// timestamp: timestamp. Get this however you want.
// body: String
// owner: String
// parentId: Should match a post id in the database.

// GET /comments/:id
// USAGE:
// Get the details for a single comment

// POST /comments/:id
// USAGE:
// Used for voting on a comment.

// PUT /comments/:id
// USAGE:
// Edit the details of an existing comment

// PARAMS:
// timestamp: timestamp. Get this however you want.
// body: String

// DELETE /comments/:id
// USAGE:
// Sets a comment's deleted flag to 'true'
