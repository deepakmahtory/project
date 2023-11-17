import React, { useState } from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  TextField,
  TablePagination,
  FormControlLabel,
  Switch,
} from '@mui/material';
import { TableSortLabel } from '@mui/material';

const TableF = ({ data }) => {
  const [orderBy, setOrderBy] = useState('');
  const [order, setOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [columnSearchTerms, setColumnSearchTerms] = useState({
    name: '',
    email: '',
    mobile: '',
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [columnVisibility, setColumnVisibility] = useState({
    name: true,
    email: true,
    mobile: true,
  });

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleColumnSearch = (column, value) => {
    setColumnSearchTerms((prevTerms) => ({
      ...prevTerms,
      [column]: value,
    }));
  };

  const toggleColumnVisibility = (column) => {
    setColumnVisibility((prevVisibility) => ({
      ...prevVisibility,
      [column]: !prevVisibility[column],
    }));
  };

  const filteredData = data
    .filter((row) => {
      const overallSearch = Object.values(row).some(
        (value) => typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
      );

      const columnSearch = Object.keys(columnSearchTerms).every((column) => {
        const columnValue = row[column] ? row[column].toString().toLowerCase() : '';
        return columnValue.includes(columnSearchTerms[column].toLowerCase());
      });

      return overallSearch && columnSearch;
    })
    .map((row) => ({
      ...row,
      
      _visibility: columnVisibility,
    }));

  return (
    <div>
      <TextField
        label="Search Table"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ margin: '10px' }}
      />
      <TableContainer component={Paper}>
        <Table className="table-bordered">
          <TableHead>
            <TableRow className='thead-dark'>
              {columnVisibility.name && (
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'name'}
                    direction={orderBy === 'name' ? order : 'asc'}
                    onClick={() => handleSort('name')}
                  >
                    Name
                  </TableSortLabel>
                  <TextField
                    label="Search Name"
                    variant="outlined"
                    value={columnSearchTerms.name}
                    onChange={(e) => handleColumnSearch('name', e.target.value)}
                  />
                </TableCell>
              )}
              {columnVisibility.email && (
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'email'}
                    direction={orderBy === 'email' ? order : 'asc'}
                    onClick={() => handleSort('email')}
                  >
                    Email
                  </TableSortLabel>
                  <TextField
                    label="Search Email"
                    variant="outlined"
                    value={columnSearchTerms.email}
                    onChange={(e) => handleColumnSearch('email', e.target.value)}
                  />
                </TableCell>
              )}
              {columnVisibility.mobile && (
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'mobile'}
                    direction={orderBy === 'mobile' ? order : 'asc'}
                    onClick={() => handleSort('mobile')}
                  >
                    Contact No
                  </TableSortLabel>
                  <TextField
                    label="Search Contact No"
                    variant="outlined"
                    value={columnSearchTerms.mobile}
                    onChange={(e) => handleColumnSearch('mobile', e.target.value)}
                  />
                </TableCell>
              )}
             
              <TableCell>
                <FormControlLabel
                  control={
                    <Switch
                      checked={columnVisibility.name}
                      onChange={() => toggleColumnVisibility('name')}
                    />
                  }
                  label="Show/Hide Name"
                />
              </TableCell>
              <TableCell>
                <FormControlLabel
                  control={
                    <Switch
                      checked={columnVisibility.email}
                      onChange={() => toggleColumnVisibility('email')}
                    />
                  }
                  label="Show/Hide Email"
                />
              </TableCell>
              <TableCell>
                <FormControlLabel
                  control={
                    <Switch
                      checked={columnVisibility.mobile}
                      onChange={() => toggleColumnVisibility('mobile')}
                    />
                  }
                  label="Show/Hide Contact No"
                />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody className='table table-striped'>
            {filteredData
              .sort((a, b) => {
                if (order === 'asc') {
                  return a[orderBy] > b[orderBy] ? 1 : -1;
                } else {
                  return b[orderBy] > a[orderBy] ? 1 : -1;
                }
              })
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow key={index}>
                  {columnVisibility.name && <TableCell>{row.name}</TableCell>}
                  {columnVisibility.email && <TableCell>{row.email}</TableCell>}
                  {columnVisibility.mobile && <TableCell>{row.mobile}</TableCell>}
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[3, 5, 10]}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </div>
  );
};

export default TableF;
