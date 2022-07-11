import { IAerialItem, IOceanItem } from "../models";
import { LocalStorageItems } from "../models/LocalStorageItems";
import { LOCAL_STORAGE_DATA_KEY } from "../utils";

export function SaveItemsToLocalStorage(
  oceanItems: Array<IOceanItem>,
  aerialItems: Array<IAerialItem>
) {
  localStorage.setItem(
    LOCAL_STORAGE_DATA_KEY,
    JSON.stringify({ oceanItems, aerialItems })
  );
}

export function SaveOceanItemsToLocalStorage(oceanItems: Array<IOceanItem>) {
  const items: LocalStorageItems = GetItemsFromLocalStorage();

  localStorage.setItem(
    LOCAL_STORAGE_DATA_KEY,
    JSON.stringify({ oceanItems, aerialItems: items.aerialItems })
  );
}

export function SaveAerialItemsToLocalStorage(aerialItems: Array<IAerialItem>) {
  const items: LocalStorageItems = GetItemsFromLocalStorage();

  localStorage.setItem(
    LOCAL_STORAGE_DATA_KEY,
    JSON.stringify({ aerialItems, oceanItems: items.oceanItems })
  );
}

export function GetItemsFromLocalStorage(): LocalStorageItems {
  const data: string | null = localStorage.getItem(LOCAL_STORAGE_DATA_KEY);

  if (data == null) {
    return {
      aerialItems: [],
      oceanItems: [],
    };
  }

  return JSON.parse(data) as LocalStorageItems;
}
