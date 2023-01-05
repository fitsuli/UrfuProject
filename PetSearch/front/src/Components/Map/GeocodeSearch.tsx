import { Autocomplete, TextField, debounce } from "@mui/material"
import React, { useEffect } from "react";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { CreateLostAnimalEntityDto } from "../../Models/CreateLostAnimalEntity";
import axios from "axios";

export const GeocodeSearch: React.FC<{
    lostAnimalEntity: CreateLostAnimalEntityDto,
    handleChange: (prop: string, value: string) => void
}> = ({ lostAnimalEntity, handleChange }) => {
    const YANDEX_API_URL = "https://geocode-maps.yandex.ru/1.x/?format=json&apikey=50a0b904-8d78-499e-800b-13f172c69c8a&geocode="

    const [value, setValue] = React.useState<GeoObject | null>(null);
    const [inputValue, setInputValue] = React.useState('');
    const [options, setOptions] = React.useState<readonly GeoObject[]>([]);

    const mapState = React.useMemo(
        () => ({
            center: lostAnimalEntity.lostGeoPosition ? lostAnimalEntity.lostGeoPosition.split(" ").map(x => Number(x)).reverse() : [55.75, 37.57],
            zoom: 9,
            controls: ['zoomControl']
        }),
        [lostAnimalEntity]
    );

    const fetch = React.useMemo(
        () =>
            debounce(
                async (
                    request: { input: string },
                    callback: (results?: readonly GeoObject[]) => void,
                ) => {
                    const res = await axios.get<Geocode>(`${YANDEX_API_URL}${request.input}`)
                    callback(res.data.response.GeoObjectCollection.featureMember.map(x => x.GeoObject))
                },
                400,
            ),
        [],
    );

    useEffect(() => {
        let active = true;

        if (inputValue === '') {
            setOptions(value ? [value] : []);
            return undefined;
        }

        fetch({ input: inputValue }, (results?: readonly GeoObject[]) => {
            if (active) {
                let newOptions: readonly GeoObject[] = [];

                if (value) {
                    newOptions = [value];
                }

                if (results) {
                    newOptions = [...newOptions, ...results];
                }

                setOptions(newOptions);
            }
        });

        return () => {
            active = false;
        };
    }, [value, inputValue, fetch]);

    return <>
        <Autocomplete
            sx={{ width: 300 }}
            filterOptions={(x) => x}
            getOptionLabel={(option) =>
                typeof option === 'string' ? option : option.metaDataProperty.GeocoderMetaData.text
            }
            options={options}
            autoComplete
            includeInputInList
            filterSelectedOptions
            value={value}
            noOptionsText="Опции отсутствуют"
            //@ts-ignore
            onChange={(event: any, newValue: GeoObject | null) => {
                setOptions(newValue ? [newValue, ...options] : options);
                setValue(newValue);
                handleChange("lostAddressFull", newValue.metaDataProperty.GeocoderMetaData.text);
                handleChange("lostAddressCity", newValue.metaDataProperty.GeocoderMetaData.AddressDetails.Country.AdministrativeArea?.SubAdministrativeArea?.Locality?.LocalityName)
                handleChange("lostGeoPosition", newValue.Point.pos)
            }}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
            }}
            renderInput={(params) => (
                <TextField {...params} label="Город, улица, дом" fullWidth />
            )}
        />
        <YMaps >
            <Map
                state={mapState}
                modules={['control.ZoomControl']}
                style={{
                    aspectRatio: '2/1'
                }}>
                <Placemark geometry={mapState.center} />
            </Map>
        </YMaps>
    </>
}
export interface Geocode {
    response: Response;
}
export interface Response {
    GeoObjectCollection: GeoObjectCollection;
}
export interface GeoObjectCollection {
    featureMember?: (FeatureMemberEntity)[] | null;
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