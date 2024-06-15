import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { ProductType, StockType } from '../../../model/product';
import { CATEGORY, STATUS, SIZE } from '../../../constants/product.constants';

interface OwnProps {
  showDialog: boolean;
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const InitialFormData = {
  name: '',
  sku: '',
  stock: {},
  image: '',
  description: '',
  category: [],
  status: 'active',
  price: 0,
};

function NewItemDialog({ showDialog, setShowDialog }: OwnProps) {
  const handleClose = () => setShowDialog(false);
  const [formData, setFormData] = useState<ProductType>(InitialFormData);
  const [stock, setStock] = useState<(string[] | [])[]>([]);

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

  return (
    <Modal size='lg' show={showDialog} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create New Product</Modal.Title>
      </Modal.Header>
      <Modal.Body className='p-3'>
        <Form>
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
            <Button variant='primary' size='sm' onClick={addStock}>
              Add +
            </Button>
            <div className='mt-2'>
              {stock.map((item, index) => (
                <Row key={index} className='mb-2'>
                  <Col sm={4}>
                    <Form.Select
                      onChange={(event) =>
                        handleSizeChange(event.target.value, index)
                      }
                      defaultValue={item[0] ? item[0].toLowerCase() : ''}
                    >
                      <option value='' hidden>
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
                  <Col sm={6}>
                    <Form.Control
                      onChange={(event) =>
                        handleStockChange(event.target.value, index)
                      }
                      type='number'
                      placeholder='number of stock'
                      value={item[1]}
                      required
                    />
                  </Col>
                  <Col sm={2}>
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
            <Button variant='primary' size='sm'>
              Upload Image +
            </Button>
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
                onChange={handleChange}
                value={formData.category}
                as='select'
                multiple
                required
              >
                {CATEGORY.map((item, idx) => (
                  <option key={idx} value={item.toLowerCase()}>
                    {item}
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
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='primary' onClick={handleClose}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default NewItemDialog;
