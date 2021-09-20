import { formatPrice } from "../../util/format"
import { MdAddShoppingCart } from "react-icons/md"

interface ProductItemProps {
  id: number,
  image: string,
  title: string,
  price: number,
  cartItemsAmount: {
    [id: number]: number
  },
  handleAddProduct: (id: number) => void
}

export const ProductItem = (
  {id,
  image,
  title,
  price,
  cartItemsAmount,
  handleAddProduct}: ProductItemProps
  ) => {

  return (
    <li key={id}>
      <img src={image} alt="Tênis de Caminhada Leve Confortável" />
      <strong>{title}</strong>
      <span>{formatPrice(price)}</span>
      <button
        type="button"
        data-testid="add-product-button"
      onClick={() => handleAddProduct(id)}
      >
        <div data-testid="cart-product-quantity">
          <MdAddShoppingCart size={16} color="#FFF" />
          {cartItemsAmount[id] || 0}
        </div>

        <span>ADICIONAR AO CARRINHO</span>
      </button>
    </li>
  )
}
