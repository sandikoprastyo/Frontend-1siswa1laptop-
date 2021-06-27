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

import imgSrc from '../public/img/profile.png';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import cookieCutter from 'cookie-cutter';

const useStyles = makeStyles(styles, {
  table: {
    minWidth: 650,
  },
});
const dashboardRoutes = [];

const dashboard_penerima = (props) => {
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
  };

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
  };

  React.useEffect(() => {
    const cookie = cookieCutter.get('token');
    getDonatur(cookie);
    getPenerima(cookie);
  }, []);

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
        <h1>Dashboard Penerima</h1>
        <div className='wrapper_component'>
          <h2>Profile</h2>
          <br />
          <div className='container_profile'>
            <img src={imgSrc} alt='img' width='100' height='auto' />
            <div className={classes.container_profile_biodata}>
            <p>Name : Andi</p>
            <p>Email: Andi@gmail.com</p>
            <p>Phone : 08127893434</p>
            <p>Alamat : Jl. Muhtar swadaya 5 Rt 7 rw 12 no 50</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default dashboard_penerima;
