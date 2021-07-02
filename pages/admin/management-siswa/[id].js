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
  const [desc, setDesc] = React.useState()

  const [alamatRumah, setAlamatRumah] = React.useState()
  const [namaSekolah, setNamaSekolah] = React.useState()
  const [alamatSekolah, setAlamatSekolah] = React.useState()
  const [status, setStatus] = React.useState()


  const { ...rest } = props;

  React.useEffect(() => {
    console.log(slug)

    const cookie = cookieCutter.get('token');  
    getSiswa(cookie);
    
  },[]);

 

  /* get siswa */
  const getSiswa = (cookie) => {
    axios.get(`https://protected-scrubland-94267.herokuapp.com/siswa/${slug.id}`,{headers: {token: cookie,},},
      )
      .then((res) => {
        setName(res.data.message.siswa_name);
        setEmail(res.data.message.email);
        setPhone(res.data.message.phone);
        setDesc(res.data.message.desc);
        
        setAlamatRumah(res.data.message.alamat_rumah);
        setNamaSekolah(res.data.message.nama_sekolah);
        setAlamatSekolah(res.data.message.alamat_sekolah);
        setStatus(res.data.message.status);

      /*   setIdAdmin(res.data.message.id_admin);
        setIdStock(res.data.message.id_stock); */
      });
  };

  /* update data siswa */
  const handleUpdate = () => {
    const cookie = cookieCutter.get('token');

    const dataUpdate = {
      name : name,
      email : email,
      phone : phone,
      desc : desc,
      alamat_rumah : alamatRumah,
      nama_sekolah : namaSekolah,
      alamat_sekolah : alamatSekolah,
      status : status,
    /*   id_admin: null,
      id_stock: null */
    }
    axios
      .post(
        `https://protected-scrubland-94267.herokuapp.com/siswa/${slug.id}`,dataUpdate, {
          headers: {
            token: cookie,
          }
        },
      )
      .then((res) => {
       
           if (res.status === 200) {
            alert('Siswa berhasil di update')
            Router.push('/admin/management-siswa')
          } else {
            alert('Siswa gagal di update')
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
        <h2>Data Siswa edit</h2>
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
                <h4 style={{ color: 'black' }}>Alamat rumah</h4>
                <input type='text' value={alamatRumah} name='item_donasi'  onChange={(e) => setAlamatRumah(e.target.value)} />
              </label>

              <label htmlFor='category' style={{ padding: '0 50px' }}>
                <h4 style={{ color: 'black' }}>Nama sekolah</h4>
                <input type='text' value={namaSekolah} name='category'  onChange={(e) => setNamaSekolah(e.target.value)} />
              </label>
              
            </GridItem>
            <GridItem xs={12} sm={12} md={8} lg={6}>
              <label htmlFor='condition' style={{ padding: '0 50px' }}>
                <h4 style={{ color: 'black' }}>Alamat sekolah</h4>
                <input type='text' value={alamatSekolah} name='condition'  onChange={(e) => setAlamatSekolah( e.target.value)} />
              </label>

              <label htmlFor='status' style={{ padding: '0 50px' }}>
                <h4 style={{ color: 'black' }}>Status Stock</h4>
                <select name="status" onChange={(e) => setStatus(e.target.value)}>
                  <option value={status}>{status}</option>
                  <option value="Draft">Draft</option>
                  <option value="Done">Done</option>
                </select>
              </label>

            </GridItem>
          </GridContainer>

          <button onClick={() => handleUpdate()}>Update</button>
          <button onClick={() => Router.push('/admin/management-siswa')}>Cancel</button>
              
        </div>
      </div>
    </div>
  );
};

export default dashboardAdmin;
