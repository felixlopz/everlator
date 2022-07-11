import { BaseItem, IOceanItem } from "../models";
import {
  CUBIC_FOOT_DIVISOR,
  PRICE_PER_CUBIC_FOOT,
  PRICE_PER_POUND,
} from "./Constans";
import { GenerateRandomString } from "./GenerateRandomId";

export function CreateNewItem(name: string): BaseItem {
  return {
    id: GenerateRandomString(),
    name: name,
  };
}

export function CreateNewOceanItem(
  name: string,
  width: number = 0,
  height: number = 0,
  depth: number = 0
): IOceanItem {
  return {
    ...CreateNewItem(name),
    width,
    height,
    depth,
  };
}

export function CreateNewAerialItem(name: string, weight: number = 0) {
  return {
    ...CreateNewItem(name),
    weight,
  };
}

export function CalculateAerialItemPrice(weight: number): number {
  const result: number = weight * PRICE_PER_POUND;

  return result;
}

export function CalculateOceanItemPrice(
  width: number,
  height: number,
  depth: number
): number {
  const result: number =
    ((width * height * depth) / CUBIC_FOOT_DIVISOR) * PRICE_PER_CUBIC_FOOT;

  return result;
}

export function FormatItemPriceForUIComponent(price: number): string {
  return Math.floor(price).toString();
}
