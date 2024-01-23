import { useMutation } from 'react-query';
import { API_URL } from './configs/API_URL';
import axios from 'axios';

interface BlogData {
    id: string;
    title: string;
    content: string;
    imgUrl: string | null;
}

const createBlog = (data: BlogData): Promise<any>=>{
    return axios.post(API_URL?.Blogs?.CREATE_BLOG_BY_ID, data)
}

export const useBlogCreate = () => {
  return  useMutation<any, Error, { data: BlogData }>(
    ({ data }) => createBlog( data ),
  );
};