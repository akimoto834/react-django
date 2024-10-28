import { createBrowserRouter } from 'react-router-dom';
import Top from '../components/Top/todo';


const router = createBrowserRouter([
    {path: "", element: <Top />},
]);

export default router;