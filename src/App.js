import { Routes, Route, Link} from "react-router-dom";
import { Pizza } from "./pizza";

const style = { margin: '1rem', padding: '0.5rem', border: '2px solid black' };

function Home() {
  return <h2 style={{ ...style, borderColor: 'red' }}>Home</h2>;
}


function App() {
  return (
    <nav>
      <h1>Lambda Eats</h1>
      <p>World Wide Pizza</p>
      <nav>
        <Link to="/">order</Link>&nbsp;
        <Link to="/pizza"><button id="order-pizza">Form</button></Link>&nbsp;
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pizza" element={<Pizza />} />
      </Routes>
    </nav>
  );
}

export default App;