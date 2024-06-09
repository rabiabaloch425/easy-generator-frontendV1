import { useAuth } from '../context/AuthContext';
import {Navigate, useLocation} from "react-router-dom"

const ProtectedRoute = ({children}: any) => {
    const {isAuthenticated} = useAuth();
    let location = useLocation();

    console.log("ProtectedRoute isAuthenticated", isAuthenticated)
    if(!isAuthenticated) {
        return <Navigate to="/" state={{ from: location}} replace />
    }
 return children

};

export default ProtectedRoute;