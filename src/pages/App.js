import '../App.css';
import Router from "./Router";

function App() {
  return (
    <div className="wrap">
      <header>
        <Router />
      </header>
      {/* <img className="greeting" src="/imgs/greeting.gif" alt="안녕하세요"/> */}
      <footer>
        <p>made by LEE</p>
      </footer>
    </div>
  );
}

export default App;