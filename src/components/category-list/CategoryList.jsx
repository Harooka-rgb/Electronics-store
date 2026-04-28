import { Spin } from 'antd'
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { useState, useEffect } from "react"
import { getCategoryList } from "../../service/categoryListApi"
import styles from "./CategoryList.module.css"


const CategoryList = () => {
    const [list, setList] = useState(null)
    
    useEffect(() => {
        getCategoryList().then(res => {
            setList(res)
        })
    }, [])

    if (list === null) {
        return <Spin size="large" />
    }

  return (
    <section className={styles.section}>
    <div className={styles.header}>
        <h4 className={styles.title}>Browse By Category</h4>
        <div className={styles.actions}>
            <button className={styles.actionButton} type="button" aria-label="Previous categories">
                <FaChevronLeft />
            </button>
            <button className={styles.actionButton} type="button" aria-label="Next categories">
                <FaChevronRight />
            </button>
        </div>
    </div>

    <div className={styles.list}>
        {list.map(item => <CategoryCard 
        key={item.id} 
        image={item.image} 
        text={item.category_name} />)}
    </div>
    </section>
  )
}

export default CategoryList

const CategoryCard = ({image = "", text = "Name"}) => {
    return (
        <div className={styles.card}>
            <img src={image} alt={text} />
            <p>{text}</p>
        </div>
    )
}