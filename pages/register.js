import React from 'react';
import Link from 'next/link';

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '@material-ui/core/Icon';
// @material-ui/icons
import Email from '@material-ui/icons/Email';
import People from '@material-ui/icons/People';
// core components
import Header from 'components/Header/Header.js';
import HeaderLinks from 'components/Header/HeaderLinks.js';
import Footer from 'components/Footer/Footer.js';
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import Button from 'components/CustomButtons/Button.js';
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardFooter from 'components/Card/CardFooter.js';
import CustomInput from 'components/CustomInput/CustomInput.js';
import Router from 'next/router';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';

import styles from 'styles/jss/nextjs-material-kit/pages/loginPage.js';
import axios from 'axios';

const useStyles = makeStyles(styles);

export default function LoginPage(props) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [role, setRole] = React.useState('penerima');
  const [password, setPassword] = React.useState('');
  const [passwordConfirm, setPasswordConfirm] = React.useState('');
  const [error, setError] = React.useState('');
  const [cardAnimaton, setCardAnimation] = React.useState('cardHidden');

  setTimeout(function () {
    setCardAnimation('');
  }, 700);

  const classes = useStyles();
  const { ...rest } = props;

  const isEmail = (val) => {
    let regex =
      /^([A-Za-z][A-Za-z0-9\-\.\_]*)\@([A-Za-z][A-Za-z0-9\-\_]*)(\.[A-Za-z][A-Za-z0-9\-\_]*)+$/;
    return regex.test(val);
  };

  function _handleRegister(e) {
    e.preventDefault();

    if (name === '' && email === '' && password === '' && passwordConfirm === '') {
      setError('field cannot be empty');
    }else if (name === '') {
      setError('Name required');
    } else if (email === '') {
      setError('Email required');
    } else if (password === '') {
      setError('Password required');
    }else if (passwordConfirm === '') {
      setError('Password Confirm required');
    } else if (isEmail(email)) {
      setError('');
      const data = {
        name: name,
        email: email,
        role: role,
        password: password,
        password_confirmation: passwordConfirm
      };
      axios
        .post('https://protected-scrubland-94267.herokuapp.com/signup', data)
        .then((res) => {
          if (res.status === 200) {
            console.log(res.data.message)
           alert('Register success please login now!!')
            // console.log(res.data.token)
           //.$cookies.set('token', res.data.token)
            Router.push('/login');
          }
        }).catch((err) => {
          setError(err)
        })
    } else {
      setError('Email failed');
    }
  }


  return (
    <div>
      <Header
        absolute
        color='transparent'
        brand='NextJS Material Kit'
        rightLinks={<HeaderLinks />}
        {...rest}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url('/img/bg7.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'top center',
        }}
      >
        <div className={classes.container}>
          <GridContainer justify='center'>
            <GridItem xs={12} sm={6} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form}>
                  <CardHeader color='primary' className={classes.cardHeader}>
                    <h4>Register</h4>
                    <div className={classes.socialLine}>
                      <Button
                        justIcon
                        href='#pablo'
                        target='_blank'
                        color='transparent'
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className={'fab fa-twitter'} />
                      </Button>
                      <Button
                        justIcon
                        href='#pablo'
                        target='_blank'
                        color='transparent'
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className={'fab fa-facebook'} />
                      </Button>
                      <Button
                        justIcon
                        href='#pablo'
                        target='_blank'
                        color='transparent'
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className={'fab fa-google-plus-g'} />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardBody>
                  <FormControl className={classes.margin} noValidate>
                      <InputLabel htmlFor='input-with-icon-adornment'>
                        Name
                      </InputLabel>
                      <Input
                        id='name'
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        endAdornment={
                          <InputAdornment position='end'>
                            <People className={classes.inputIconsColor} />
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                  <FormControl className={classes.margin} noValidate>
                      <InputLabel htmlFor='input-with-icon-adornment'>
                        Email
                      </InputLabel>
                      <Input
                        id='email'
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        endAdornment={
                          <InputAdornment position='end'>
                            <Email className={classes.inputIconsColor} />
                          </InputAdornment>
                        }
                      />
                    </FormControl>

                    <FormControl className={classes.margin}>
                      <InputLabel htmlFor='input-with-icon-adornment'>
                        Password
                      </InputLabel>
                      <Input
                        value={password}
                        id='password'
                        type='password'
                        onChange={(e) => setPassword(e.target.value)}
                        endAdornment={
                          <InputAdornment position='end'>
                            <Icon className={classes.inputIconsColor}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        }
                      />
                    </FormControl>

                    <FormControl className={classes.margin}>
                      <InputLabel htmlFor='input-with-icon-adornment'>
                        Password Confirm
                      </InputLabel>
                      <Input
                        value={passwordConfirm}
                        id='password'
                        type='password'
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                        endAdornment={
                          <InputAdornment position='end'>
                            <Icon className={classes.inputIconsColor}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                    <p color='red'>{error}</p>
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button
                      simple
                      color='primary'
                      size='lg'
                      onClick={_handleRegister}
                    >
                      Register
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
}
