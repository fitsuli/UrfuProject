import { Autocomplete, TextField, debounce, Card } from "@mui/material"
import React, { useEffect } from "react";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { CreateLostAnimalDto } from "../../Models/CreateLostAnimalEntity";
import { Geocode, GeoObject } from "../../Models/YaMapsGeocodeApiResponse";
import axios from "axios";

export const GeocodeSearch: React.FC<{
    lostAnimalEntity: CreateLostAnimalDto,
    handleChange: (prop: string, value: string | undefined) => void
}> = ({ lostAnimalEntity, handleChange }) => {
    const YANDEX_API_URL = "https://geocode-maps.yandex.ru/1.x/?format=json&apikey=50a0b904-8d78-499e-800b-13f172c69c8a&geocode="

    const [value, setValue] = React.useState<GeoObject | null>(null);
    const [inputValue, setInputValue] = React.useState('');
    const [options, setOptions] = React.useState<readonly GeoObject[]>([]);

    const mapState = React.useMemo(
        () => ({
            center: lostAnimalEntity.geoPosition ? lostAnimalEntity.geoPosition.split(" ").map(x => Number(x)).reverse() : [55.75, 37.57],
            zoom: 13,
            controls: ['zoomControl']
        }),
        [lostAnimalEntity.addressFull]
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
            fullWidth
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
            onChange={(event: any, newValue: GeoObject | null) => {
                setOptions(newValue ? [newValue, ...options] : options);
                setValue(newValue);
                handleChange("addressFull", newValue?.metaDataProperty.GeocoderMetaData.text);
                handleChange("addressCity", newValue?.metaDataProperty.GeocoderMetaData.AddressDetails.Country.AdministrativeArea?.SubAdministrativeArea?.Locality?.LocalityName)
                handleChange("geoPosition", newValue?.Point.pos)
            }}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
            }}
            renderInput={(params) => (
                <TextField {...params} label="Город, улица, дом" fullWidth />
            )}
        />
        <Card>
            <YMaps>
                <Map
                    state={mapState}
                    modules={['control.ZoomControl']}
                    style={{
                        aspectRatio: '2/1'
                    }}>
                    <Placemark geometry={mapState.center} />
                </Map>
            </YMaps>
        </Card>
    </>
}