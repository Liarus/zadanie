import { RelatedService } from "./relations";
import { DefaultCatalogue } from "./catalogue";
import { Discount } from "./discount";

export const relatedServices: RelatedService[] = [
  {
      related: "BlurayPackage",
      masters: ["VideoRecording"]
  },
  {
      related: "TwoDayEvent",
      masters: ["VideoRecording", "Photography"]
  }
];

export const discounts: Discount[] = [
  {
    id: 1,
    entries: [
      {
        year: 2020,
        value: 1200
      },
      {
        year: 2021,
        value: 1300
      },
      {
        year: 2022,
        value: 1300
      }
    ],
    package: ["Photography", "VideoRecording"],
  },
  {
    id: 2,
    entries: [
      {
        value: 300
      },
      {
        year: 2022,
        value: 600
      }
    ],
    package: ["Photography", "WeddingSession"],
  },
  {
    id: 2,
    entries: [
      {
        value: 300
      }
    ],
    package: ["VideoRecording", "WeddingSession"]
  }
];

export const currentCatalogue = new DefaultCatalogue();
currentCatalogue.Add({
  services: [
      ["WeddingSession", 600], ["BlurayPackage", 300], ["TwoDayEvent", 400]
  ]
});
currentCatalogue.Add({
  year: 2020,
  services: [
      ["Photography", 1700], ["VideoRecording", 1700]
  ]
});
currentCatalogue.Add({
  year: 2021,
  services: [
      ["Photography", 1800], ["VideoRecording", 1800]
  ]
});
currentCatalogue.Add({
  year: 2022,
  services: [
      ["Photography", 1900], ["VideoRecording", 1900]
  ]
});
