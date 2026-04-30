import styles from "./Header.module.css"
import { CiSearch } from "react-icons/ci";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import { BsSmartwatch } from "react-icons/bs";
import { MdOutlineCameraAlt } from "react-icons/md";
import { MdOutlineHeadphones } from "react-icons/md";
import { LuGamepad2 } from "react-icons/lu";





import Like from "../../assets/like.svg"
import Cart from "../../assets/cart.svg"
import User from "../../assets/user.svg"
import { Link } from "react-router-dom";


const menuTop = [
    {
        name: 'Home',
        link: '/'
    },
    {
        name: 'About',
        link: '/about'
    },
    {
        name: 'Contact Us',
        link: '/contact'
    },
    {
        name: 'Blog',
        link: '/blog'
    },

]

const menuBottom = [
    {
        name: 'Phones',
        link: '/phones',
        icon: IoPhonePortraitOutline
    },
    {
        name: 'Computers',
        link: '/computers',
        icon: HiOutlineDesktopComputer
    },
    {
        name: 'Smart watches',
        link: '/smart-watches',
        icon: BsSmartwatch
    },
    {
        name: 'Cameras',
        link: '/cameras',
        icon: MdOutlineCameraAlt
    },
    {
        name: 'Headphones',
        link: '/headphones',
        icon: MdOutlineHeadphones
    },
    {
        name: 'Games',
        link: '/games',
        icon: LuGamepad2
    }
]


const Header = () => {
    return (
        <div className={styles.header}>
            <div className={styles.header__top}>
                <div className={styles.header__logo}>
                    <img src={'/logo.svg'} alt="logo-main" />
                </div>
                <div className={styles.header__search}>
                    <input type="text" placeholder="Search" />
                    <span className={styles.searchIcon}>
                        <CiSearch size={20}/>
                    </span>
                </div>
                <div className={styles.header__nav}>
                    {menuTop.map(item => <Link to={item.link}>{item.name}</Link>)}
                </div>
                <div className={styles.header__buttons}>
                    <span>
                        <img src={Like} alt="like" />
                    </span>
                    <span>
                        <img src={Cart} alt="cart" />
                    </span>
                    <span>
                        <Link to="/admin">
                            <img src={User} alt="user" />
                        </Link>
                    </span>
                </div>
            </div>
            <div className={styles.header__bottom}>
                <div className={styles.header__categories}>
                    {menuBottom.map(item => {
                        const Icon = item.icon
                        return (
                            <Link to={item.link} key={item.name} className={styles.categoryItem}>
                                <span className={styles.categoryIcon}>
                                    <Icon size={18} />
                                </span>
                                <span>{item.name}</span>
                            </Link  >
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Header