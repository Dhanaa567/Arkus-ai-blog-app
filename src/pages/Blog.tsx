import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom'
import { GetBlogByid } from '../apis/GetBlogById';
import emptyImg from "../assets/emptyimage.jpg";

interface BlogData {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  imgUrl: string;
}

interface FullPageComponentProps {
  data: BlogData;
}

 const Blog: React.FC<FullPageComponentProps> = () => {
 const { blogId } = useParams();
 const blog = GetBlogByid(blogId);
  return (
    <Card  sx={{ display: 'flex', margin: 6}}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto', width: '90%'}}>
          <Typography component="div" variant="h4">
            {blog?.data?.data?.title}
          </Typography>
          <Typography sx={{ marginTop: 2}} variant="subtitle1" color="text.secondary" component="div">
          {blog?.data?.data?.content}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
        <Typography sx={{ marginTop: 2}}  variant="h6" color="text.secondary" component="div">
            createdAt  : 
          </Typography>
        <Typography sx={{ marginTop: 2}}  variant="h6" color="text.secondary" component="div">
        {blog?.data?.data?.createdAt}
          </Typography>
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 500 }}
        image={blog?.data?.data?.imgUrl ? blog?.data?.data?.imgUrl:  emptyImg}
        alt="Live from space album cover"
      />
    </Card>
  );
}

export default Blog;