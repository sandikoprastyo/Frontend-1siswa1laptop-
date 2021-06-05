import React from 'react';
import Header from 'components/Header/Header.js';
import HeaderLinksAdmin from 'components/Header/HeaderLinksAdmin.js';
import styles from '../styles/jss/nextjs-material-kit/pages/dashboardAdmin.js';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import cookieCutter from 'cookie-cutter';

const useStyles = makeStyles(styles, {
  table: {
    minWidth: 650,
  },
});
const dashboardRoutes = [];

const dashboardAdmin = (props) => {
  const classes = useStyles();
  const [donatur, setDonatur] = React.useState([]);
  const [penerima, setPenerima] = React.useState([]);
  const { ...rest } = props;

  const getDonatur = (cookie) => {
    axios
      .get('https://protected-scrubland-94267.herokuapp.com/donatur', {
        headers: {
          token: cookie,
        },
      })
      .then((res) => {
        setDonatur(res.data.message);
      });
  }

  const getPenerima = (cookie) => {
    axios
    .get('https://protected-scrubland-94267.herokuapp.com/penerima', {
      headers: {
        token: cookie,
      },
    })
    .then((res) => {
      setPenerima(res.data);
    });
  }

  React.useEffect(() => {
    const cookie = cookieCutter.get('token');
    getDonatur(cookie);
    getPenerima(cookie);
    
  },[]);

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
      <div className={classes.container}>
        <h1>Dashboard admin</h1>
        <div className='wrapper_component'>
          <h2>Data donatur list</h2>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align='right'>Email</TableCell>
                  <TableCell align='right'>Phone</TableCell>
                  <TableCell align='right'>desc</TableCell>
                  <TableCell align='right'>item_donasi</TableCell>
                  <TableCell align='right'>category</TableCell>
                  <TableCell align='right'>Action</TableCell>
                </TableRow>
              </TableHead>
               <TableBody>
                {donatur.map((row,i) => (
                  <TableRow key={i}>
                    <TableCell component='th' scope='row'>
                      {row.name}
                    </TableCell>
                    <TableCell align='right'>{row.email}</TableCell>
                    <TableCell align='right'>{row.phone}</TableCell>
                    <TableCell align='right'>{row.desc}</TableCell>
                    <TableCell align='right'>{row.item_donasi}</TableCell>
                    <TableCell align='right'>{row.category}</TableCell>
                    <TableCell align='right'>
                      <button>Edit</button>
                      <button>Delete</button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        <div className='wrapper_component'>
          <h2>Data penerima list</h2>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align='right'>Email</TableCell>
                  <TableCell align='right'>Phone</TableCell>
                  <TableCell align='right'>Address</TableCell>
                  <TableCell align='right'>Action</TableCell>
                </TableRow>
              </TableHead>
               <TableBody>
                {penerima.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell component='th' scope='row'>
                      {row.name}
                    </TableCell>
                    <TableCell align='right'>{row.email}</TableCell>
                    <TableCell align='right'>{row.phone}</TableCell>
                    <TableCell align='right'>{row.address}</TableCell>
                    <TableCell align='right'>
                      <button>Edit</button>
                      <button>Delete</button>
                    </TableCell>
                  </TableRow>
                ))}
                </TableBody>
            </Table> 
          </TableContainer>
        </div>
        
      </div>
    </div>
  );
};

export default dashboardAdmin;
