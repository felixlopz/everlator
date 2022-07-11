import React, { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { IOceanItem } from "../models";
import { LocalStorageItems } from "../models/LocalStorageItems";
import {
  SaveOceanItemsToLocalStorage,
  GetItemsFromLocalStorage,
} from "../services";
import {
  CalculateOceanItemPrice,
  CreateNewOceanItem,
  FormatItemPriceForUIComponent,
} from "../utils";
import { OceanItem } from "./OceanItem";

const OceanListWrapper = styled.div`
  flex-basis: 50%;
`;

const List = styled.ul`
  padding: 0;
`;

const OceanListControllers = styled.div``;

const AddButton = styled.button``;

const ItemNameInput = styled.input``;

export const OceanList = () => {
  const [oceanItems, setOceanItems] = useState<Array<IOceanItem>>([]);

  const [itemName, setItemName] = useState<string>("");

  const addNewOceanItem = () => {
    if (itemName == null || itemName === "") {
      return;
    }

    const newOceanItem = CreateNewOceanItem(itemName);
    const newOceanItems = new Array(...oceanItems, newOceanItem);

    setItemName("");
    setOceanItems(newOceanItems);
    SaveOceanItemsToLocalStorage(newOceanItems);
  };

  const deleteOceanItem = (itemId: string) => {
    const newOceanItems: Array<IOceanItem> = oceanItems.filter(
      (item) => item.id !== itemId
    );
    setOceanItems(newOceanItems);
    SaveOceanItemsToLocalStorage(newOceanItems);
  };

  const handleOceanItemChange = (oceanItem: IOceanItem) => {
    const newOceanItems: Array<IOceanItem> = oceanItems.map((item) => {
      if (item.id === oceanItem.id) {
        return oceanItem;
      }

      return item;
    });

    setOceanItems(newOceanItems);
    SaveOceanItemsToLocalStorage(newOceanItems);
  };

  const calculateTotal = (): string => {
    let total: number = 0;

    oceanItems.forEach((item) => {
      total += CalculateOceanItemPrice(item.width, item.height, item.depth);
    });

    return FormatItemPriceForUIComponent(total);
  };

  useEffect(() => {
    const items: LocalStorageItems = GetItemsFromLocalStorage();
    setOceanItems(items.oceanItems);
  }, []);

  return (
    <OceanListWrapper>
      <OceanListControllers>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addNewOceanItem();
          }}
        >
          <p>Agrega tu producto para envio maritimo</p>
          <AddButton
            onClick={() => {
              addNewOceanItem();
            }}
          >
            +
          </AddButton>
          <ItemNameInput
            type="text"
            onChange={(e) => {
              setItemName(e.target.value);
            }}
            value={itemName}
          />
        </form>
        <h3>Total: {calculateTotal()}$</h3>
      </OceanListControllers>
      <List>
        {oceanItems.map((oceanItem) => (
          <OceanItem
            key={oceanItem.id}
            oceanItem={oceanItem}
            deleteOceanItem={deleteOceanItem}
            onOceanItemChange={handleOceanItemChange}
          />
        ))}
      </List>
    </OceanListWrapper>
  );
};
