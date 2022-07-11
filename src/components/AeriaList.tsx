import React, { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { IAerialItem } from "../models";
import { LocalStorageItems } from "../models/LocalStorageItems";
import {
  SaveAerialItemsToLocalStorage,
  GetItemsFromLocalStorage,
} from "../services";
import {
  CalculateAerialItemPrice,
  CreateNewAerialItem,
  FormatItemPriceForUIComponent,
} from "../utils";
import { AerialItem } from "./AerialItem";

const AerialListWrapper = styled.div`
  flex-basis: 50%;
`;

const List = styled.ul`
  padding: 0;
`;

const AerialListControllers = styled.div``;

const AddButton = styled.button``;

const ItemNameInput = styled.input``;

export const AerialList = () => {
  const [aerialItems, setAerialItems] = useState<Array<IAerialItem>>([]);

  const [itemName, setItemName] = useState<string>("");

  const addNewAerialItem = () => {
    if (itemName == null || itemName === "") {
      return;
    }

    const newAerialItem: IAerialItem = CreateNewAerialItem(itemName);
    const newAerialItems: Array<IAerialItem> = new Array(
      ...aerialItems,
      newAerialItem
    );

    setItemName("");
    setAerialItems(newAerialItems);
    SaveAerialItemsToLocalStorage(newAerialItems);
  };

  const deleteAerialItem = (itemId: string) => {
    const newAerialItems: Array<IAerialItem> = aerialItems.filter(
      (item) => item.id !== itemId
    );
    setAerialItems(newAerialItems);
    SaveAerialItemsToLocalStorage(newAerialItems);
  };

  const handleAerialItemChange = (aerialItem: IAerialItem) => {
    const newAerialItems: Array<IAerialItem> = aerialItems.map((item) => {
      if (item.id === aerialItem.id) {
        return aerialItem;
      }

      return item;
    });

    setAerialItems(newAerialItems);
    SaveAerialItemsToLocalStorage(newAerialItems);
  };

  const calculateTotal = (): string => {
    let total: number = 0;

    aerialItems.forEach((item) => {
      total += CalculateAerialItemPrice(item.weight);
    });

    return FormatItemPriceForUIComponent(total);
  };

  useEffect(() => {
    const items: LocalStorageItems = GetItemsFromLocalStorage();
    setAerialItems(items.aerialItems);
  }, []);

  return (
    <AerialListWrapper>
      <AerialListControllers>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addNewAerialItem();
          }}
        >
          <p>Agrega tu producto para envio aereo</p>
          <AddButton
            onClick={() => {
              addNewAerialItem();
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
      </AerialListControllers>
      <List>
        {aerialItems.map((aerialItem) => (
          <AerialItem
            key={aerialItem.id}
            aerialItem={aerialItem}
            deleteAerialItem={deleteAerialItem}
            onAerialItemChange={handleAerialItemChange}
          />
        ))}
      </List>
    </AerialListWrapper>
  );
};
