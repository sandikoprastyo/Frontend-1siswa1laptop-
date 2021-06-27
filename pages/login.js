import React from 'react';
import Link from 'next/link';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '@material-ui/core/Icon';
// @material-ui/icons
import Email from '@material-ui/icons/Email';
//import People from '@material-ui/icons/People';
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
//import CustomInput from 'components/CustomInput/CustomInput.js';

import axios from 'axios';
import Router from 'next/router';
import cookieCutter from 'cookie-cutter';
import styles from 'styles/jss/nextjs-material-kit/pages/loginPage.js';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';

const useStyles = makeStyles(styles);


export default function LoginPage(props,app) {
  const [cardAnimaton, setCardAnimation] = React.useState('cardHidden');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

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

  const _handleLogin = (e) => {
    e.preventDefault();

    if (email === '' && password === '') {
      setError('field cannot be empty');
    } else if (email === '') {
      setError('Email required');
    } else if (password === '') {
      setError('Password required');
    } else if (isEmail(email)) {
      setError('');
      const data = {
        email: email,
        password: password,
      };
      axios
        .post('https://protected-scrubland-94267.herokuapp.com/signin', data)
        .then((res) => {
          if (res.status === 200) {
            cookieCutter.set('token', res.data.token)
            if (res.data.message.role === 'penerima') {
              Router.push('/penerima');
            } else {
              Router.push('/admin');
            }
          }
        }).catch((err) => {
          console.log(err)
        })
    } else {
      setError('Email failed');
    }
  };

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
                    <h4>Login</h4>
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
                    {/*    <CustomInput
                      labelText="Email..."
                      id="email"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "email",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                    /> */}
                    {/*   <CustomInput
                      labelText="Password"
                      id="pass"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "password",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: "off",
                      }}
                    /> */}
                    <p color='red'>{error}</p>
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button simple color='primary' size='lg' href='/register'>
                      Register
                    </Button>

                    <Button
                      simple
                      color='primary'
                      size='lg'
                      onClick={_handleLogin}
                    >
                      Login
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
