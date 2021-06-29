import { container, title } from 'styles/jss/nextjs-material-kit.js';

const dashboardAdmin = {
  container: {
    ...container,
    marginTop: '100px',
    color: 'black',
  },
  container_profile_biodata: {
    marginTop: '50px',
  },
  wrapper_container: {
    display: 'flex',
    flexDirection: 'row',
  },
  wrapper_component_edit: {
    width: '100%',
    height: '100%',
    padding: '20px',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#B9B7BD'
  }
};

export default dashboardAdmin;
