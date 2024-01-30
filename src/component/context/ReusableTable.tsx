import React, { MouseEventHandler } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  InputAdornment,
  TextField,
  TablePagination,
  Grid,
  Box,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import useGetWindowSize from "../../hooks/useGetWindowHight";
import { v1 as uuidv1 } from 'uuid';
interface TableProps {
  tableName:  string;
  data: any[];
  headers: String[];
  onRowClick: (id: number) => MouseEventHandler<HTMLTableRowElement> | undefined ;
  count: number;
  rowsPerPage: number;
  pageNumber: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    page: number
  ) => void;
  onRowsPerPageChange:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
  onchangeSearchString?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined
  
}

const ReusableTable: React.FC<TableProps> = ({
  tableName,
  data,
  headers,
  count,
  rowsPerPage,
  pageNumber,
  onPageChange,
  onRowsPerPageChange,
  onchangeSearchString
}) => {

    const windowMesurements = useGetWindowSize();

  return (
    <Box p={4}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4} lg={4}>
          <Typography variant="h5" mt={2}>
           {tableName}
          </Typography>
        </Grid>
        <Grid item xs={0} md={4} lg={4}></Grid>
        <Grid item xs={12} md={4} lg={4}>
          <TextField
            name="seaarch bar"
            label="Search"
            variant="outlined"
            fullWidth
            margin="normal"
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            size="small"
            //value={searchTerm}
            onChange={onchangeSearchString}
          />
        </Grid>
      </Grid>
      <TableContainer component={Paper} sx={{ overflowX: "auto", maxHeight: windowMesurements?.elementFullHieght }} >
        <Table stickyHeader aria-label="sticky table" >
          <TableHead>
            <TableRow>
              {headers &&
                headers.map((header) => {
                  return <TableCell key={uuidv1()}>{header}</TableCell>;
                })}
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map((row) => {
                return (
                  <TableRow
                  component="tr" key={row.title} hover 
                  >
                    {Object.keys(row).map((key) => (
                      <TableCell key={key}  >{row[key]}</TableCell>
                    ))}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={pageNumber}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </Box>
  );
};

export default ReusableTable;
