import React from 'react';
import { Card, ListGroup, Button } from 'react-bootstrap';
import { Plus, Sparkles } from 'lucide-react';

const CLASSIC_GAMES = [
  { title: 'Red Dead Redemption 2', platform: 'PC', genre: 'Aksiyon-Macera', status: 'Bekliyor' },
  { title: 'The Witcher 3: Wild Hunt', platform: 'PC', genre: 'RPG', status: 'Bekliyor' },
  { title: 'Elden Ring', platform: 'PC', genre: 'Souls-like', status: 'Bekliyor' },
  { title: 'Baldur\'s Gate 3', platform: 'PC', genre: 'RPG', status: 'Bekliyor' },
  { title: 'God of War Ragnarök', platform: 'PS5', genre: 'Aksiyon-Macera', status: 'Bekliyor' },
  { title: 'The Last of Us Part II', platform: 'PS4', genre: 'Aksiyon-Hayatta Kalma', status: 'Bekliyor' },
  { title: 'Cyberpunk 2077', platform: 'PC', genre: 'Aksiyon-RPG', status: 'Bekliyor' },
  { title: 'Hades', platform: 'PC', genre: 'Roguelike', status: 'Bekliyor' },
  { title: 'Spider-Man 2', platform: 'PS5', genre: 'Aksiyon', status: 'Bekliyor' },
  { title: 'Ghost of Tsushima', platform: 'PS5', genre: 'Aksiyon-Macera', status: 'Bekliyor' }
];

const ClassicGames = ({ onAddGame, currentGames }) => {
  return (
    <Card className="border-0 shadow-sm overflow-hidden">
      <Card.Header className="bg-primary text-white border-0 py-3 d-flex align-items-center gap-2">
        <Sparkles size={20} />
        <h5 className="mb-0 fw-bold">Kült Klasikler</h5>
      </Card.Header>
      <ListGroup variant="flush">
        {CLASSIC_GAMES.map((game, index) => {
          const isAdded = currentGames.some(g => g.title.toLowerCase() === game.title.toLowerCase());
          
          return (
            <ListGroup.Item 
              key={index} 
              className="d-flex justify-content-between align-items-center py-3 classic-game-item"
            >
              <div>
                <div className="fw-bold smsll">{game.title}</div>
                <div className="text-muted small">{game.genre} • {game.platform}</div>
              </div>
              <Button 
                variant={isAdded ? "success" : "outline-primary"} 
                size="sm"
                disabled={isAdded}
                onClick={() => onAddGame(game)}
                className="rounded-circle p-1 d-flex align-items-center justify-content-center"
                style={{ width: '32px', height: '32px' }}
                title={isAdded ? "Zaten eklendi" : "Arşive Ekle"}
              >
                {isAdded ? "✓" : <Plus size={18} />}
              </Button>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </Card>
  );
};

export default ClassicGames;
