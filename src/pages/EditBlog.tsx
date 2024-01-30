import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, TextField } from '@mui/material';

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
  const [cretedAt, setCretedAt] = useState<string>('');
  const [titleError, setTitleError] = useState<boolean>(false);
  const [contentError, setContentError] = useState<boolean>(false);
  const [titleHelperText, setTitleHelperText] = useState<string>('');
  const [contentHelperText, setContenHelperText] = useState<string>('');

 const { mutate: updateBlog, isLoading, isSuccess, isError}= useBlogUpdate();
 
  useEffect(()=>{
    setTitle(blog?.data?.data?.title);
    setContent(blog?.data?.data?.content);
    setImgUrl(blog?.data?.data?.imgUrl);
    setCretedAt(blog?.data?.data?.createdAt);
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

  const getTimestamp=(): string => {
    const currentDate = new Date();
    const formattedTimestamp = currentDate.toISOString().slice(0, -1); // Remove the 'Z' at the end
    return formattedTimestamp;
  }

  const handleEditBlog = () => {
    if (blogId !== undefined) {
      const data ={
        title: title , 
        content: content, 
        imgUrl: imgUrl,
        createdAt: cretedAt,
        updatedAt: getTimestamp()
      }
      if(title === ''){
        setTitleError(true);
        setTitleHelperText('Title is requred ..');
      }else if(content === ''){
        setTitleError(false);
        setTitleHelperText('');
        setContentError(true);
        setContenHelperText('Content is requred ..');
      }else if(content?.length < 500){
        setTitleError(false);
        setTitleHelperText('');
        setContentError(true);
        setContenHelperText('Content must be minimum 500 charasterics ..');
      }else{
        setTitleError(false);
        setTitleHelperText('');
        setContentError(false);
        setContenHelperText('');
        updateBlog({blogId, data});
      }
      
    }
  };
 
  return (
    <>
    <Card sx={{ maxWidth: '70%', margin: 'auto', marginTop: 3 }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Update Blog
        </Typography>
        <TextField
          label="Title"
          name="title"
          fullWidth
          margin="normal"
          variant="outlined"
          value={title}
          error={titleError}
          helperText={titleHelperText}
          onChange={handleInputTitleChange}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Content"
          name="content"
          fullWidth
          margin="normal"
          variant="outlined"
          multiline={true}
          rows={15}
          value={content}
          error={contentError}
          helperText={contentHelperText}
          onChange={handleInputContentChange}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
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
    {isSuccess?<SnackbarComponent message='Blog update  successfully ..!' severity='success' open={isSuccess}/>: null }
    {isError?<SnackbarComponent message='Blog update unsuccessfully ..!' severity='error' open={isError}/>: null }
    </>
  );
};

export default EditBlog;
