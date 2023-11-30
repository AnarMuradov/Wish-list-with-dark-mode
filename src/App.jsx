import "./App.css";
import WishList from "./components/wishlist";
import Usedarkmode from "../src/components/Hooks/Usedarkmode";

function App() {
  const { handleTheme } = Usedarkmode();
  return (
    <div className="App">
      <button onClick={handleTheme}>
        click for: {localStorage.getItem("theme")}
      </button>
      <WishList />
    </div>
  );
}

export default App;
