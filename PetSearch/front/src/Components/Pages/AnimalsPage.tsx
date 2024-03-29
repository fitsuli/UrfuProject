import { Autocomplete, Box, Button, Card, CircularProgress, Pagination, Stack, TextField, ToggleButton, ToggleButtonGroup, Typography, useTheme } from "@mui/material";
import React from "react";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { useState, useMemo } from "react";
import { AnimalFilterType } from "../../Models/AnimalFilterType";
import { AnimalVariant } from "../../Models/AnimalVariant";
import { useAnimalsCitiesQuery } from "../../QueryFetches/ApiHooks";
import { CircularProgressStyle } from "../../Styles/SxStyles";
import { BuildQuery } from "../Common/QueryBuilder";
import { AnimalsGrid } from "../Animals/AnimalsGrid";

const ANIMALS_ON_PAGE = 8

export const AnimalsPage: React.FC<{
    variant: AnimalVariant;
}> = ({ variant }) => {
    const [sortDesc, setSortDesc] = useState(true);
    const [inputValue, setInputValue] = useState('')
    const [cityValue, setCityValue] = useState<string>('')
    const [animalFilter, setAnimalFilter] = useState<AnimalFilterType | null>(null)
    const [page, setPage] = useState(1)
    const [query, setQuery] = useState(BuildQuery(sortDesc, ANIMALS_ON_PAGE, 0, cityValue, animalFilter))
    const { data: cities, isLoading: isCitiesLoading } = useAnimalsCitiesQuery(variant)

    const theme = useTheme()

    if (isCitiesLoading) {
        return <CircularProgress sx={CircularProgressStyle} />
    }


    const onFilterChange = (newPage: number | null) => {
        if (newPage != null){
            setQuery(BuildQuery(sortDesc, ANIMALS_ON_PAGE, ANIMALS_ON_PAGE * (newPage - 1), cityValue, animalFilter))
            setPage(newPage)
        }
        else {
            setQuery(BuildQuery(sortDesc, ANIMALS_ON_PAGE, ANIMALS_ON_PAGE * (page - 1), cityValue, animalFilter))
        }
    }

    return <>
        <Stack>
            <Card sx={{ marginX: "42px", mb: "36px" }}>
                <Stack direction={"row"} p={4} spacing={4}>
                    <Stack spacing={2} sx={{ flexBasis: "30%" }}>
                        <Typography>Где вы ищите</Typography>
                        <Autocomplete
                            getOptionLabel={(option) => {
                                return typeof option === 'string' ? option : option
                            }}
                            options={cities!}
                            autoComplete
                            includeInputInList
                            filterSelectedOptions
                            inputValue={inputValue}
                            value={cityValue || null}
                            noOptionsText="Опции отсутствуют"
                            onChange={(event: any, newValue: string | null) => {
                                setCityValue(newValue!)
                            }}
                            onInputChange={(event, newInputValue) => {
                                setInputValue(newInputValue);
                            }}
                            renderInput={(params) => (
                                <TextField {...params} label="Выберите город" fullWidth />
                            )}
                        />
                    </Stack>

                    <Stack spacing={2} sx={{ flexBasis: "50%" }}>
                        <Typography>Кого вы ищите</Typography>
                        <ToggleButtonGroup
                            sx={{ justifyContent: "center" }}
                            fullWidth
                            color="primary"
                            size="large"
                            value={animalFilter}
                            exclusive={true}
                            onChange={(event, value) => { setAnimalFilter(value) }}>
                            <ToggleButton value={AnimalFilterType.Cat} key={AnimalFilterType.Cat}>
                                Кошки
                            </ToggleButton>
                            <ToggleButton value={AnimalFilterType.Dog} key={AnimalFilterType.Dog}>
                                Собаки
                            </ToggleButton>
                            <ToggleButton value={AnimalFilterType.Other} key={AnimalFilterType.Other}>
                                Другие
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Stack>
                    <Stack spacing={2} sx={{ flexBasis: "20%" }}>
                        <Stack direction={"row"} spacing={0} alignItems={"center"} justifyContent={"flex-end"}>
                            <Typography variant={"body1"} color={theme.palette.grey[600]}>Сортировать: </Typography>
                            <Box sx={{
                                "&:hover": {
                                    cursor: "pointer",
                                    backgroundColor: theme.palette.grey[100]
                                }
                            }}
                                onClick={() => setSortDesc(!sortDesc)}
                            >
                                <Stack direction={"row"} spacing={0.5} alignItems={"center"}>
                                    <Typography
                                        variant={"body1"}
                                        px={"5px"}>
                                        По дате
                                    </Typography>
                                    {sortDesc ?
                                        <img width={"25px"} height={"25px"} src="https://img.icons8.com/ios-filled/512/generic-sorting.png" /> :
                                        <img width={"25px"} height={"25px"} src="https://img.icons8.com/ios-filled/512/generic-sorting-2.png" />}
                                </Stack>
                            </Box>
                        </Stack>
                        <Button sx={{ height: "100%", borderRadius: 3 }} startIcon={<SearchRoundedIcon />} variant="outlined" onClick={() => onFilterChange(null)}>Найти</Button>
                    </Stack>
                </Stack>
            </Card>
        </Stack>
        <AnimalsGrid query={query} variant={variant} />
        
        <Pagination sx={{
            pt: "36px", marginX: "auto",
        }}
            count={2} 
            color={'primary'}
            page={page}
            onChange={(event, page) => onFilterChange(page)} />
    </>
}