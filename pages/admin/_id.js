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


const useStyles = makeStyles(styles, {
  table: {
    minWidth: 650,
  },
});
const dashboardRoutes = [];

const dashboardAdmin = (props) => {
  const classes = useStyles();
  const router = useRouter();
  const { slug } = router.query

  const [donatur, setDonatur] = React.useState([]);
  const [penerima, setPenerima] = React.useState([]);
  const [status, setStatus] = React.useState([]);
  const [condition, setCondition] = React.useState([]);
  const { ...rest } = props;

  React.useEffect(() => {
    const cookie = cookieCutter.get('token');
   // getDonatur(cookie);
   // getPenerima(cookie);
  }, []);

/* data for select */
  const statusValue = [
    {
      value: 'Pelabelan',
    },
    {
      value: 'Service',
    },
    {
      value: 'Penyaluran',
    },
  ];

/* data for select */
  const conditionValue = [
    {
      value: 'Rusak bisa diperbaiki',
    },
    {
      value: 'Rusak tidak bisa diperbaiki',
    },
    {
      value: 'Normal',
    },
  ];

  /* get donatur */
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
  };


  /* update data donatur */
  const handleUpdate = (id) => {
    router.push(`/dashboard_admin/_id/${id}`)
  }

  /* delete by id donatur */
  const handleDelete = (id) => {
    confirm("Anda yakin ingin menghapus ?")
    const cookie = cookieCutter.get('token');
    axios
    .delete(`https://protected-scrubland-94267.herokuapp.com/donatur/${id}`, {
      headers: {
        token: cookie,
      },
    })
      .then((res) => {
      if(res.status == 200){
        getDonatur(cookie)
      } else {
        const err = new Error('Coba lagi nanti!')
        alert(err)
      }
    });
  }

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
          <h2>Data donatur update</h2>
        </div>
      </div>
    </div>
  );
};

export default dashboardAdmin;
