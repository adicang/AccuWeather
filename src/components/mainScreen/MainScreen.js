import React from "react";
import SearchBar from "./SearchBar";
import CurrWeatherContainer from "./CurrWeatherContainer";
import { Container } from "react-bootstrap";

export default function MainScreen() {
  return (
    <Container>
      <CurrWeatherContainer />
      <SearchBar />
    </Container>
  );
}
