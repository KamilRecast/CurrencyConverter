import "./App.css";
import logo from "./Logo/png/logo-no-background.png";
import React from "react";
import { Title } from "./components/texts/Title";
import { SubHeader } from "./components/elements/SubHeader";
import { AppCalculator } from "./list/AppCalculator";
import { AppRates } from "./list/AppRates";


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <SubHeader />
      <Title>Currency Converter</Title>
      <AppCalculator />
      <Title>Rates</Title>
      <AppRates />
    </div>
  );
}

export default App;
