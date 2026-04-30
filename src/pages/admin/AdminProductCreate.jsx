import React, { useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Select,
  Button,
  Upload,
  Card,
  Row,
  Col,
  Space,
  message,
} from "antd";
import { PlusOutlined, SaveOutlined } from "@ant-design/icons";
import { createProduct } from "../../service/productService";
import { uploadFile } from "../../service/uploadFile";

const AdminProductCreate = () => {
const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  
  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList([...newFileList]);
  };
  const onFinish = async (values) => {
    console.log('Текущий fileList в стейте:', fileList);

    const imageUrls = fileList
      .map(file => {
        // Пытаемся достать URL из разных мест, где он может лежать
        const url = file.url || file.response?.url;
        return url;
      })
      .filter(Boolean); // Оставляем только валидные строки-ссылки

    console.log('Собранные URL картинок:', imageUrls);

    if (imageUrls.length === 0 && fileList.length > 0) {
      return message.error('Картинки еще загружаются или произошла ошибка загрузки!');
    }

    try {
      const finalData = {
        ...values,
        images: imageUrls, // Теперь здесь точно должны быть ссылки
        stock: values.stock || 0,
        delivery_day: values.delivery_day || 0,
      };

      console.log('Финальный Payload для сервера:', finalData);

      const res = await createProduct(finalData);
      message.success('Товар успешно создан!');

      // Очистка формы
      form.resetFields();
      setFileList([]);
    } catch (error) {
      console.error('Ошибка при сохранении:', error);
      message.error('Ошибка при сохранении');
    }
  };

  return (
    <Card
      title="Редактирование товара"
      style={{ maxWidth: 800, margin: "20px auto" }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="Фотографии товара">
              <Upload
                customRequest={async (options) => {
                  const { file, onSuccess, onError } = options;
                  try {
                    await uploadFile({ file, onSuccess, onError });
                  } catch (err) {
                    onError(err);
                  }
                }}
                listType="picture-card"
                fileList={fileList}
                onChange={handleUploadChange}
              >
                {fileList.length >= 8 ? null : (
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Загрузить</div>
                  </div>
                )}
              </Upload>
            </Form.Item>
          </Col>

          <Col span={16}>
            <Form.Item name="name" label="Название" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item name="cpu" label="Процессор">
              <Input />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item name="price" label="Цена ($)">
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item name="old_price" label="Старая цена">
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item name="stock" label="Склад (шт)">
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item name="delivery_day" label="Доставка (дни)">
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="colors" label="Доступные цвета">
              <Select mode="tags" placeholder="Выберите цвета" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="storage" label="Варианты памяти">
              <Select mode="tags" placeholder="Выберите объем" />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item name="screen_size" label="Экран (дюймы)">
              <InputNumber step={0.1} style={{ width: '100%' }} />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item name="main_camera" label="Основная камера">
              <Input />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item name="front_camera" label="Селфи камера">
              <Input />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item name="desc" label="Описание">
              <Input.TextArea rows={4} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
              Сохранить товар
            </Button>
            <Button onClick={() => form.resetFields()}>Сбросить</Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AdminProductCreate;
