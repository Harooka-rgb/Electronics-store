import { useState } from 'react'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import styles from './ProductCard.module.css'

const ProductCard = ({ product }) => {
  const [isFavorite, setIsFavorite] = useState(false)

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
  }

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={product.images?.[0]} alt={product.name} className={styles.image} />
        <button 
          className={styles.favoriteBtn}
          onClick={toggleFavorite}
        >
          {isFavorite ? (
            <AiFillHeart style={{ color: '#ff2d2d', fontSize: '24px' }} />
          ) : (
            <AiOutlineHeart style={{ color: '#9f9f9f', fontSize: '24px' }} />
          )}
        </button>
      </div>
      
      <div className={styles.content}>
        <h3 className={styles.title}>{product.name}</h3>
        <p className={styles.price}>${product.price}</p>
        <button className={styles.buyBtn}>Buy Now</button>
      </div>
    </div>
  )
}

export default ProductCard
