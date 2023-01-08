export interface Geocode {
    response: Response;
}
export interface Response {
    GeoObjectCollection: GeoObjectCollection;
}
export interface GeoObjectCollection {
    featureMember: (FeatureMemberEntity)[];
}

export interface FeatureMemberEntity {
    GeoObject: GeoObject;
}
export interface GeoObject {
    metaDataProperty: MetaDataProperty;
    name: string;
    description: string;
    Point: Point;
}
export interface MetaDataProperty {
    GeocoderMetaData: GeocoderMetaData;
}
export interface GeocoderMetaData {
    precision: string;
    text: string;
    kind: string;
    Address: Address;
    AddressDetails: AddressDetails;
}
export interface Address {
    country_code: string;
    formatted: string;
    Components?: (ComponentsEntity)[] | null;
}
export interface ComponentsEntity {
    kind: string;
    name: string;
}
export interface AddressDetails {
    Country: Country;
}
export interface Country {
    AddressLine: string;
    CountryNameCode: string;
    CountryName: string;
    AdministrativeArea: AdministrativeArea;
}
export interface AdministrativeArea {
    AdministrativeAreaName: string;
    SubAdministrativeArea: SubAdministrativeArea;
}
export interface SubAdministrativeArea {
    SubAdministrativeAreaName: string;
    Locality: Locality;
}
export interface Locality {
    LocalityName: string;
    Thoroughfare: Thoroughfare;
}
export interface Thoroughfare {
    ThoroughfareName: string;
}
export interface BoundedBy {
    Envelope: Envelope;
}
export interface Envelope {
    lowerCorner: string;
    upperCorner: string;
}
export interface Point {
    pos: string;
}