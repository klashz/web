import React, { useEffect, useState } from 'react';
import PostList from '../components/PostList';
import PostForm from '../components/PostForm';
import PostFilter from '../components/PostFilter';
import "../styles/App.css";
import MyModal from '../components/UI/modals/Modal';
import Post from '../components/Post';
import MyButton from '../components/UI/button/Button';
import { usePosts } from '../hooks/usePosts';
import { useFetching, UseFetchingResult} from '../hooks/useFetching';
import PostService from '../backend/Service';
import Loader from '../components/UI/loader/Loader';
import { getPageCount, getPagesArray } from '../components/utils/pages';
import Pagination from '../components/UI/pagination/Pagination';
import IFilter from '../components/Filter';

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filter, setFilter] = useState<IFilter>({ sort: '', query: '' });
  const [modal, setModal] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  const pagesArray = getPagesArray(totalPages);
  
  const result: UseFetchingResult = useFetching(async () => {
    const response = await PostService.getALL(limit, page);
    setPosts(response.data);
    const totalCount = response.headers['x-total-count'];
    setTotalPages(getPageCount(Number(totalCount), limit));
  });

  useEffect(() => {
    result.fetching();
  }, [page]);

  const createPost = (newPost: Post) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  const removePost = (post: Post) => {
    setPosts(posts.filter(p => p.id !== post.id));
  };

  const changePage = (page: number) => {
    setPage(page);
  };

  return (
    <div className="App">
      <MyButton style={{ marginTop: 30 }} onClick={() => setModal(true)}>
        Создать пользователя
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <hr style={{ margin: '15px 0' }} />
      <PostFilter filter={filter} setFilter={setFilter} />
      {result.error && <h1>Произошла ошибка {result.error}</h1>}
      {result.isLoading ? (
        <div style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
          <Loader />
        </div>
      ) : (
        <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Посты" />
      )}
      <Pagination page={page} changePage={changePage} totalPages={totalPages} />
    </div>
  );
};

export default Posts;
