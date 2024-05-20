import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';

type ItemType = {
  id: number;
  title: string;
};

const PaginatedList: React.FC = () => {
  const [items, setItems] = useState<ItemType[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastItemRef = useCallback((node: HTMLDivElement | null) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/items?page=${page}`);
        const newItems: ItemType[] = response.data.items;
        setItems((prevItems) => [...prevItems, ...newItems]);
        setHasMore(newItems.length > 0); // Проверка на наличие данных
      } catch (error) {
        console.error('Error fetching items', error);
      }
      setLoading(false);
    };

    fetchItems();
  }, [page]);

  return (
    <div>
      {items.map((item, index) => {
        if (index === items.length - 1) {
          return (
            <div key={item.id} ref={lastItemRef}>
              {item.title}
            </div>
          );
        } else {
          return <div key={item.id}>{item.title}</div>;
        }
      })}
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default PaginatedList;
