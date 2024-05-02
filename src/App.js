import "./App.css";
import React from "react";
import { Title } from "./components/texts/Title";
import { SubHeader } from "./components/elements/SubHeader";
import { AppCalculator } from "./list/AppCalculator";
import { AppRates } from "./list/AppRates";
import { Header } from "./components/elements/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <SubHeader />
      <Title>Currency Converter</Title>
      <AppCalculator />
      <Title>Rates</Title>
      <AppRates />
    </div>
  );
}

export default App;
