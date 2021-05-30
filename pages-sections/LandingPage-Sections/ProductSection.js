import React from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

// @material-ui/icons
import Chat from '@material-ui/icons/Chat';
import VerifiedUser from '@material-ui/icons/VerifiedUser';
import Fingerprint from '@material-ui/icons/Fingerprint';
// core components
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import InfoArea from 'components/InfoArea/InfoArea.js';

import styles from 'styles/jss/nextjs-material-kit/pages/landingPageSections/productStyle.js';
import SectionCarousel from "../Components-Sections/SectionCarousel.js";

const useStyles = makeStyles(styles);

export default function ProductSection() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify='center' id='about'>
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>
            Let{"'"}s talk about Donation 1Siswa 1Laptop
          </h2>
          <h5 className={classes.description}>
            Apa itu Donation <b>1Siswa1Laptop</b> Lorem, ipsum dolor sit amet
            consectetur adipisicing elit. Eum laudantium, voluptas omnis iusto
            ut nobis qui ipsam autem voluptatem, impedit quasi delectus nesciunt
            fuga vitae sit, quo repudiandae ducimus perspiciatis nulla soluta
            esse voluptates? Suscipit, Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Modi mollitia, dolor placeat explicabo pariatur
            sequi vel ad ipsum tenetur, fugit iusto fugiat qui unde esse.
          </h5>
        </GridItem>
      </GridContainer>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title='Free Chat'
              description='Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough.'
              icon={Chat}
              iconColor='info'
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title='Verified Users'
              description='Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough.'
              icon={VerifiedUser}
              iconColor='success'
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title='Fingerprint'
              description='Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough.'
              icon={Fingerprint}
              iconColor='danger'
              vertical
            />
          </GridItem>
        </GridContainer>
        <SectionCarousel/>
      </div>
    </div>
  );
}
