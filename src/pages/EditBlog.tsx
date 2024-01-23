import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import Input from '../component/ui/input';
import { useParams } from 'react-router-dom';
import { GetBlogByid } from '../apis/GetBlogById';
import Buttons from '../component/ui/Button';
import { useBlogUpdate } from '../apis/UpdateBlog';
import Spinner from '../component/context/Spinner';
import SnackbarComponent from '../component/context/Notification';

const EditBlog: React.FC = () => {
  const { blogId } = useParams();
  const blog = GetBlogByid(blogId);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [imgUrl, setImgUrl] = useState<string>('');
 const { mutate: updateBlog, isLoading, isSuccess, isError}= useBlogUpdate();
 
  useEffect(()=>{
    setTitle(blog?.data?.data?.title);
    setContent(blog?.data?.data?.content);
    setImgUrl(blog?.data?.data?.imgUrl);
  },[blog?.isSuccess])

  const handleInputTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleInputImgUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImgUrl(e.target.value);
  };
  const handleInputContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const handleEditBlog = () => {
    if (blogId !== undefined) {
      const data ={
        title: title , 
        content: content, 
        imgUrl: imgUrl
      }
      updateBlog({blogId, data})
    }
  };
 
  return (
    <>
    <Card sx={{ maxWidth: '70%', margin: 'auto', marginTop: 3 }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Update Blog
        </Typography>
        <Input
          label="Title"
          name="title"
          fullWidth
          margin="normal"
          variant="outlined"
          value={title}
          onChange={handleInputTitleChange}
          InputLabelProps={{ shrink: true }}
        />
        <Input
          label="Content"
          name="content"
          fullWidth
          margin="normal"
          variant="outlined"
          multiline={true}
          rows={15}
          value={content}
          onChange={handleInputContentChange}
          InputLabelProps={{ shrink: true }}
        />
        <Input
          label="Image URL"
          name="imgUrl"
          fullWidth
          margin="normal"
          variant="outlined"
          value={imgUrl}
          onChange={handleInputImgUrlChange}
          InputLabelProps={{ shrink: true }}
        />
        <Buttons  lable="Update Blog" variant="contained" color="secondary" onClick={handleEditBlog} sx={{ marginTop: 2 }}/>
      </CardContent>
    </Card>
    {isLoading?<Spinner loading={isLoading}/>: null }
    {isSuccess?<SnackbarComponent message='Blog Create  successfully ..!' severity='success' open={isSuccess}/>: null }
    {isError?<SnackbarComponent message='Blog Create unsuccessfully ..!' severity='error' open={isError}/>: null }
    </>
  );
};

export default EditBlog;
