import {
  MdDelete,
  MdAddCircleOutline,
  MdRemoveCircleOutline,
} from 'react-icons/md';
import { FormattedProduct, Product } from '../../types';

interface ProductCartItemProps {
  product: FormattedProduct,
  handleProductDecrement: (product: Product) => void,
  handleProductIncrement: (product: Product) => void,
  handleRemoveProduct: (id: number) => void
}

export const ProductCartItem = ({
  product,
  handleProductDecrement,
  handleProductIncrement,
  handleRemoveProduct }: ProductCartItemProps) => {

  const { image, title, id, amount, subTotal, priceFormatted } = product

  return (
    <tr data-testid="product">
      <td>
        <img src={image} alt={title} />
      </td>
      <td>
        <strong>{title}</strong>
        <span>{priceFormatted}</span>
      </td>
      <td>
        <div>
          <button
            type="button"
            data-testid="decrement-product"
          disabled={amount <= 1}
          onClick={() => handleProductDecrement(product)}
          >
            <MdRemoveCircleOutline size={20} />
          </button>
          <input
            type="text"
            data-testid="product-amount"
            readOnly
            value={amount}
          />
          <button
            type="button"
            data-testid="increment-product"
          onClick={() => handleProductIncrement(product)}
          >
            <MdAddCircleOutline size={20} />
          </button>
        </div>
      </td>
      <td>
        <strong>{subTotal()}</strong>
      </td>
      <td>
        <button
          type="button"
          data-testid="remove-product"
        onClick={() => handleRemoveProduct(id)}
        >
          <MdDelete size={20} />
        </button>
      </td>
    </tr>
  )
}
