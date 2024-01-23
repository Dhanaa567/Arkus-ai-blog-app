import { useMutation } from 'react-query';
import { API_URL } from './configs/API_URL';
import axios from 'axios';

const updateBlog = (blogId: string, data: any): Promise<any>=>{
    return axios.put(API_URL?.Blogs?.UPDATE_BLOG_BY_ID + blogId, data)
}

export const useBlogUpdate = () => {
  return  useMutation<any, Error, {blogId:string, data: any }>(
    ({ blogId,data }) => updateBlog(blogId,data ),
  );
};
