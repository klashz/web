import React, { ChangeEvent } from "react";
import MySelect from "./view/select/MySelect";
import MyInput from "./view/input/Input";

interface Filter {
    query: string;
    sort: string;
}

interface PostFilterProps {
    filter: Filter;
    setFilter: React.Dispatch<React.SetStateAction<Filter>>;
}

const PostFilter: React.FC<PostFilterProps> = ({ filter, setFilter }) => {
    return (
        <div>
            <MyInput
                value={filter.query}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setFilter({ ...filter, query: e.target.value })}
                placeholder="Search..."
            />
            <MySelect
                value={filter.sort}
                onChange={(selectedSort: string) => setFilter({ ...filter, sort: selectedSort })}
                defaultValue="Sort"
                options={[
                    { value: "title", name: "by name" },
                    { value: "body", name: "by content" },
                ]}
            />
        </div>
    );
};

export default PostFilter;
