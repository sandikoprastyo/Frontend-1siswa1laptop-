import React from 'react';
import Header from 'components/Header/Header.js';
import HeaderLinksAdmin from 'components/Header/HeaderLinksAdmin.js';
import styles from '../../../styles/jss/nextjs-material-kit/pages/dashboardAdmin.js';

import Link from 'next/link';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import cookieCutter from 'cookie-cutter';
import { useRouter } from 'next/router';
import Router from 'next/router';


import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import CustomInput from "components/CustomInput/CustomInput.js";


const useStyles = makeStyles(styles, {
  table: {
    minWidth: 650,
  },
});
const dashboardRoutes = [];

const dashboardAdmin = (props) => {
  const classes = useStyles();
  const router = useRouter();
  const slug = router.query;

  const [stockName, setStockName] = React.useState()
  const [serialNumber, setSerialNumber] = React.useState()
  const [category, setCategory] = React.useState()
  const [status, setStatus] = React.useState()
  const [idDonatur, setIdDonatur] = React.useState()
  const [idAdmin, setIdAdmin] = React.useState()
  const [donatur, setDonatur] = React.useState([]);


  const { ...rest } = props;

  React.useEffect(() => {
    console.log(slug.id)
    const cookie = cookieCutter.get('token');
    setTimeout(() => {
      getStock(cookie);
      getDonatur(cookie);
    }, 5000);
  }, []);

  /* get stock */
  const getStock = (cookie) => {
    axios.get(
        `https://protected-scrubland-94267.herokuapp.com/stock/${slug.id}`,
        {
          headers: {
            token: cookie,
          },
        },
      )
      .then((res) => {
        console.log(res)
        if (res.status === 200) {
          
          setStockName(res.data.message.stock_name);
          setSerialNumber(res.data.message.serial_number);
          setCategory(res.data.message.category);
          setStatus(res.data.message.status);
          setIdDonatur(res.data.message.id_donatur);
/*           setIdDonatur()
          setIdAdmin() */
        } else {
          console.log(err)
        }
      });
  };

  const getDonatur = (cookie) => {
    axios
      .get('https://protected-scrubland-94267.herokuapp.com/donatur', {
        headers: {
          token: cookie,
        },
      })
      .then((res) => {
        if(res.status === 200) { 
          setDonatur(res.data.message);
        } else {  
          console.log(res)
        }
      })
  };

  /* update data stock */
  const handleUpdate = () => {
    const cookie = cookieCutter.get('token');

    const dataUpdate = {
      stock_name : stockName,
      serial_number : serialNumber,
      category : category,
      status : status,
      id_donatur: idDonatur,
      // id_admin: adminId
    }
    axios
      .post(
        `https://protected-scrubland-94267.herokuapp.com/stock/${slug.id}`,dataUpdate, {
          headers: {
            token: cookie,
          }
        },
      )
      .then((res) => {
       
           if (res.data.status === 200) {
            alert('Stock berhasil di update')
            Router.push('/admin/management-stock')
          } else {
            alert('Stock gagal di upadate')
          }
      
      });
  };

  return (
    <div>
      <Header
        color='dark'
        routes={dashboardRoutes}
        brand='Donasi 1Siswa 1Laptop'
        rightLinks={<HeaderLinksAdmin />}
        changeColorOnScroll={{
          height: 400,
          color: 'dark',
        }}
        {...rest}
      />
      <div className={classes.container}>
        <h2>Data stock edit</h2>
        <div>
          <GridContainer>
            <GridItem xs={12} sm={12} md={8} lg={6}>
           {/*  <CustomInput
                labelText="Name"
                id="float"
                inputProps={donatur.name}
                formControlProps={{
                  fullWidth: true,
                }}
              /> */}
              <label htmlFor='name' style={{ padding: '0 50px' }}>
                <h4 style={{ color: 'black' }}>Stock Name</h4>
                <input type='text' value={stockName} name='stock name' onChange={(e) => setStockName(e.target.value) } />
              </label>

              <label htmlFor='Serial Number' style={{ padding: '0 50px' }}>
                <h4 style={{ color: 'black' }}>Serial Number</h4>
                <input type='text' value={serialNumber} name='Serial Number'  onChange={(e) => setSerialNumber(e.target.value)} />
              </label>
            </GridItem>
            <GridItem xs={12} sm={12} md={8} lg={6}>
              <label htmlFor='category' style={{ padding: '0 50px' }}>
                <h4 style={{ color: 'black' }}>Category</h4>
                <input type='text' value={category} name='category'  onChange={(e) => setCategory( e.target.value)} />
              </label>

              {/* <label htmlFor='status' style={{ padding: '0 50px' }}>
                <h4 style={{ color: 'black' }}>Status</h4>
                <input type='text' value={status} name='status'  onChange={(e) => setStatus(e.target.value)}  />
              </label> */}
              <label htmlFor='status' style={{ padding: '0 50px' }}>
                <h4 style={{ color: 'black' }}>Status Siswa</h4>
                <select name="status" onChange={(e) => setStatus(e.target.value)}>
                  <option value={status}>{status}</option>
                  <option value="draft">draft</option>
                  <option value="service">service</option>
                  <option value="ready">ready</option>
                  <option value="scrap">scrap</option>
                  <option value="used">used</option>
                </select>
              </label>

              <label htmlFor='donatur' style={{ padding: '0 50px' }}>
                <h4 style={{ color: 'black' }}>Status Siswa</h4>
                <select name="Donatur" onChange={(e) => setIdDonatur(e.target.value)}>
                  {donatur.map((row, i) => (
                    <option value={row.id}>{row.name}</option>
                  ))}
                </select>
              </label>
            </GridItem>
          </GridContainer>

          <button onClick={() => handleUpdate()}>Update</button>
          <Link href="/admin/management-stock">
            <button >
              Cancel
            </button>
          </Link>
              
       
        </div>
      </div>
    </div>
  );
};

export default dashboardAdmin;
