import React, { useState, ChangeEvent, FormEvent } from "react";
import Post from "./Post";
import MyButton from "./view/button/Button";
import MyInput from "./view/input/Input";


interface PostFormProps {
    create: (post: Post) => void;
}

const PostForm: React.FC<PostFormProps> = ({ create }) => {
    const [post, setPost] = useState<Post>({ title: '', content: '', body: ''});
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setPost(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        let currentBlocks = document.getElementsByClassName("post").length;
        console.log(post.content);

        const newPost: Post = { content: post.body, title: post.title, body: post.content, id: currentBlocks};
        create(newPost);
        // setPost({ title: '', content: '', body: ''});
    };

    return (
        <form onSubmit={handleSubmit}>
            <MyInput 
                value={post.title}
                onChange={handleInputChange}
                name="title"
                type="text" 
                placeholder="Name post" 
            />

            <MyInput 
                value={post.content}
                onChange={handleInputChange}
                name="content"
                type="text" 
                placeholder="Description post" 
            />

            <MyButton type="submit">Create post</MyButton>
        </form>
    );
};

export default PostForm;
