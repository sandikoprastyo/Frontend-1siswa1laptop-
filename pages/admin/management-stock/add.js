import React from 'react';
import Header from 'components/Header/Header.js';
import HeaderLinksAdmin from 'components/Header/HeaderLinksAdmin.js';
import styles from '../../../styles/jss/nextjs-material-kit/pages/dashboardAdmin.js';

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

  const [admin, setAdmin] = React.useState()
  const [donatur, setDonatur] = React.useState()
  const [stockName, setStockName] = React.useState()
  const [category, setCategory] = React.useState()
  const [serialNumber, setSerialNumber] = React.useState()
  const [status, setStatus] = React.useState()

  const { ...rest } = props;

  /* update data donatur */
  const handlePost = () => {
    const cookie = cookieCutter.get('token');

      const dataUpdate = {
          stock_name: stockName,
          serial_number: serialNumber,
          category: category,
          status: status,
          id_donatur: null,
          id_admin: null,
      }

    axios
      .post(
        `https://protected-scrubland-94267.herokuapp.com/stock`,dataUpdate, {
          headers: {
            token: cookie,
          }
        },
      )
      .then((res) => {
           if (res.status === 200) {
            alert('Stock berhasil ditambah')
            Router.push('/admin/management-stock')
          } else {
            alert('Donatur gagal di upadate')
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
        <h2>Add stock barang</h2>
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
                <h4 style={{ color: 'black' }}>Donatur</h4>
                <input type='text' value={donatur} name='name' onChange={(e) => setDonatur(e.target.value) } />
              </label>

              <label htmlFor='email' style={{ padding: '0 50px' }}>
                <h4 style={{ color: 'black' }}>Stock name</h4>
                <input type='text' value={stockName} name='email' onChange={(e) => setStockName(e.target.value)} />
              </label>
            </GridItem>
            <GridItem xs={12} sm={12} md={8} lg={6}>
              <label htmlFor='phone' style={{ padding: '0 50px' }}>
                <h4 style={{ color: 'black' }}>Serial number</h4>
                <input type='text' value={serialNumber} name='phone' onChange={(e) => setSerialNumber( e.target.value)} />
              </label>

              <label htmlFor='desc' style={{ padding: '0 50px' }}>
                <h4 style={{ color: 'black' }}>Category</h4>
                <input type='text' value={category} name='desc' onChange={(e) => setCategory(e.target.value)} />
              </label>
            </GridItem>
          </GridContainer>

          <GridContainer>
            <GridItem xs={12} sm={12} md={8} lg={6}>
              <label htmlFor='item_donasi' style={{ padding: '0 50px' }}>
                <h4 style={{ color: 'black' }}>Status</h4>
                <select name="status" onChange={(e) => setStatus(e.target.value)}>
                  <option value={status}>{status}</option>
                  <option value="draft">draft</option>
                  <option value="service">service</option>
                  <option value="ready">ready</option>
                  <option value="scrap">scrap</option>
                  <option value="used">used</option>
                </select>
               {/*  <input type='text' value={status} name='item_donasi'  onChange={(e) => setStatus(e.target.value)} /> */}
              </label>
              
            </GridItem>
         {/*    
            <GridItem xs={12} sm={12} md={8} lg={6}>
              <label htmlFor='condition' style={{ padding: '0 50px' }}>
                <h4 style={{ color: 'black' }}>Kondisi barang</h4>
                <input type='text' value={condition} name='condition'  onChange={(e) => setCondition( e.target.value)} />
              </label>

              <label htmlFor='status' style={{ padding: '0 50px' }}>
                <h4 style={{ color: 'black' }}>Status Donatur</h4>
                <select name="status" onChange={(e) => setStatus(e.target.value)}>
                  <option value={status}>{status}</option>
                  <option value="valid">Valid</option>
                  <option value="unvalid">UnValid</option>
                  <option value="cancel">Cancel</option>
                </select>
              </label>

            </GridItem> */}
          </GridContainer>

          <button onClick={() => handlePost()}>Submit</button>
          <button onClick={() => Router.push('/admin/management-stock')}>Cancel</button>
              
       
        </div>
      </div>
    </div>
  );
};

export default dashboardAdmin;
