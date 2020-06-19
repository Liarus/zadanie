import { ServiceType } from ".";

export interface RelatedService {
  related: ServiceType
  masters: ServiceType[],
}
