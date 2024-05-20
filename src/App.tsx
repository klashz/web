import React, { useEffect, useState, useRef } from 'react';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import PostFilter from './components/PostFilter';
import "./styles/App.css";
import MyModal from './components/view/modals/Modal';
import MyButton from './components/view/button/Button';
import Post from './components/Post';
import { usePosts } from './hooks/usePosts';
import { useFetching, UseFetchingResult } from './hooks/useFetching';
import PostService from './backend/Service';
import Loader from './components/view/loader/Loader';
import { getPageCount, getPagesArray } from './components/utils/pages';
import Pagination from './components/view/pagination/Pagination';
import IFilter from './components/Filter';


const Posts: React.FC = () => {
  let totalCount = 0;
  const [posts, setPosts] = useState<Post[]>([]);
  const [filter, setFilter] = useState<IFilter>({ sort: '', query: '' });
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit] = useState(10);
  const [page, setPage] = useState(1);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const lastElement = useRef<HTMLDivElement>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  let pagesArray = getPagesArray(totalPages);
  const result: UseFetchingResult = useFetching(async () => {
    const response = await PostService.getALL(limit, page);
    setPosts((prevPosts) => [...prevPosts, ...response.data]);
    const totalCount = response.headers['x-total-count'];
    setTotalPages(getPageCount(totalCount, limit));
  });

  useEffect(() => {
    if (result.isLoading) return;
    if (observer.current) observer.current.disconnect();
    const callback = function (entries: IntersectionObserverEntry[]) {
      if (entries[0].isIntersecting && page < totalPages) {
        setPage((prevPage) => prevPage + 1);
      }
    };
    observer.current = new IntersectionObserver(callback);
    if (lastElement.current) {
      observer.current.observe(lastElement.current);
    }
  }, [result.isLoading, page, totalPages]);

  useEffect(() => {
    result.fetching ();
  }, [page]);

  const createPost = (newPost: Post) => {
    setPosts((prevPosts) => [...prevPosts, newPost]);
    setModal(false);
  };

  const removePost = (post: Post) => {
    setPosts((prevPosts) => prevPosts.filter((p) => p.id !== post.id));
  };

  const changePage = (page: number) => {
    setPage(page);
  };

  return (
    <div className="App">
      
      <PostFilter filter={filter} setFilter={setFilter} />
      {result.error && <h1>Error ${result.error}</h1>}
      <MyButton style={{ marginTop: 5, width: "100%" }} onClick={() => setModal(true)}>
        Create post
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <PostList remove={removePost} posts={sortedAndSearchedPosts} />
      
      <div ref={lastElement} style={{height: 50, background: 'gray'}} />
      {result.isLoading && (
        <div style={{ display: "flex", justifyContent: "center", margin: 50}}>
          <Loader />
        </div>
      )}
      <Pagination page={page} changePage={changePage} totalPages={totalPages} />
    </div>
  );
};

export default Posts;