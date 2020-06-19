import { ServiceYear, ServiceType } from ".";

export interface DiscountEntry {
  year?: ServiceYear;
  value: number;
}

export interface Discount {
  id: number;
  package: ServiceType[];
  entries: DiscountEntry[];
}
