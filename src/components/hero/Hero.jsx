import styles from './Hero.module.css'
import HeroImg from "../../assets/iphone.png"

const Hero = () => {
  return (
    <div className={styles.hero}>
        <div className='app-container'>
            <div className={styles.hero_text}>
            <h2>Pro. Beyond.</h2>
            <h1>IPhone 14 <span>Pro</span></h1>
            <p>Created to change everything for the better. For everyone</p>
            <button>Shop Now</button>
            </div>
            <div className={styles.hero_image}>
            <img src={HeroImg} alt="iPhone 14 Pro" />
            </div>
            
        </div> 
    </div>
  )
}

export default Hero