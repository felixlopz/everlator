import { IAerialItem } from "./Aerialitem";
import { IOceanItem } from "./OceanItem";

export interface LocalStorageItems {
  oceanItems: Array<IOceanItem>;
  aerialItems: Array<IAerialItem>;
}
