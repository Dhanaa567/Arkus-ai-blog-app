import React, { useState } from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import Input from '../component/ui/Input';
import { useBlogCreate } from '../apis/CreateBlog';
import SnackbarComponent from '../component/context/Notification';
import { v1 as uuidv1 } from 'uuid';
import Spinner from '../component/context/Spinner';

interface NewBlogProps {
  onCreate: (newBlog: { title: string; content: string; imgUrl: string }) => void;
}

interface BlogData {
  id: string;
  title: string;
  content: string;
  imgUrl: string | null;
}

const NewBlog: React.FC<NewBlogProps> = ({  }) => {
  const { mutate: createBlog , isSuccess, isError, error, isLoading, data} = useBlogCreate();
  
  const [blogData, setBlogData] = useState<BlogData>({ id: uuidv1(),  title: '', content: '', imgUrl: null });
  const [titleError, setTitleError] = useState<boolean>(false);
  const [contentError, setContentError] = useState<boolean>(false);
  const [titleHelperText, setTitleHelperText] = useState<string>('');
  const [contentHelperText, setContenHelperText] = useState<string>('');
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBlogData((prevData) => ({ ...prevData, [name]: value }));
  };

  React.useMemo(()=>{
    setBlogData((prevData) => ({ ...prevData, id: uuidv1() }));
  },[data])

  const handleCreateBlog = () => {
    if(blogData?.title === ''){
      setTitleError(true)
      setTitleHelperText('Title is requered...')
    } else if(blogData?.content === ''){
      setTitleError(false)
      setTitleHelperText('')
      setContentError(true)
      setContenHelperText('Content is requered...')
    } else{
      setTitleError(false)
      setTitleHelperText('')
      setContentError(false)
      setContenHelperText('')
      setBlogData({ id: uuidv1(),  title: '', content: '', imgUrl: null })
      createBlog({data: blogData});
    }
  };

  return (
    <Card sx={{ maxWidth: '70%', margin: 'auto', marginTop: 3 }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Create a New Blog
        </Typography>
        <Input
          label="Title"
          name="title"
          fullWidth
          margin="normal"
          variant="outlined"
          value={blogData?.title}
          required={true}
          error={titleError}
          helperText={titleHelperText}
          onChange={handleInputChange}
        />
        <Input
          label="Content"
          name="content"
          fullWidth
          margin="normal"
          variant="outlined"
          multiline={true}
          rows={15}
          value={blogData.content}
          required={true}
          error={contentError}
          helperText={contentHelperText}
          onChange={handleInputChange}
        />
        <Input
          label="Image URL"
          name="imgUrl"
          fullWidth
          margin="normal"
          variant="outlined"
          value={blogData.imgUrl}
          required={false}
          onChange={handleInputChange}
        />
        <Button variant="contained" color="success" onClick={handleCreateBlog} sx={{ marginTop: 2 }}>
          Create Blog
        </Button>
      </CardContent>
      
      {isLoading?<Spinner loading={isLoading}/>: null }
      {isSuccess?<SnackbarComponent message='Blog Create  successfully ..!' severity='success' open={isSuccess}/>: null }
      {isError?<SnackbarComponent message='Blog Create unsuccessfully ..!' severity='error' open={isError}/>: null }
    </Card>
  );
};

export default NewBlog;


