import React from 'react';
import { Card, Badge, Button, ButtonGroup } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Edit2, Trash2, Monitor, Trophy, Clock } from 'lucide-react';

const GameCard = ({ game, onDelete, onEdit }) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Bitti': return <Badge bg="success" className="d-flex align-items-center gap-1"><Trophy size={14}/> {status}</Badge>;
      case 'Oynanıyor': return <Badge bg="info" className="d-flex align-items-center gap-1"><Clock size={14}/> {status}</Badge>;
      case 'Bekliyor': return <Badge bg="secondary">{status}</Badge>;
      default: return <Badge bg="primary">{status}</Badge>;
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="game-card h-100 border-0 shadow-sm overflow-hidden">
        <div className="card-top-accent bg-primary" style={{ height: '4px' }}></div>
        <Card.Body>
          <div className="d-flex justify-content-between align-items-start mb-2">
            <Badge bg="light" text="dark" className="border d-flex align-items-center gap-1">
              <Monitor size={12} /> {game.platform}
            </Badge>
            {getStatusBadge(game.status)}
          </div>
          
          <Card.Title className="fw-bold mb-1">{game.title}</Card.Title>
          <Card.Subtitle className="text-muted small mb-3">{game.genre}</Card.Subtitle>
          
          <div className="d-flex justify-content-end mt-auto">
            <ButtonGroup size="sm">
              <Button variant="outline-primary" onClick={onEdit} className="d-flex align-items-center gap-1">
                <Edit2 size={14} />
              </Button>
              <Button variant="outline-danger" onClick={onDelete} className="d-flex align-items-center gap-1">
                <Trash2 size={14} />
              </Button>
            </ButtonGroup>
          </div>
        </Card.Body>
      </Card>
    </motion.div>
  );
};

export default GameCard;
