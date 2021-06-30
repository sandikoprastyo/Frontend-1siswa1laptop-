import React from 'react';
import Header from 'components/Header/Header.js';
import HeaderLinksAdmin from 'components/Header/HeaderLinksAdmin.js';
import styles from '../../styles/jss/nextjs-material-kit/pages/dashboardAdmin.js';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Router from 'next/router';


import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import cookieCutter from 'cookie-cutter';
import { useRouter } from 'next/router';
import SideNavbar from './sideNavbar.js';
import Layout from '../../layouts/admin.js';

const useStyles = makeStyles(styles, {
  table: {
    minWidth: 650,
  },
});
const dashboardRoutes = [];

const dashboardAdmin = (props) => {
  const classes = useStyles();
  const router = useRouter();

  const [stock, setStock] = React.useState([]);

  const { ...rest } = props;

  React.useEffect(() => {
    const cookie = cookieCutter.get('token');
    getStock(cookie);
  }, []);

  /* get stock */
  const getStock = (cookie) => {
    axios
      .get('https://protected-scrubland-94267.herokuapp.com/stock', {
        headers: {
          token: cookie,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setStock(res.data.message);
        } else {
          console.log(res);
        }
      });
  };

  /* update data stock */
  const handleUpdate = (id) => {
    Router.push(`/admin//management-stock/${id}`)
  };

  /* delete by id stock */
  const handleDelete = (id) => {
    if (confirm('Anda yakin ingin menghapus ?')) {
      const cookie = cookieCutter.get('token');
      axios
        .delete(`https://protected-scrubland-94267.herokuapp.com/stock/${id}`, {
          headers: {
            token: cookie,
          },
        })
        .then((res) => {
          if (res.status == 200) {
            getStock(cookie);
          } else {
            const err = new Error('Coba lagi nanti!');
            alert(err);
          }
        });
    }
  };

  return (
    <div>
      <Header
        color='dark'
        routes={dashboardRoutes}
        brand='Donasi 1Siswa 1Laptop'
        rightLinks={<HeaderLinksAdmin />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: 'dark',
        }}
        {...rest}
      />
      <div className={classes.wrapper_container}>
        <SideNavbar />
        <div className={classes.container}>
          <div className='wrapper_component'>
            <h1>Management Stock</h1>
            <div className={classes.wrapper_component_title}>
              <div>
              <input type='text' placeholder='search...' />
              <button>Search</button>
              </div>
              <button onClick={() => Router.push('/admin/management-stock/add')}>add</button>
            </div>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell>No</TableCell>
                   {/*  <TableCell>Admin id</TableCell>
                    <TableCell align='right'>Donatur id</TableCell> */}
                    <TableCell align='right'>Stock name</TableCell>
                    <TableCell align='right'>Serial number</TableCell>
                    <TableCell align='right'>Category</TableCell>
                    <TableCell align='right'>Status</TableCell>
                    <TableCell align='right'>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {stock.map((row, i) => (
                    <TableRow key={i}>
                      <TableCell>{i}</TableCell>
                    {/*   <TableCell component='th' scope='row'>{row.admin_name}</TableCell>
                      <TableCell align='right'>{row.donatur_name}</TableCell> */}
                      <TableCell align='right'>{row.stock_name}</TableCell>
                      <TableCell align='right'>{row.serial_number}</TableCell>
                      <TableCell align='right'>{row.category}</TableCell>
                      <TableCell align='right'>{row.status}</TableCell>
                      <TableCell align='right'>
                        <button onClick={() => handleUpdate(row._id)}>
                          Update
                        </button>
                        <button onClick={() => handleDelete(row._id)}>
                          Delete
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default dashboardAdmin;
