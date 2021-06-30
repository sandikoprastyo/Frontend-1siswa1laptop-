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

  const [name, setName] = React.useState()
  const [email, setEmail] = React.useState()
  const [phone, setPhone] = React.useState()
  const [category, setCategory] = React.useState()
  const [itemDonasi, setItemDonasi] = React.useState()
  const [desc, setDesc] = React.useState()
  const [condition, setCondition] = React.useState()
  const [status, setStatus] = React.useState()


  const { ...rest } = props;

  React.useEffect(() => {
    const cookie = cookieCutter.get('token');
    setTimeout(() => {
      getDonatur(cookie);
    }, 1000);
  }, []);

  /* get donatur */
  const getDonatur = (cookie) => {
    axios
      .get(
        `https://protected-scrubland-94267.herokuapp.com/donatur/${slug.id}`,
        {
          headers: {
            token: cookie,
          },
        },
      )
      .then((res) => {
        setName(res.data.message.name);
        setEmail(res.data.message.email);
        setPhone(res.data.message.phone);
        setCategory(res.data.message.category);
        setStatus(res.data.message.status);

        setDesc(res.data.message.desc);
        setItemDonasi(res.data.message.item_donasi);
        setCondition(res.data.message.condition);
      });
  };

  /* update data donatur */
  const handleUpdate = () => {
    const cookie = cookieCutter.get('token');

    const dataUpdate = {
      name : name,
      email : email,
      phone : phone,
      category : category,
      item_donasi : itemDonasi,
      condition : condition,
      desc : desc,
      status : status
    }
    axios
      .post(
        `https://protected-scrubland-94267.herokuapp.com/donatur/${slug.id}`,dataUpdate, {
          headers: {
            token: cookie,
          }
        },
      )
      .then((res) => {
       
           if (res.data === 'Donatur updated in server..!') {
            alert('Donatur berhasil di update')
            Router.push('/admin')
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
        <h2>Data donatur edit</h2>
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
                <h4 style={{ color: 'black' }}>Name</h4>
                <input type='text' value={name} name='name' onChange={(e) => setName(e.target.value) } />
              </label>

              <label htmlFor='email' style={{ padding: '0 50px' }}>
                <h4 style={{ color: 'black' }}>Email</h4>
                <input type='text' value={email} name='email'  onChange={(e) => setEmail(e.target.value)} />
              </label>
            </GridItem>
            <GridItem xs={12} sm={12} md={8} lg={6}>
              <label htmlFor='phone' style={{ padding: '0 50px' }}>
                <h4 style={{ color: 'black' }}>Phone</h4>
                <input type='text' value={phone} name='phone'  onChange={(e) => setPhone( e.target.value)} />
              </label>

              <label htmlFor='desc' style={{ padding: '0 50px' }}>
                <h4 style={{ color: 'black' }}>Description</h4>
                <input type='text' value={desc} name='desc'  onChange={(e) => setDesc(e.target.value)}  />
              </label>
            </GridItem>
          </GridContainer>

          <GridContainer>
            <GridItem xs={12} sm={12} md={8} lg={6}>
              <label htmlFor='item_donasi' style={{ padding: '0 50px' }}>
                <h4 style={{ color: 'black' }}>Item Donasi</h4>
                <input type='text' value={itemDonasi} name='item_donasi'  onChange={(e) => setItemDonasi(e.target.value)} />
              </label>

              <label htmlFor='category' style={{ padding: '0 50px' }}>
                <h4 style={{ color: 'black' }}>Category</h4>
                <input type='text' value={category} name='category'  onChange={(e) => setCategory(e.target.value)} />
              </label>
              
            </GridItem>
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

            </GridItem>
          </GridContainer>

          <button onClick={() => handleUpdate()}>Update</button>
          <button onClick={() => Router.push('/admin')}>Cancel</button>
              
       
        </div>
      </div>
    </div>
  );
};

export default dashboardAdmin;
