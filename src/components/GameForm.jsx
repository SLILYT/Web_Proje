import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { Save, X } from 'lucide-react';

const GameForm = ({ show, handleClose, onSave, editGame }) => {
  const initialState = {
    title: '',
    platform: 'PC',
    genre: '',
    status: 'Bekliyor'
  };

  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (editGame) {
      setFormData(editGame);
    } else {
      setFormData(initialState);
    }
  }, [editGame, show]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.genre.trim()) {
      alert('Lütfen tüm alanları doldurun!');
      return;
    }
    onSave(formData);
    setFormData(initialState);
  };

  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static">
      <Modal.Header closeButton className="border-0">
        <Modal.Title className="fw-bold">
          {editGame ? 'Oyunu Güncelle' : 'Yeni Oyun Ekle'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label className="small fw-bold">Oyun Adı</Form.Label>
            <Form.Control
              type="text"
              placeholder="Örn: The Witcher 3"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              autoFocus
            />
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold">Platform</Form.Label>
                <Form.Select
                  value={formData.platform}
                  onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                >
                  <option>PC</option>
                  <option>PS5</option>
                  <option>PS4</option>
                  <option>Xbox Series X</option>
                  <option>Nintendo Switch</option>
                  <option>Mobile</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold">Tür</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Örn: RPG"
                  value={formData.genre}
                  onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-4">
            <Form.Label className="small fw-bold">Durum</Form.Label>
            <Form.Select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <option>Bekliyor</option>
              <option>Oynanıyor</option>
              <option>Bitti</option>
            </Form.Select>
          </Form.Group>

          <div className="d-flex gap-2">
            <Button variant="light" onClick={handleClose} className="flex-grow-1 d-flex align-items-center justify-content-center gap-2">
              <X size={18} /> İptal
            </Button>
            <Button variant="primary" type="submit" className="flex-grow-1 d-flex align-items-center justify-content-center gap-2">
              <Save size={18} /> {editGame ? 'Güncelle' : 'Kaydet'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default GameForm;
