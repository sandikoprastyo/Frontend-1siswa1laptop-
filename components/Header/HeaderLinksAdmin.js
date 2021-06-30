/*eslint-disable*/
import React from 'react';
import Link from 'next/link';

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';
import { useRouter } from 'next/router';
import cookieCutter from 'cookie-cutter';

// @material-ui/icons
import { Apps, CloudDownload } from '@material-ui/icons';

// core components
import CustomDropdown from 'components/CustomDropdown/CustomDropdown.js';
import Button from 'components/CustomButtons/Button.js';

import styles from 'styles/jss/nextjs-material-kit/components/headerLinksStyle.js';

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();
  const router = useRouter();

  const _handleLogOut = () => {
  //  cookieCutter.removeAll('token');
    router.push('/landing');
  };

  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Button href='/landing' color='transparent' className={classes.navLink}>
          <Icon className={classes.icons}>home</Icon> Home
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href='/landing#about'
          color='transparent'
          className={classes.navLink}
        >
          <Icon className={classes.icons}>about</Icon> About
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href='/landing#donation'
          color='transparent'
          className={classes.navLink}
        >
          <Icon className={classes.icons}>contact</Icon> Donation
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          onClick={_handleLogOut}
          color='transparent'
          className={classes.navLink}
        >
          <Icon className={classes.icons}>login</Icon>Logout
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id='instagram-twitter'
          title='Follow us on twitter'
          placement={'top'}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            href='https://twitter.com/'
            target='_blank'
            color='transparent'
            className={classes.navLink}
          >
            <i className={classes.socialIcons + ' fab fa-twitter'} />
          </Button>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id='instagram-facebook'
          title='Follow us on facebook'
          placement={'top'}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color='transparent'
            href='https://www.facebook.com/'
            target='_blank'
            className={classes.navLink}
          >
            <i className={classes.socialIcons + ' fab fa-facebook'} />
          </Button>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id='instagram-tooltip'
          title='Follow us on instagram'
          placement={'top'}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color='transparent'
            href='https://www.instagram.com/'
            target='_blank'
            className={classes.navLink}
          >
            <i className={classes.socialIcons + ' fab fa-instagram'} />
          </Button>
        </Tooltip>
      </ListItem>
    </List>
  );
}
