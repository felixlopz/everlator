import React, { useEffect } from "react";
import { IAerialItem } from "../models";
import styled from "styled-components";
import {
  CalculateAerialItemPrice,
  FormatItemPriceForUIComponent,
  PRICE_PER_POUND,
} from "../utils";
import { useState } from "react";

interface Props {
  aerialItem: IAerialItem;
  deleteAerialItem: (id: string) => void;
  onAerialItemChange: (aerialItem: IAerialItem) => void;
}

const ItemWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  border: 1px solid black;
  margin-bottom: 10px;
  border-radius: 4px;
`;

const Name = styled.h2`
  margin-top: 0;
  flex-grow: 1;
  flex-basis: 100%;

  span {
    color: red;
    font-size: 12px;
    font-weight: 400;
    margin-left: 20px;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Input = styled.input`
  width: 100px;
  flex-grow: 1;
`;

const FormulaWrapper = styled.div`
  display: flex;
  align-items: center;
  max-width: 60%;
  flex-wrap: wrap;
`;

const Result = styled.h1`
  margin-left: 40px;
`;

interface IInput {
  weight: number;
}

export const AerialItem = (props: Props) => {
  const [inputValues, setInputValues] = useState<IInput>({
    weight: props.aerialItem.weight,
  });

  const handleInputChange = (e) => {
    const { value } = e.target;

    setInputValues({
      weight: value,
    });

    props.onAerialItemChange({ ...props.aerialItem, weight: value });
  };

  return (
    <ItemWrapper>
      <Name>
        {props.aerialItem.name}{" "}
        <span
          onClick={() => {
            props.deleteAerialItem(props.aerialItem.id);
          }}
        >
          borrar
        </span>
      </Name>
      <FormulaWrapper>
        <Input
          value={inputValues.weight}
          name="weight"
          placeholder="Libras"
          onChange={(e) => {
            handleInputChange(e);
          }}
          type="number"
        />
      </FormulaWrapper>
      <Result>
        ={" "}
        {FormatItemPriceForUIComponent(
          CalculateAerialItemPrice(inputValues.weight)
        )}
        $
      </Result>
    </ItemWrapper>
  );
};
