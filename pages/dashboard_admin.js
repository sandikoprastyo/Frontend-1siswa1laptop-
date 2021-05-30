import React from 'react';
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";

const dashboardRoutes = [];

const dashboardAdmin = () => {
    return (
        <div>
          <Header
        color="transparent"
        routes={dashboardRoutes}
        brand="Donasi 1Siswa 1Laptop"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white",
        }}
        {...rest}
      />
            <h1>dashboard admin</h1>
        </div>
    );
}

export default dashboardAdmin;
