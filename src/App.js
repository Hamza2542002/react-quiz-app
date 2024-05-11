import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import { QuizProvider } from "./context/QuizContext";

function App() {
  return (
    <QuizProvider>
      <div className="app container">
        <Header />
        <Main className="main"></Main>
      </div>
    </QuizProvider>
  );
}

export default App;
