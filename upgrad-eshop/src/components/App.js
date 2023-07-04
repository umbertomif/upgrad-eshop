import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './nav-bar/NavBar'
import SignUp from './signup/SignUp';
import SignIn from './signin/SignIn';
import Home from './home/Home';
import Product from './product/Product';
import ProductDetail from './product-detail/ProductDetail';
import NoMatch from './no-match/NoMatch';
import Order from './order/Order';
import ProtectedRoute from './ProtectedRoute'

const App = () => {

    const isAdmin = () => {
        const storedUser = sessionStorage.getItem('user');
        const user = JSON.parse(storedUser);
        if (user) {
            return user.roles.includes('ADMIN');
        }
        return false;
    };

    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login/" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route element={<ProtectedRoute isAllowed={isAdmin()} redirectPath={'/login'} />}>
                    <Route path="/product" element={<Product />} />
                    <Route path="/product/:id" element={<Product />} />
                </Route>
                <Route path="/product-detail/:id" element={<ProductDetail />} />
                <Route path="/order/:id/:quantity" element={<Order />} />
                <Route path="*" element={<NoMatch />} />
            </Routes>
        </Router>
    );
}

export default App;
