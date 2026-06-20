import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import GeneratorPage from './pages/GeneratorPage';
import CardViewerPage from './pages/CardViewerPage';
import './styles/App.css';

export default function App() {
  return (
    <div className="app-shell">
      <Header />

      <div className="app-shell__content">
        <Routes>
          <Route path="/" element={<GeneratorPage />} />
          <Route path="/card/:token" element={<CardViewerPage />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}
