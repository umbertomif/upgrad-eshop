import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './nav-bar/NavBar'
import SignUp from './signup/SignUp';
import SignIn from './signin/SignIn';
import Home from './home/Home';
import AddProduct from './add-product/AddProduct';
import Products from './products/Products';
import NoMatch from './no-match/NoMatch';

function App() {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login/" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/add-product" element={<AddProduct />} />
                <Route path="/products" element={<Products />} />
                <Route path="*" element={<NoMatch />} />
            </Routes>
        </Router>
    );
}

export default App;
