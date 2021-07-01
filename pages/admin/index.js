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
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import download from "downloadjs";


import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import cookieCutter from 'cookie-cutter';
import SideNavbar from './sideNavbar.js';
import Router from 'next/router';


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
  const [status, setStatus] = React.useState([]);
  const [condition, setCondition] = React.useState([]);
  const { ...rest } = props;

  React.useEffect(() => {
    const cookie = cookieCutter.get('token');
    getDonatur(cookie);
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
        if(res.status === 200) { 
          setDonatur(res.data.message);
        } else {  
          console.log(res)
        }
      })
  };

  /* get penerima */
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

  const _handleSearch = (e) => {
    consle.log(e.target.value)
  }

  /* update data donatur */
  const handleUpdate = (id) => { 
    Router.push(`/admin/edit/${id}`)
  }

  /* delete by id donatur */
  const handleDelete = (id) => {
    if (confirm("Anda yakin ingin menghapus ?")) {
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
  }

  const  handleCetak = async () => {
      // Create a new PDFDocument
      const pdfDoc = await PDFDocument.create()

      // Embed the Times Roman font
      const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)

      // Add a blank page to the document
      const page = pdfDoc.addPage()

      // Get the width and height of the page
      const { width, height } = page.getSize()

      // Draw a string of text toward the top of the page
      const fontSize = 30
      page.drawText('Tanda Terima Donasi 1Siswa 1Laptop\n\n Name  : \n Email	: \n Phone  : \n desc : \n item donasi  : \n category  : \n status  : \n kondisi : \n', {
        x: 50,
        y: height - 4 * fontSize,
        size: fontSize,
        font: timesRomanFont,
        color:  rgb(0, 0, 0),
      })

      // Serialize the PDFDocument to bytes (a Uint8Array)
      const pdfBytes = await pdfDoc.save()

      // For example, `pdfBytes` can be:
      //   • Written to a file in Node
      //   • Downloaded from the browser
      //   • Rendered in an <iframe>

    		// Trigger the browser to download the PDF document
        download(pdfBytes, "pdf-lib_creation_example.pdf", "application/pdf");
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
      <div className={classes.wrapper_container}>
        <SideNavbar/>
      <div className={classes.container}>
        <div className='wrapper_component'>
        <h1>Dashboard admin</h1>
          <div className="wrapper_component_title">
              <input type="text" placeholder="search..." onChange={(e) => _handleSearch(e)}/>
          {/*   <h2>Data penerima list</h2> */}
          </div>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>No</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell align='right'>Email</TableCell>
                  <TableCell align='right'>Phone</TableCell>
                  <TableCell align='right'>desc</TableCell>
                  <TableCell align='right'>item_donasi</TableCell>
                  <TableCell align='right'>category</TableCell>
                  <TableCell align='right'>status</TableCell>
                  <TableCell align='right'>kondisi</TableCell>
                  <TableCell align='right'>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {donatur.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell>{i}</TableCell>
                    <TableCell component='th' scope='row'>{row.name}</TableCell>
                    <TableCell align='right'>{row.email}</TableCell>
                    <TableCell align='right'>{row.phone}</TableCell>
                    <TableCell align='right'>{row.desc}</TableCell>
                    <TableCell align='right'>{row.item_donasi}</TableCell>
                    <TableCell align='right'>{row.category}</TableCell>
                    <TableCell align='right'>{row.status}</TableCell>
                    <TableCell align='right'>{row.condition}</TableCell>
                    <TableCell align='right'>
                      <button onClick={() => handleUpdate(row._id)}>Edit</button>
                      <button onClick={() => handleDelete(row._id)}>Delete</button>
                      <button onClick={() => handleCetak()}>Cetak</button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        {/*    <div className='wrapper_component'>
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
        </div> */}
      </div>
      </div>
      </div>      
  );
};

export default dashboardAdmin;
