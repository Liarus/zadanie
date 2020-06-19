import { ServiceYear, ServiceType } from ".";


export interface CatalogueItem {
  year?: ServiceYear;
  services: [ServiceType, number][]
}

export interface Catalogue {
  items: CatalogueItem[];
}

export class DefaultCatalogue implements Catalogue {
  items: CatalogueItem[] = [];

  Add(item: CatalogueItem) {
    var exists = this.items.find(e => e.year == item.year);
    if (exists != undefined) {
      throw Error(`catalogue item for a given year ${exists.year} already exists`);
    }
    this.items = [...this.items, item];
  }

  GetDefaultCatalogue(){
    return this.items.find(e => e.year == undefined);
  }
    
}
