import { useQuery } from 'react-query';
import { API_URL } from './configs/API_URL';
import axios from 'axios';

type Blogs = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  imgUrl?: string | null;
}
interface Response {
  data: Blogs[];
  first: number;
  last:number;
  items:number;
  next:number;
  pages:number;
  prev:number;
}

type GetBlogsQueryParams = {
  searchString: string;
  page : number;
  rowsPerPage: number;
}

export const FetchBlogs = () => {
  return  useQuery('GET_BLOGS',()=>{
    return axios.get(API_URL?.Blogs?.GET_PAGINATED_BLOGS)
  });
};
