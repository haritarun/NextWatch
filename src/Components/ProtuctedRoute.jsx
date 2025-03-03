import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
const ProtuctedRoute = () =>{
    const jwt_token = Cookies.get("jwt_token");
    if (!jwt_token) {
        return <Navigate to="/login" replace />;
    }
    return <Outlet />;
}
export default ProtuctedRoute;