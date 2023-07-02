import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './nav-bar/NavBar'
import SignUp from './signup/SignUp';
import SignIn from './signin/SignIn';
import Home from './home/Home';
import Product from './product/Product';
import ProductDetail from './product-detail/ProductDetail';
import NoMatch from './no-match/NoMatch';
import Order from './order/Order';

const App = () => {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login/" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/product" element={<Product />} />
                <Route path="/product/:id" element={<Product />} />
                <Route path="/product-detail/:id" element={<ProductDetail />} />
                <Route path="/order/:id/:quantity" element={<Order />} />
                <Route path="*" element={<NoMatch />} />
            </Routes>
        </Router>
    );
}

export default App;
