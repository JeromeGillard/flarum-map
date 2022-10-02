import Post from 'flarum/components/Post';
import { extend } from 'flarum/common/extend';
import HeaderPrimary from 'flarum/forum/components/HeaderPrimary';
import Counter from './customCounter';


/* global $ */
export default function () {
    extend(Post.prototype, 'content', function (content) {
        let postId = this.attrs.post.id();
        console.log("Found post id ", postId), this.attrs.post;
        content.push(
            <Counter buttonLabel="++" pid={postId}/> 
        );
    });

    extend(HeaderPrimary.prototype, 'items', function(items) {
        items.add('google', <a href="https://google.com">Google</a>);
        
    });

    //m.mount(document.body, <Counter buttonLabel="Increment" />);
}