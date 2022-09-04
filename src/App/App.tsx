import Calendar from '../components/Calendar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => (
  <div className="wrapper">
    <Calendar />
    <ToastContainer position="bottom-right" autoClose={2000} />
  </div>
);

export default App;
