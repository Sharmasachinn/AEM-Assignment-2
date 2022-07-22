import './App.scss';
import CategoryBanner from './banner/CategoryBanner';
import Header from './header/Header';
import Footer from './footer/Footer';
import ProductList from './product-list/ProductList';
import ProductDetails from './product-details/ProductDetails';
import Cart from './cart/Cart';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Header />
        <Routes>
          <Route path='/AEM-Assignment-2/' element={<ProductList />} />
          <Route path='/AEM-Assignment-2/product-details/:id' element={<ProductDetails />} />
          <Route path='/AEM-Assignment-2/cart' element={<Cart />} />
        </Routes>
      <Footer />
    </>
  );
}

export default App;
