import React, { useEffect } from "react";
import { IOceanItem } from "../models";
import styled from "styled-components";
import {
  CalculateOceanItemPrice,
  CUBIC_FOOT_DIVISOR,
  FormatItemPriceForUIComponent,
} from "../utils";
import { useState } from "react";

interface Props {
  oceanItem: IOceanItem;
  deleteOceanItem: (id: string) => void;
  onOceanItemChange: (oceanItem: IOceanItem) => void;
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
  max-width: 50px;
  flex-grow: 1;
`;

const FormulaWrapper = styled.div`
  display: flex;
  align-items: center;
  max-width: 60%;
  flex-wrap: wrap;
`;

const CubicFootDivisor = styled.span`
  display: block;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid black;
  flex-basis: 100%;
  text-align: center;
`;

const Result = styled.h1`
  margin-left: 40px;
`;

interface IInput {
  width: number;
  height: number;
  depth: number;
}

export const OceanItem = (props: Props) => {
  const [inputValues, setInputValues] = useState<IInput>({
    width: props.oceanItem.width,
    height: props.oceanItem.height,
    depth: props.oceanItem.depth,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setInputValues({
      ...inputValues,
      [name]: value,
    });

    props.onOceanItemChange({
      ...props.oceanItem,
      ...inputValues,
      [name]: value,
    });
  };

  return (
    <ItemWrapper>
      <Name>
        {props.oceanItem.name}{" "}
        <span
          onClick={() => {
            props.deleteOceanItem(props.oceanItem.id);
          }}
        >
          borrar
        </span>
      </Name>
      <FormulaWrapper>
        <Input
          value={inputValues.width}
          name="width"
          placeholder="Ancho"
          onChange={(e) => {
            handleInputChange(e);
          }}
          type="number"
        />{" "}
        x{" "}
        <Input
          value={inputValues.height}
          name="height"
          placeholder="Alto"
          onChange={(e) => {
            handleInputChange(e);
          }}
          type="number"
        />{" "}
        x{" "}
        <Input
          value={inputValues.depth}
          name="depth"
          placeholder="Largo"
          onChange={(e) => {
            handleInputChange(e);
          }}
          type="number"
        />
        <CubicFootDivisor>{CUBIC_FOOT_DIVISOR}</CubicFootDivisor>
      </FormulaWrapper>
      <Result>
        ={" "}
        {FormatItemPriceForUIComponent(
          CalculateOceanItemPrice(
            inputValues.width,
            inputValues.height,
            inputValues.depth
          )
        )}
        $
      </Result>
    </ItemWrapper>
  );
};
