import { useQuery } from 'react-query';
import { API_URL } from './configs/API_URL';
import axios from 'axios';

const getBlog = (id: string | undefined): Promise<any>=>{
    return axios.get(API_URL?.Blogs?.GET_BLOG_BY_ID + id)
  }
export const GetBlogByid = (id: string | undefined) => {
  return  useQuery(['GET_BLOG_BY_ID', id],()=>getBlog(id))
  };
