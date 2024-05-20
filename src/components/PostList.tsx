import React from 'react';
import Post from './Post';
import PostItem from './PostItem';
import { TransitionGroup, CSSTransition } from 'react-transition-group';


interface PostListProps {
    posts: Post[];
    remove: (post: Post) => void;
}

const PostList: React.FC<PostListProps> = ({ posts, remove }) => {

    if (!posts.length) {
        return (
            <h1 style={{ textAlign: "center" }}>
                Post not found!
            </h1>
        );
    }

    return (
        <div className="App">
            <TransitionGroup>
                {posts.map((post, index) =>
                    <CSSTransition
                        key={post.id}
                        timeout={500}
                        classNames="post"
                    >
                        <PostItem remove={remove} number={index + 1} post={post} />
                    </CSSTransition>
                )}
            </TransitionGroup>
        </div>
    );
};

export default PostList;
