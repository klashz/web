import { useMemo } from "react";

export const useSortedPosts = (posts: any[], sort: string): any[] => {
    const sortedPosts = useMemo(() => {
        if (sort) {
            return [...posts].sort((a, b) => a[sort].localeCompare(b[sort]));
        }
        return posts;
    }, [sort, posts]);

    return sortedPosts;
};

export const usePosts = (posts: any[], sort: string, query: string): any[] => {
    const sortedPosts = useSortedPosts(posts, sort);

    const sortedAndSearchedPosts = useMemo(() => {
        return sortedPosts.filter(post => post.title.toLocaleLowerCase().includes(query.toLocaleLowerCase()));
    }, [sortedPosts, query]);

    return sortedAndSearchedPosts;
};