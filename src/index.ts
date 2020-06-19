import { relatedServices, currentCatalogue, discounts } from "./consts";

export type ServiceYear = 2020 | 2021 | 2022;
export type ServiceType = "Photography" | "VideoRecording" | "BlurayPackage" | "TwoDayEvent" | "WeddingSession";

export const updateSelectedServices = (
    previouslySelectedServices: ServiceType[],
    action: { type: "Select" | "Deselect"; service: ServiceType }
) => {
    switch (action.type)
    {
        case "Select": {
            var prerequsite = relatedServices.find(e => e.related == action.service)?.masters;
            if (prerequsite != undefined && !previouslySelectedServices.some(e => prerequsite.includes(e))) {
                return previouslySelectedServices;
            }
            return previouslySelectedServices.includes(action.service) 
                ? previouslySelectedServices 
                : [...previouslySelectedServices, action.service];
        }
        case "Deselect": {
            var actual = previouslySelectedServices.filter(e => e != action.service);
            var related = relatedServices.filter(e => e.masters.includes(action.service));
            for(let item of related) {
                actual = !actual.some(e => item.masters.includes(e)) ? actual.filter(e => e != item.related) : actual;
            }
            return actual;
        }
    }
}

export const calculatePrice = (selectedServices: ServiceType[], selectedYear: ServiceYear) => {
 if (selectedServices.length == 0) {
    return { basePrice: 0, finalPrice: 0 }
 }
 const defaultCatalogue = currentCatalogue.GetDefaultCatalogue();
 const catalogue = currentCatalogue.items.find(e => e.year == selectedYear);
 if (catalogue == undefined) {
    return  { basePrice: 0, finalPrice: 0 }
 }

 const items = catalogue.services.filter(e => selectedServices.includes(e[0]))
 const filtered = [
     ...items, 
     ...defaultCatalogue.services.filter(e => !items.includes(e) && selectedServices.includes(e[0]))];

 const base = filtered
 .map(item => item[1])
 .reduce((prev, curr) => prev + curr, 0);
 var final = base;

 const availableDiscounts = discounts.filter(e => e.package.every(o => filtered.findIndex(e => e[0] == o) > -1));
 if (availableDiscounts.length > 0) {
    const disc = new Map()
    availableDiscounts.forEach(e => {
        var amount = Math.max(...e.entries.filter(e => e.year == undefined || e.year == selectedYear).map(o => o.value));
        if (amount > 0) {
            if (disc.has(e.id)) {
                var existing = disc.get(e.id);
                if (amount > existing) {
                    disc.set(e.id, amount);
                }
            } else {
                disc.set(e.id, amount);
            }
        }
    });
    disc.forEach((value: number, key: number) => {
        final = final - value;
    })
 }

 return  { basePrice: base, finalPrice: final }
};
