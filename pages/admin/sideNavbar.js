import Link from 'next/link';
import cookieCutter from 'cookie-cutter';
import { useRouter } from 'next/router';


const sideNavbar = () => {
  const router = useRouter();
  
  const _handleLogOut = () => {
  //  browser.cookies.remove('token')
    router.push('/landing');
  };
  return (
    <div style={wrapperSidenavbar}>
      <div style={container}>
        <span>
          <Link  href='/admin'>
            <span style={{ color: 'white',cursor: 'pointer' }}>
            Dahsboard Admin
            </span>    
          </Link>
        </span>
        <span>
          <Link href='/admin/management-stock'>
            <span style={{ color: 'white', cursor: 'pointer' }}>
            Management Stock
            </span>
          </Link>
        </span>
        <span>
          <Link style={{ color: 'white' }} href='/admin/management-siswa'>
            <span style={{ color: 'white', cursor: 'pointer' }}>
            Management Siswa
              </span>
          </Link>
        </span>
        <span>
          <div onClick={_handleLogOut}>
          <span style={{ color: 'white',  cursor: 'pointer' }}>
            Logout
            </span>
            </div>
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
