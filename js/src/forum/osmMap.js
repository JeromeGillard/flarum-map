import app from 'flarum/app';
import {extend} from 'flarum/extend';
import Post from 'flarum/components/Post';

/* global $ */

export default function () {
    extend(Post.prototype, 'oncreate', function () {
        let postId = this.attrs.post.id();
        console.log("Found post id:", postId);
    });
}