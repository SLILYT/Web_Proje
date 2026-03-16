import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Modal, Button as BsButton } from 'react-bootstrap';
import { AnimatePresence } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import Header from './components/Header';
import GameCard from './components/GameCard';
import GameForm from './components/GameForm';
import ClassicGames from './components/ClassicGames';
import './index.css';

function App() {
  const [games, setGames] = useState([]);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [showForm, setShowForm] = useState(false);
  const [currentGame, setCurrentGame] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [gameToDelete, setGameToDelete] = useState(null);

  // Load games from localStorage
  useEffect(() => {
    const savedGames = JSON.parse(localStorage.getItem('games')) || [];
    setGames(savedGames);
  }, []);

  // Save games to localStorage
  useEffect(() => {
    localStorage.setItem('games', JSON.stringify(games));
  }, [games]);

  // Handle Theme Change
  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const addGame = (game) => {
    const isDuplicate = games.some(g => g.title.toLowerCase() === game.title.toLowerCase());
    if (isDuplicate) {
      alert('Bu oyun zaten kütüphanenizde mevcut!');
      return;
    }
    const newGame = { ...game, id: Date.now() };
    setGames(prev => [newGame, ...prev]);
    setShowForm(false);
  };

  const updateGame = (updatedGame) => {
    setGames(prev => prev.map(g => (g.id === updatedGame.id ? updatedGame : g)));
    setShowForm(false);
    setCurrentGame(null);
  };

  const deleteGame = () => {
    if (gameToDelete) {
      setGames(prev => prev.filter(g => g.id !== gameToDelete.id));
      setShowDeleteConfirm(false);
      setGameToDelete(null);
    }
  };

  const openDeleteModal = (game) => {
    setGameToDelete(game);
    setShowDeleteConfirm(true);
  };

  const openEditModal = (game) => {
    setCurrentGame(game);
    setShowForm(true);
  };

  return (
    <div className="min-vh-100 pb-5">
      <Header theme={theme} toggleTheme={toggleTheme} onAddClick={() => { setCurrentGame(null); setShowForm(true); }} />
      
      <Container className="mt-4">
        <Row className="g-4">
          {/* Main List Section */}
          <Col lg={8}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="fw-bold">Oyun Arşivim ({games.length})</h2>
            </div>
            
            <Row className="g-3">
              <AnimatePresence mode="popLayout">
                {games.length > 0 ? (
                  games.map((game) => (
                    <Col key={game.id} xs={12} md={6}>
                      <GameCard 
                        game={game} 
                        onDelete={() => openDeleteModal(game)} 
                        onEdit={() => openEditModal(game)} 
                      />
                    </Col>
                  ))
                ) : (
                  <Col xs={12}>
                    <div className="text-center py-5 border rounded bg-light-subtle">
                      <p className="text-muted mb-0">Henüz oyun eklenmemiş. "Yeni Oyun Ekle" butonu veya yan menüdeki önerilerle başlayın!</p>
                    </div>
                  </Col>
                )}
              </AnimatePresence>
            </Row>
          </Col>

          {/* Sidebar Section */}
          <Col lg={4}>
            <ClassicGames onAddGame={addGame} currentGames={games} />
          </Col>
        </Row>
      </Container>

      <GameForm 
        show={showForm} 
        handleClose={() => { setShowForm(false); setCurrentGame(null); }} 
        onSave={currentGame ? updateGame : addGame}
        editGame={currentGame}
      />

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteConfirm} onHide={() => setShowDeleteConfirm(false)} centered size="sm">
        <Modal.Body className="text-center py-4">
          <div className="text-danger mb-3">
            <AlertTriangle size={48} />
          </div>
          <h5 className="fw-bold mb-2">Emin misiniz?</h5>
          <p className="text-muted small mb-4">
            <strong>{gameToDelete?.title}</strong> kütüphanenizden kalıcı olarak silinecek.
          </p>
          <div className="d-grid gap-2">
            <BsButton variant="danger" onClick={deleteGame}>
              Evet, Sil
            </BsButton>
            <BsButton variant="light" onClick={() => setShowDeleteConfirm(false)}>
              İptal
            </BsButton>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default App;
