import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { ProductType, SearchQueryType } from '../../../model/product';
import { CATEGORY, STATUS, SIZE } from '../../../constants/product.constants';
import CloudinaryUploadWidget from '../../../utils/CloudinaryUploadWidget';
import './NewItemDialog.style.css';
import { useDispatch, useSelector } from 'react-redux';
import { productActions } from '../../../redux/actions/productAction';
import { RootState } from '../../../redux/store';

const CLOUDNAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
const UPLOADPRESET = process.env.REACT_APP_CLOUDINARY_PRESET;

interface OwnProps {
  showDialog: boolean;
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
  mode: string;
  searchQuery: SearchQueryType;
}

const InitialFormData = {
  name: '',
  sku: '',
  stock: {},
  image: '',
  description: '',
  category: [],
  status: 'active',
  price: '0',
};

function NewItemDialog({
  showDialog,
  setShowDialog,
  mode,
  searchQuery,
}: OwnProps) {
  const handleClose = () => setShowDialog(false);
  const selectedProduct = useSelector(
    (state: RootState) => state.product.selectedProduct
  );
  const [formData, setFormData] = useState<ProductType>(InitialFormData);
  const [stock, setStock] = useState<(string[] | [])[]>([]);
  const [stockError, setStockError] = useState<boolean>(false);
  const [publicId, setPublicId] = useState<string>('');
  const [uwConfig] = useState({
    cloudName: CLOUDNAME,
    uploadPreset: UPLOADPRESET,
  });
  const dispatch = useDispatch();

  const handleChange = (event: any) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };

  const addStock = () => {
    setStock([...stock, []]);
  };

  const deleteStock = (idx: number) => {
    const newStock = stock.filter((item, index) => index !== idx);
    setStock(newStock);
  };

  const handleSizeChange = (value: string, index: number) => {
    const newStock = [...stock];
    newStock[index][0] = value;
    setStock(newStock);
  };

  const handleStockChange = (value: string, index: number) => {
    const newStock = [...stock];
    newStock[index][1] = value;
    setStock(newStock);
  };

  const uploadImage = (url: string) => {
    setFormData({ ...formData, image: url });
  };

  const onHandelCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (formData.category.includes(event.target.value)) {
      const newCategory = formData.category.filter(
        (item) => item !== event.target.value
      );
      setFormData({ ...formData, category: [...newCategory] });
    } else {
      setFormData({
        ...formData,
        category: [...formData.category, event.target.value],
      });
    }
  };

  const handelSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (stock.length === 0) return setStockError(true);
    else setStockError(false);
    const totalStock = stock.reduce((acc, cur) => {
      return { ...acc, [cur[0]]: parseInt(cur[1]) };
    }, {});

    if (mode === 'new') {
      dispatch(
        productActions.createProduct({
          formData: { ...formData, stock: totalStock },
          page: searchQuery.page,
        })
      );
    } else {
      if (selectedProduct !== null) {
        dispatch(
          productActions.editProduct(
            { ...formData, stock: totalStock },
            selectedProduct._id,
            searchQuery.page
          )
        );
      }
    }

    setShowDialog(false);
  };

  useEffect(() => {
    if (showDialog) {
      if (mode === 'edit' && selectedProduct !== null) {
        setFormData(selectedProduct);
        const stockArray = Object.keys(selectedProduct.stock).map((size) => [
          size,
          selectedProduct.stock[size],
        ]);
        setStock(stockArray);
      } else {
        setFormData({ ...InitialFormData });
        setStock([]);
      }
    }
  }, [showDialog]);

  return (
    <Modal size='lg' show={showDialog} onHide={handleClose}>
      <Modal.Header closeButton>
        {mode === 'new' ? (
          <Modal.Title>Create New Product</Modal.Title>
        ) : (
          <Modal.Title>Edit Product</Modal.Title>
        )}
      </Modal.Header>
      <Form onSubmit={handelSubmit}>
        <Modal.Body className='p-3'>
          <Row className='mb-3'>
            <Form.Group as={Col} controlId='sku'>
              <Form.Label>Sku</Form.Label>
              <Form.Control
                onChange={handleChange}
                type='string'
                placeholder='Sku'
                value={formData.sku}
                required
              />
            </Form.Group>
            <Form.Group as={Col} controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                onChange={handleChange}
                type='string'
                placeholder='Name'
                value={formData.name}
                required
              />
            </Form.Group>
          </Row>

          <Form.Group controlId='description' className='mb-3'>
            <Form.Label>Description</Form.Label>
            <Form.Control
              onChange={handleChange}
              type='string'
              placeholder='Description'
              as='textarea'
              rows={3}
              value={formData.description}
              required
            />
          </Form.Group>

          <Form.Group controlId='stock' className='mb-3'>
            <Form.Label className='me-2'>Stock</Form.Label>
            {stockError && (
              <span className='error-message'>재고를 추가해주세요.</span>
            )}
            <Button variant='primary' size='sm' onClick={addStock}>
              Add +
            </Button>
            <div className='mt-2'>
              {stock.map((item, index) => (
                <Row key={index} className='mb-2'>
                  <Col sm={4} xs={4}>
                    <Form.Select
                      onChange={(event) =>
                        handleSizeChange(event.target.value, index)
                      }
                      value={item[0] ? item[0].toLowerCase() : ''}
                    >
                      <option value='' disabled>
                        선택
                      </option>
                      {SIZE.map((item, index) => (
                        <option
                          key={index}
                          value={item.toLowerCase()}
                          disabled={stock.some(
                            (size) => size[0] === item.toLowerCase()
                          )}
                        >
                          {item}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col sm={6} xs={6}>
                    <Form.Control
                      onChange={(event) =>
                        handleStockChange(event.target.value, index)
                      }
                      type='number'
                      placeholder='number of stock'
                      value={item[1] ? item[1] : 0}
                      required
                    />
                  </Col>
                  <Col sm={2} xs={2}>
                    <Button
                      variant='danger'
                      size='sm'
                      onClick={() => deleteStock(index)}
                    >
                      -
                    </Button>
                  </Col>
                </Row>
              ))}
            </div>
          </Form.Group>

          <Form.Group controlId='image' className='mb-3'>
            <Form.Label className='me-2'>Image</Form.Label>
            <CloudinaryUploadWidget
              uwConfig={uwConfig}
              setPublicId={setPublicId}
              uploadImage={uploadImage}
            />
            {formData.image && (
              <img
                src={formData.image}
                alt='uploadedimage'
                className='upload-image ms-2'
              />
            )}
          </Form.Group>

          <Row className='mb-3'>
            <Form.Group as={Col} controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                onChange={handleChange}
                type='number'
                placeholder='0'
                value={formData.price}
                required
              />
            </Form.Group>
            <Form.Group as={Col} controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                onChange={onHandelCategory}
                value={formData.category}
                as='select'
                multiple
                required
              >
                {CATEGORY.map((item, idx) => (
                  <option key={idx} value={item.cate_no}>
                    {item.cate_nm}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} controlId='status'>
              <Form.Label>Status</Form.Label>
              <Form.Select
                onChange={handleChange}
                value={formData.status}
                required
              >
                {STATUS.map((item, idx) => (
                  <option key={idx} value={item.toLowerCase()}>
                    {item}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          {mode === 'new' ? (
            <Button variant='primary' type='submit'>
              Submit
            </Button>
          ) : (
            <Button variant='primary' type='submit'>
              Edit
            </Button>
          )}
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default NewItemDialog;
