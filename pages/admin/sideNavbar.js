import Link from 'next/link';

const sideNavbar = () => {
  return (
    <div style={wrapperSidenavbar}>
      <div style={container}>
        <span>
          <Link style={{ color: 'white' }} href='/admin'>
            Dahsboard admin
          </Link>
        </span>
        <span>
          <Link style={{ color: 'white' }} href='/admin/management-barang'>
            Management Barang
          </Link>
        </span>
        <span>
          <Link style={{ color: 'white' }} href='/admin/management-donatur'>
            Management Donatur
          </Link>
        </span>
        <span>
          <Link style={{ color: 'white' }} href='/admin/management-penerima'>
            Management Penerima
          </Link>
        </span>
        <span>
          <Link style={{ color: 'white' }} href='/'>
            Logout
          </Link>
        </span>
      </div>
    </div>
  );
};

const wrapperSidenavbar = {
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'gray',
  width: '20%',
  height: '100vh',
};

const container = {
  marginTop: '50%',
  display: 'flex',
  flexDirection: 'column',
  lineHeight: 6,
  color: 'white',
  marginLeft: '20px',
};

export default sideNavbar;
