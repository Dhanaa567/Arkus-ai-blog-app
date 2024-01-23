import React, { ChangeEvent, useState } from "react";
import ReusableTable from "../component/context/ReusableTable";
import emptyImg from "../assets/emptyimage.jpg";
import { FetchBlogs } from "../apis/GetAllBlogAPI";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import PreviewIcon from "@mui/icons-material/Preview";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import Spinner from "../component/context/Spinner";
import SnackbarComponent from "../component/context/Notification";
interface MetaDataItem {
  id: number;
  title: string;
  content: string;
  imgUrl?: string | null;
}

interface ProcessedDataItem {
  title: string;
  excerpts: string;
  image: JSX.Element;
}
const BlogList = () => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [searchString, setSearchString] = useState<string>("");

  const blogData = FetchBlogs();
  const navigate = useNavigate();

  const onClickView =
    (id: number) => (event: React.MouseEvent<HTMLButtonElement>) => {
      navigate(`blog/${id}`);
    };
  const onClickEdit =
    (id: number) => (event: React.MouseEvent<HTMLButtonElement>) => {
      navigate(`edit-blog/${id}`);
    };
  const preProcessData = (
    metaData: MetaDataItem[] | undefined
  ): ProcessedDataItem[] => {
    if (searchString !== "") {
      const filteredBlogs =
        metaData && metaData.filter((blog) => regex.test(blog?.title));
      return (
        filteredBlogs?.map((dataObj) => {
          return {
            title: dataObj?.title || "",
            excerpts: dataObj?.content.split(".")[0] + '    ' + '...........',
            image:
              dataObj?.imgUrl == null ? (
                <img
                  width={150}
                  height={100}
                  src={emptyImg}
                  alt="Empty Image"
                />
              ) : (
                <img
                  width={150}
                  height={100}
                  src={dataObj?.imgUrl}
                  alt="Image"
                />
              ),
              actions: (
                <>
                  <IconButton
                    onClick={onClickView(dataObj?.id)}
                    aria-label="delete"
                  >
                    <PreviewIcon />
                  </IconButton>
                  <IconButton
                    onClick={onClickEdit(dataObj?.id)}
                    aria-label="delete"
                  >
                    <AppRegistrationIcon />
                  </IconButton>
                </>
              ),
          };
        }) || []
      );
    } else {
      return (
        metaData?.map((dataObj) => {
          return {
            title: dataObj?.title || "",
            excerpts: dataObj?.content.split(".")[0] + '    ' + '...........',
            image:
              dataObj?.imgUrl == null ? (
                <img
                  width={150}
                  height={100}
                  src={emptyImg}
                  alt="Empty Image"
                />
              ) : (
                <img
                  width={150}
                  height={100}
                  src={dataObj?.imgUrl}
                  alt="Image"
                />
              ),
            actions: (
              <>
                <IconButton
                  onClick={onClickView(dataObj?.id)}
                  aria-label="delete"
                >
                  <PreviewIcon />
                </IconButton>
                <IconButton
                  onClick={onClickEdit(dataObj?.id)}
                  aria-label="delete"
                >
                  <AppRegistrationIcon />
                </IconButton>
              </>
            ),
          };
        }) || []
      );
    }
  };

  const regex = new RegExp(searchString, "i");
  const visibleRows = React.useMemo(
    () => preProcessData(blogData?.data?.data).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [page, rowsPerPage, blogData, searchString]
  );

  const getCount = (): number => {
    return searchString !== ""
      ? visibleRows?.length
      : blogData?.data?.data.length;
  };

  const handleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setSearchString(event.target.value);
  };

  return (
    <>
      <ReusableTable
        tableName="Blog List"
        data={visibleRows}
        headers={["Title", "Excerpts", "Image", "Actions"]}
        onRowClick={() => {
          return undefined;
        }}
        count={getCount() | 0}
        rowsPerPage={rowsPerPage}
        pageNumber={page}
        onPageChange={(
          event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
          pageNumber: number
        ) => {
          setPage(pageNumber);
        }}
        onRowsPerPageChange={(event: ChangeEvent<HTMLInputElement>) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
        }}
        onchangeSearchString={handleSearchChange}
      />
      {blogData?.isLoading ? <Spinner loading={blogData?.isLoading} /> : null}
      {blogData?.isSuccess ? (
        <SnackbarComponent
          message="Blogs Get  successfully ..!"
          severity="success"
          open={blogData?.isSuccess}
        />
      ) : null}
      {blogData?.isError ? (
        <SnackbarComponent
          message="Blogs Get unsuccessfully ..!"
          severity="error"
          open={blogData?.isError}
        />
      ) : null}
    </>
  );
};

export default BlogList;
