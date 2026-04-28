import styles from "./Category.module.css"

import playstationImg from "../../assets/playstation.png"
import airpodsImg from "../../assets/airpods.png"
import visionImg from "../../assets/vision.png"
import laptopImg from "../../assets/laptop.png"

const Category = () => {
  return (
    <div className={styles.category}>
      <div className={styles.categoryLeft}>
        <div
          style={{ backgroundImage: `url(${playstationImg})` }}
          className={styles.categoryPlaystation}
        >
          <div className={styles.playstationContent}>
            <h3>Playstation 5</h3>
            <p>
              Incredibly powerful CPUs, GPUs, and an SSD with integrated I/O
              will redefine your PlayStation experience.
            </p>
          </div>
        </div>

        <div
          style={{ backgroundImage: `url(${airpodsImg})` }}
          className={styles.categoryAirpods}
        >
          <div className={styles.smallCardContent}>
            <h3>
              Apple
              <br />
              AirPods Max
            </h3>
            <p>Computational audio. Listen, it&apos;s powerful.</p>
          </div>
        </div>

        <div
          style={{ backgroundImage: `url(${visionImg})` }}
          className={styles.categoryVision}
        >
          <div className={styles.smallCardContent}>
            <h3>
              Apple
              <br />
              Vision Pro
            </h3>
            <p>An immersive way to experience entertainment.</p>
          </div>
        </div>
      </div>

      <div
        style={{ backgroundImage: `url(${laptopImg})` }}
        className={styles.categoryLaptop}
      >
        <div>
          <h2>
            Macbook <span>Air</span>
          </h2>
          <p>
            The new 15-inch MacBook Air makes room for more of what you love with
            a spacious Liquid Retina display.
          </p>
          <button>Shop Now</button>
        </div>
      </div>
    </div>
  )
}

export default Category