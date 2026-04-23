import styles from "./Category.module.css"

import playstationImg from "../../assets/playstation.png"
import airpodsImg from "../../assets/airpods.png"
import visionImg from "../../assets/vision.png"
import laptopImg from "../../assets/laptop.png"

const Category = () => {
  return (
    <div className={styles.category}>
        <div className={styles.categoryLeft}>
            <div className={styles.categoryPlaystation}></div>
            <div className={styles.categoryAirpods_Vision}></div>
            <div className={styles.categoryAirpods_Vision}>
                <div className={styles.airpods}></div>
                <div className={styles.vision}></div>
            </div>
        </div>
        <div 
        style={{
            backgroundImage: `url(${laptopImg})`
        }}
        className={styles.categoryLaptop}>
            <div>
                <h2>Macbook Air</h2>
                <p>The new 15‑inch MacBook Air makes room for more of what you love with a spacious Liquid Retina display.</p>
                <button>Shop Now</button>
            </div>
        </div>
    </div>
  )
}

export default Category