import './App.scss';
import { useState, useEffect } from 'react';
import Footer from '../Footer/Footer';
import Loader from '../Loader/Loader';
import Header from '../Header/Header';
import Main from '../Main/Main';

function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => { setLoading(false) }, []);

  return (
    <div className="App">
      <Loader state={loading} page>
        <Header />
        <Main />
        <Footer />
      </Loader>
    </div>
  );
}

export default App;
