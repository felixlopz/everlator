import React from "react";
import styled from "styled-components";
import "./App.css";
import { AerialList, OceanList } from "./components";

import {
  PACKAGING_SERVICE,
  PRICE_PER_CUBIC_FOOT,
  PRICE_PER_POUND,
} from "./utils";

const Header = styled.header``;

const Title = styled.h1``;

const HeaderInfoWrapper = styled.div`
  display: flex;
`;

const Price = styled.p`
  margin-right: 40px;
`;

const ListsWrappers = styled.div`
  display: flex;
  width: 100%;
  div:not(:last-child) {
    margin-right: 40px;
  }
`;

function App() {
  return (
    <div className="page">
      <Header>
        <Title>Everlogix Calculator</Title>
        <HeaderInfoWrapper>
          <Price>Reempaque: ${PACKAGING_SERVICE} </Price>
          <Price>Tasa aerea: ${PRICE_PER_POUND} x libra </Price>
          <Price>Tasa maritima: ${PRICE_PER_CUBIC_FOOT} x pie cubico</Price>
        </HeaderInfoWrapper>
      </Header>
      <ListsWrappers>
        <OceanList />
        <AerialList />
      </ListsWrappers>
    </div>
  );
}

export default App;
