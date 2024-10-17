

import GestionarNotas from './components/notas/GestionarNotas.js';
import AppIntro from './components/AppIntro.js';

import { Button } from 'react-bootstrap';

const App = () => {




  return (
    <div >
      <GestionarNotas></GestionarNotas>
          <Button href="#">Link</Button> 
          <Button type="submit">Button</Button>{' '}
          <AppIntro></AppIntro>

    </div>
  );
}

export default App;