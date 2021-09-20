import React, { useState, useEffect } from 'react';
import { ProductList } from './styles';
import { api } from '../../services/api';
import { useCart } from '../../hooks/useCart';
import { ProductItem } from '../../components/ProductItem';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface ProductFormatted extends Product {
  priceFormatted: string;
}

interface CartItemsAmount {
  [key: number]: number;
}

const Home = (): JSX.Element => {
  const [products, setProducts] = useState<ProductFormatted[]>([]);
  const { addProduct, cart } = useCart();

  const cartItemsAmount = cart.reduce((sumAmount, product) => {
    const obj = {...sumAmount};
    obj[product.id] = product.amount;
    return obj;
  }, {} as CartItemsAmount)


  useEffect(() => {
    async function loadProducts() {
      const response = await api.get('/products')
      setProducts(response.data)
    }

    loadProducts();
  }, []);

  const renderProductItems = () => {
    return products.map((product) => {
      return (
        <ProductItem {...product}
        key={product.id}
        handleAddProduct={handleAddProduct}
        cartItemsAmount={cartItemsAmount} />
      )
    })
  }

  function handleAddProduct(id: number) {
    addProduct(id);
  }

  return (
    <ProductList>
      {renderProductItems()}
    </ProductList>
  );
};

export default Home;
