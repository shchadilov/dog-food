import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from "react-router-dom";
import App from './App';

const root = createRoot(document.getElementById('root'));
root.render(
// Комментарий для преподавателя, после проверки удалю:
// с помощью атрибута basename я решал ту же проблему с Github Pages, которую на лекциях группы LK
// решали с помощью переменной PATH. Благодаря basename дополняются пути у <Link /> и navigate().
  <Router basename="/dog-food">
    <App />
  </Router>
);