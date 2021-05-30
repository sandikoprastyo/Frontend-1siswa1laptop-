import React from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

// @material-ui/icons

// core components
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import Button from 'components/CustomButtons/Button.js';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import cookieCutter from 'cookie-cutter';

import styles from 'styles/jss/nextjs-material-kit/pages/landingPageSections/workStyle.js';
const useStyles = makeStyles(styles);

const categorys = [
  {
    value: 'Laptop',
  },
  {
    value: 'PC',
  },
  {
    value: 'Accesories',
  },
];

export default function WorkSection() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [desc, setDesc] = React.useState('');
  const [itemDonation, setItemDonation] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [err, setError] = React.useState('');
  const classes = useStyles();

  const isEmail = (val) => {
    let regex =
      /^([A-Za-z][A-Za-z0-9\-\.\_]*)\@([A-Za-z][A-Za-z0-9\-\_]*)(\.[A-Za-z][A-Za-z0-9\-\_]*)+$/;
    return regex.test(val);
  };

  const handleSendDonation = (e) => {
    e.preventDefault();
    if (
      name === '' &&
      phone === '' &&
      email === '' &&
      desc === '' &&
      itemDonation === '' &&
      category === ''
    ) {
      setError('field cannot be empty');
    } else if (name === '') {
      setError('Name required');
    } else if (email === '') {
      setError('Email required');
    } else if (phone === '') {
      setError('Phone required');
    } else if (desc === '') {
      setError('Description required');
    } else if (itemDonation === '') {
      setError('item Donation required');
    } else if (category === '') {
      setError('Category required');
    } else if (isEmail(email)) {
      setError('');

      const data = {
        name: name,
        email: email,
        phone: phone,
        desc: desc,
        item_donasi: itemDonation,
        category: category,
      }
      const headers = {
        headers: {
          token: cookieCutter.get('token'),
        },
      };
      axios
        .post(
          'https://protected-scrubland-94267.herokuapp.com/donatur',
          data,
          headers,
        )
        .then((res) => {
          if (res.status === 200) {
            alert(
              'Terima kasih sudah berdonasi, team kami akan segera menghubungi anda!!',
            );
          }
        }).then(() => {
          setName('')
          setEmail('')
          setPhone('')
          setDesc('')
          setItemDonation('')
          setCategory('')
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setError('Email failed');
    }
  };

  return (
    <div className={classes.section} id='donation'>
      <GridContainer justify='center'>
        <GridItem cs={12} sm={12} md={8}>
          <h2 className={classes.title}>Form Donation</h2>
          <h4 className={classes.description}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam
            magni esse dolore quae facilis qui optio. Voluptas nemo animi, non
            inventore maiores modi est ipsa aperiam aliquid odit! Perspiciatis
            nesciunt, facilis consequatur sunt doloremque illo.
          </h4>
          <form>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <TextField
                  style={{ marginTop: 20 }}
                  id='standard-full-width'
                  label='Name'
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <TextField
                  style={{ marginTop: 20 }}
                  id='standard-full-width'
                  label='Email'
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <TextField
                  style={{ marginTop: 20 }}
                  id='standard-full-width'
                  label='Phone'
                  fullWidth
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <TextField
                  style={{ marginTop: 20 }}
                  id='standard-full-width'
                  label='Item Donation'
                  fullWidth
                  value={itemDonation}
                  onChange={(e) => setItemDonation(e.target.value)}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <TextField
                  style={{ marginTop: 20, marginBottom: 50 }}
                  id='standard-full-width'
                  label='Description'
                  fullWidth
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
                <p color='red'>{err}</p>
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <TextField
                  style={{ marginTop: 20, marginBottom: 50 }}
                  id='standard-select-currency'
                  select
                  fullWidth
                  label='Category'
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categorys.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.value}
                    </MenuItem>
                  ))}
                </TextField>
              </GridItem>
              <GridItem xs={12} sm={12} md={4} className={classes.textCenter}>
                <Button color='primary' onClick={handleSendDonation}>
                  Send Donation
                </Button>
              </GridItem>
            </GridContainer>
          </form>
        </GridItem>
      </GridContainer>
    </div>
  );
}
