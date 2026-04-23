import { Button, Spin } from 'antd'
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { useState, useEffect } from "react"
import { getCategoryList } from "../../service/categoryListApi"

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
    <div style={{ paddingTop: "80px" }}>

    <div style={{
        display: "Flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "32px"
    }}>
        <div>
            <h4>Browse By Category</h4>
        </div>
        <div>
            <Button style={{backgroundColor: "transparent"}} type='text'>
                <FaChevronLeft />
            </Button>
            <Button style={{backgroundColor: "transparent"}} type='text'>
                <FaChevronRight />
            </Button>
        </div>
    </div>

    <div className='lists' style={{display: "flex", gap: "32px",}}>
        {list.map(item => <CategoryCard 
        key={item.id} 
        image={item.image} 
        text={item.category_name} />)}
    </div>
    </div>
  )
}

export default CategoryList

const CategoryCard = ({image = "", text = "Name"}) => {
    return (
        <div style={{
            width: "160px",
            height: "128px",
            backgroundColor: "#EDEDED",
            borderRadius: "15px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center", 
            gap: "8px"
            
        }}>
            <img style={{
                alignItems: "center",
                justifyContent: "center"
            }} src={image} alt={text} />
            <p style={{
                alignItems: "center",
                justifyContent: "center"
            }}>{text}</p>
        </div>
    )
}