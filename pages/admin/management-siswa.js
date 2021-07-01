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

import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import cookieCutter from 'cookie-cutter';
import { useRouter } from 'next/router';
import SideNavbar from './sideNavbar.js';
import Layout from '../../layouts/admin.js';
import Router from 'next/router';


const useStyles = makeStyles(styles, {
  table: {
    minWidth: 650,
  },
});
const dashboardRoutes = [];

const dashboardAdmin = (props) => {
  const classes = useStyles();
  const router = useRouter();

  const [siswa, setSiswa] = React.useState([]);

  const { ...rest } = props;

  React.useEffect(() => {
    const cookie = cookieCutter.get('token');
    // getDonatur(cookie);
    getSiswa(cookie);
  }, []);

  /* get siswa */
  const getSiswa = (cookie) => {
    axios
      .get('https://protected-scrubland-94267.herokuapp.com/siswa', {
        headers: {
          token: cookie,
        },
      })
      .then((res) => {
        setSiswa(res.data.message);
      });
  };

  /* update data siswa */
  const handleUpdate = (id) => {
    Router.push(`/admin/management-siswa/${id}`)
  };

  /* delete by id siswa */
  const handleDelete = (id) => {
    if (confirm('Anda yakin ingin menghapus ?')) {
      const cookie = cookieCutter.get('token');
      axios
        .delete(
          `https://protected-scrubland-94267.herokuapp.com/siswa/${id}`,
          {
            headers: {
              token: cookie,
            },
          },
        )
        .then((res) => {
          if (res.status == 200) {
            getSiswa(cookie);
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
            <h1>Management Siswa</h1>
            <div className={classes.wrapper_component_title}>
              <div>
              <input type='text' placeholder='search...' />
              <button>Search</button>
              </div>
              <button onClick={() => Router.push('/admin/management-siswa/add')}>add</button>
            </div>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell align='right'>Name</TableCell>
                    <TableCell align='right'>Email</TableCell>
                    <TableCell align='right'>Phone</TableCell>
                    <TableCell align='right'>Description</TableCell>
                    <TableCell align='right'>Alamat Rumah</TableCell>
                    <TableCell align='right'>Nama Sekolah</TableCell>
                    <TableCell align='right'>Alamat sekolah</TableCell>
                    <TableCell align='right'>Status</TableCell>
                   {/*  <TableCell align='right'>id admin</TableCell>
                    <TableCell align='right'>id stock</TableCell> */}
                    <TableCell align='right'>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {siswa.map((row, i) => (
                    <TableRow key={i}>
                      <TableCell component='th' scope='row'>{row.siswa_name}</TableCell>
                      <TableCell align='right'>{row.email}</TableCell>
                      <TableCell align='right'>{row.phone}</TableCell>
                      <TableCell align='right'>{row.desc}</TableCell>
                      <TableCell align='right'>{row.alamat_rumah}</TableCell>
                      <TableCell align='right'>{row.nama_sekolah}</TableCell>
                      <TableCell align='right'>{row.alamat_sekolah}</TableCell>
                      <TableCell align='right'>{row.status}</TableCell>
                {/*       <TableCell align='right'>{row.id_admin}</TableCell>
                      <TableCell align='right'>{row.id_stock}</TableCell> */}
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
