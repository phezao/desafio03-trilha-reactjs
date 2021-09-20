import { ProductCartItem } from '../../components/ProductCartItem';

import { useCart } from '../../hooks/useCart';
import { formatPrice } from '../../util/format';
import { Container, ProductTable, Total } from './styles';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  amount: number;
}

const Cart = (): JSX.Element => {
  const { cart, removeProduct, updateProductAmount } = useCart();

  const cartFormatted = cart.map(product => (
    {
      ...product,
      priceFormatted: formatPrice(product.price),
      subTotal: () => formatPrice(product.amount * product.price)
    }))


  const total = formatPrice(
    cart.reduce((sumTotal, product) => {
      return sumTotal + (product.price * product.amount)
    }, 0)
    );

  function handleProductIncrement(product: Product) {
    const updateProductProps = {
      productId: product.id,
      amount: product.amount + 1
    }
    updateProductAmount(updateProductProps);
  }

  function handleProductDecrement(product: Product) {
    const updateProductProps = {
      productId: product.id,
      amount: product.amount - 1
    }
    updateProductAmount(updateProductProps);
  }

  function handleRemoveProduct(productId: number) {
    removeProduct(productId)
  }

  const renderCartProducts = () => (
    cartFormatted.map((product) => (
      <ProductCartItem
        key={product.id}
        product={product}
        handleProductDecrement={handleProductDecrement}
        handleProductIncrement={handleProductIncrement}
        handleRemoveProduct={handleRemoveProduct}
      />
    ))
  )

  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th aria-label="product image" />
            <th>PRODUTO</th>
            <th>QTD</th>
            <th>SUBTOTAL</th>
            <th aria-label="delete icon" />
          </tr>
        </thead>
        <tbody>
          {renderCartProducts()}
        </tbody>
      </ProductTable>

      <footer>
        <button type="button">Finalizar pedido</button>

        <Total>
          <span>TOTAL</span>
          <strong>{total}</strong>
        </Total>
      </footer>
    </Container>
  );
};

export default Cart;
