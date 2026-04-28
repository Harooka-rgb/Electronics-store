import { Spin } from 'antd'
import { useEffect, useState } from 'react'
import { getProducts } from '../../service/productService'
import ProductCard from './ProductCard'
import styles from './ProductList.module.css'

const ProductList = () => {
    const [products, setProducts] = useState([])
    const [activeTab, setActiveTab] = useState('new')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getProducts().then(res => {
            setProducts(res || [])
            setLoading(false)
        })
    }, [])

    if (loading) {
        return <Spin size="large" />
    }

    const tabs = [
        { id: 'new', label: 'New Arrival' },
        { id: 'bestseller', label: 'Bestseller' },
        { id: 'featured', label: 'Featured Products' }
    ]

    // Фильтруем товары по типу (если есть поле type или category)
    const getFilteredProducts = () => {
        if (!products.length) return []
        
        // Если у товаров есть type или category - используем их
        const hasType = products[0]?.type || products[0]?.category
        
        if (!hasType) {
            // Если нет type/category - просто показываем все товары
            return products
        }
        
        return products.filter(product => {
            const productType = (product.type || product.category || 'new').toLowerCase()
            return productType === activeTab
        })
    }

    const filteredProducts = getFilteredProducts()

  return (
    <div className={styles.container}>
        <div className={styles.tabsContainer}>
            {tabs.map(tab => (
                <button
                    key={tab.id}
                    className={`${styles.tab} ${activeTab === tab.id ? styles.active : ''}`}
                    onClick={() => setActiveTab(tab.id)}
                >
                    {tab.label}
                </button>
            ))}
        </div>

        <div className={styles.grid}>
            {filteredProducts.length > 0 ? (
                filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))
            ) : (
                <div className={styles.empty}>No products available</div>
            )}
        </div>
    </div>
  )
}

export default ProductList