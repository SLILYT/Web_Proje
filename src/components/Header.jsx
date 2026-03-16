import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { Sun, Moon, PlusCircle, Gamepad2 } from 'lucide-react';

const Header = ({ theme, toggleTheme, onAddClick }) => {
  return (
    <Navbar bg={theme === 'light' ? 'white' : 'dark'} variant={theme} expand="lg" className="shadow-sm sticky-top">
      <Container>
        <Navbar.Brand href="#" className="d-flex align-items-center gap-2 fw-bold">
          <Gamepad2 size={28} className="text-primary" />
          <span>GameBackLog</span>
        </Navbar.Brand>
        
        <div className="d-flex gap-2">
          <Button variant="primary" className="d-flex align-items-center gap-2" onClick={onAddClick}>
            <PlusCircle size={18} />
            <span className="d-none d-sm-inline">Yeni Oyun Ekle</span>
          </Button>
          
          <Button 
            variant={theme === 'light' ? 'outline-dark' : 'outline-warning'} 
            onClick={toggleTheme}
            className="d-flex align-items-center justify-content-center p-2"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </Button>
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;
