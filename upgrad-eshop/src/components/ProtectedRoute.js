import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ isAllowed, redirectPath }) => {
    if (isAllowed) {
        return <Outlet />;
    }
    return <Navigate to={redirectPath} replace />;
};

export default ProtectedRoute;