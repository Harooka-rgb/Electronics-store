import {
  Layout, Menu, theme, Typography, Table,
  Tag, Button, Space, Popconfirm, message, Avatar, Modal, Form, Input, Flex
} from 'antd';
import {
  AppstoreOutlined,
  ShoppingOutlined,
  EditOutlined,
  DeleteOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { getCategoryList, deleteCategory, updateCategory } from '../../service/categoryListApi';
import { getProducts, deleteProduct, updateProduct } from '../../service/productService';
import { useNavigate } from 'react-router-dom';

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

const AdminPage = () => {
  const [currentTab, setCurrentTab] = useState('categories');
  const [categoryData, setCategoryData] = useState(null);
  const [productData, setProductData] = useState(null);
  const [editingRecord, setEditingRecord] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();


  useEffect(() => {
    getCategoryList().then(res => 
        setCategoryData(res)
    )
  }, [])
  useEffect(() => {
    getProducts().then(res => 
        setProductData(res)
    )

  }, [])

  const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();

  // --- Обработчики действий ---
  const handleEdit = (record) => {
    setEditingRecord(record);
    if (currentTab === 'categories') {
      form.setFieldsValue({
        category_name: record.category_name,
        image: record.image,
        count: record.count,
      });
    } else {
      form.setFieldsValue({
        name: record.name,
        price: record.price,
        old_price: record.old_price,
        screen_size: record.screen_size,
        camera_main: record.camera?.main,
        battery_mah: record.battery_mah,
        colors: record.colors?.join(', '),
        stock: record.stock,
        delivery_day: record.delivery_day,
        images: record.images?.join(', '),
      });
    }
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      if (currentTab === 'categories') {
        await deleteCategory(id);
        setCategoryData(categoryData.filter(item => item.id !== id));
        message.success('Категория удалена');
      } else {
        await deleteProduct(id);
        setProductData(productData.filter(item => item.id !== id));
        message.success('Товар удален');
      }
    } catch (error) {
      message.error('Ошибка при удалении');
      console.error(error);
    }
  };

  const handleSaveEdit = async (values) => {
    try {
      if (currentTab === 'categories') {
        const updateData = {
          category_name: values.category_name,
          image: values.image,
          count: values.count,
        };
        await updateCategory(editingRecord.id, updateData);
        setCategoryData(categoryData.map(item =>
          item.id === editingRecord.id ? { ...item, ...updateData } : item
        ));
        message.success('Категория обновлена');
      } else {
        const updateData = {
          name: values.name,
          price: values.price,
          old_price: values.old_price,
          screen_size: values.screen_size,
          camera: { main: values.camera_main },
          battery_mah: values.battery_mah,
          colors: values.colors?.split(',').map(c => c.trim()),
          stock: values.stock,
          delivery_day: values.delivery_day,
          images: values.images?.split(',').map(i => i.trim()),
        };
        await updateProduct(editingRecord.id, updateData);
        setProductData(productData.map(item =>
          item.id === editingRecord.id ? { ...item, ...updateData } : item
        ));
        message.success('Товар обновлен');
      }
      setIsModalVisible(false);
      setEditingRecord(null);
      form.resetFields();
    } catch (error) {
      message.error('Ошибка при обновлении');
      console.error(error);
    }
  };

  // --- Конфигурация колонок с кнопками ---
  const actionColumn = {
    title: 'Действия',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <Button
          type="primary"
          ghost
          icon={<EditOutlined />}
          onClick={() => handleEdit(record)}
        >
          Править
        </Button>

        <Popconfirm
          title="Удаление"
          description={`Вы уверены, что хотите удалить "${record.category_name || record.name}"?`}
          onConfirm={() => handleDelete(record.id)}
          icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
          okText="Да"
          cancelText="Нет"
        >
          <Button
            danger
            icon={<DeleteOutlined />}
          >
            Удалить
          </Button>
        </Popconfirm>
      </Space>
    ),
  };

  // --- Рендер таблиц ---
  const renderContent = () => {
    if (currentTab === 'categories') {
      const categoryColumns = [
        { title: 'Фото',
        dataIndex: 'image',
        key: 'image',
        render: (image) => <Avatar src={image}/>
        },
        { title: 'Название', dataIndex: 'category_name', key: 'category_name' },
        { title: 'Кол-во товаров', dataIndex: 'count', key: 'count' },
        actionColumn, // Добавляем колонку действий
      ];

      return (
        <>
          <Title level={2}>Управление категориями</Title>
          <Table dataSource={categoryData} columns={categoryColumns} rowKey="id" />
        </>
      );
    }


    const productColumns = [
  {
    title: 'Фото',
    dataIndex: 'images',
    key: 'images',
    // Берем первое фото из массива images
    render: (images) => <Avatar src={images?.[0]} size="large" />,
  },
  {
    title: 'Название',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Новая цена',
    dataIndex: 'price',
    key: 'price',
    render: (price) => `${price} $`,
  },
  {
    title: 'Старая цена',
    dataIndex: 'old_price',
    key: 'old_price',
    render: (oldPrice) => <span style={{ textDecoration: 'line-through', color: 'gray' }}>{oldPrice} $</span>,
  },
  {
    title: 'Характеристики',
    key: 'features',
    render: (_, record) => (
      <div style={{ fontSize: '12px' }}>
        <div>Размер: {record.screen_size}"</div>
        <div>Камера: {record.camera?.main}</div>
        <div>Аккумулятор: {record.battery_mah} mAh</div>
      </div>
    ),
  },
  {
    title: 'Цвета',
    dataIndex: 'colors',
    key: 'colors',
    // Выводим через запятую или тегами
    render: (colors) => colors?.join(', '),
  },
  {
    title: 'Склад',
    dataIndex: 'stock',
    key: 'stock',
  },
  {
    title: 'Доставка',
    dataIndex: 'delivery_day',
    key: 'delivery_day',
  },
  actionColumn, // Добавляем колонку действий
];

    return (
      <>
      <Flex align="center" justify="space-between">
        <Title level={2}>Список продуктов</Title>
        <Button type="primary" onClick={() => {
          navigate("/admin/add-product")
        }}>Добавить продукт</Button>
      </Flex>
        <Table dataSource={productData} columns={productColumns} rowKey="id" />

      </>
    );
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider breakpoint="lg" collapsedWidth="0">
        <div style={{ height: 32, margin: 16, background: 'rgba(255,255,255,0.2)', borderRadius: 6 }} />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[currentTab]}
          items={[
            { key: 'categories', icon: <AppstoreOutlined />, label: 'Категории' },
            { key: 'products', icon: <ShoppingOutlined />, label: 'Продукты' },
          ]}
          onClick={({ key }) => setCurrentTab(key)}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: '0 20px', background: colorBgContainer, fontSize: '18px', fontWeight: 'bold' }}>
          ADMIN SYSTEM
        </Header>
        <Content style={{ margin: '24px 16px 0' }}>
          <div style={{ padding: 24, minHeight: 360, background: colorBgContainer, borderRadius: borderRadiusLG }}>
            {renderContent()}
          </div>
        </Content>
      </Layout>

      {/* Модальное окно для редактирования */}
      <Modal
        title={`Редактировать ${currentTab === 'categories' ? 'категорию' : 'товар'}`}
        open={isModalVisible}
        onOk={() => form.submit()}
        onCancel={() => {
          setIsModalVisible(false);
          setEditingRecord(null);
          form.resetFields();
        }}
        okText="Сохранить"
        cancelText="Отмена"
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSaveEdit}
        >
          {currentTab === 'categories' ? (
            <>
              <Form.Item
                label="Название категории"
                name="category_name"
                rules={[{ required: true, message: 'Пожалуйста, введите название' }]}
              >
                <Input placeholder="Введите название категории" />
              </Form.Item>
              <Form.Item
                label="Ссылка на фото"
                name="image"
              >
                <Input placeholder="https://..." />
              </Form.Item>
              <Form.Item
                label="Кол-во товаров"
                name="count"
                type="number"
              >
                <Input type="number" placeholder="0" />
              </Form.Item>
            </>
          ) : (
            <>
              <Form.Item
                label="Название товара"
                name="name"
                rules={[{ required: true, message: 'Пожалуйста, введите название' }]}
              >
                <Input placeholder="Название товара" />
              </Form.Item>
              <Form.Item
                label="Новая цена ($)"
                name="price"
              >
                <Input type="number" placeholder="0" />
              </Form.Item>
              <Form.Item
                label="Старая цена ($)"
                name="old_price"
              >
                <Input type="number" placeholder="0" />
              </Form.Item>
              <Form.Item
                label="Размер экрана (дюймы)"
                name="screen_size"
              >
                <Input type="number" placeholder="6.1" step="0.1" />
              </Form.Item>
              <Form.Item
                label="Камера (основная)"
                name="camera_main"
              >
                <Input placeholder="48MP" />
              </Form.Item>
              <Form.Item
                label="Аккумулятор (mAh)"
                name="battery_mah"
              >
                <Input type="number" placeholder="3000" />
              </Form.Item>
              <Form.Item
                label="Цвета (через запятую)"
                name="colors"
              >
                <Input placeholder="Черный, Белый, Синий" />
              </Form.Item>
              <Form.Item
                label="Склад"
                name="stock"
              >
                <Input type="number" placeholder="0" />
              </Form.Item>
              <Form.Item
                label="Дни доставки"
                name="delivery_day"
              >
                <Input type="number" placeholder="1" />
              </Form.Item>
              <Form.Item
                label="Ссылка на фото"
                name="images"
              >
                <Input placeholder="https://..., https://..." />
              </Form.Item>
            </>
          )}
        </Form>
      </Modal>
    </Layout>
  );
};

// Данные (вынесены для краткости)
// const categoryData = [
//   { key: '1', name: 'Электроника', count: 150 },
//   { key: '2', name: 'Одежда', count: 320 },
// ];

const productData = [
  { key: '1', name: 'iPhone 15', price: '990$', category: 'Электроника' },
  { key: '2', name: 'Футболка', price: '25$', category: 'Одежда' },
];

export default AdminPage;