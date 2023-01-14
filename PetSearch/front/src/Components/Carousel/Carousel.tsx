import { Box, Card } from "@mui/material";
import React, { useEffect, useState } from "react";
import Carousel from 'react-material-ui-carousel'

export const ImageFileCarousel: React.FC<{
    files: File[],
}> = ({ files, ...props }) => {
    return <>
        <Carousel navButtonsAlwaysVisible={true} animation={"fade"} duration={400}>
            {files?.map((file, i) => <ImageFileItem {...props} file={file} key={i} />)}
        </Carousel>
    </>
}

export const ImageUrlCarousel: React.FC<{
    sourceUrls: string[]
}> = ({ sourceUrls, ...props }) => {
    const baseUrl = "https://localhost:7257"
    return <>
        <Carousel navButtonsAlwaysVisible={true} animation={"fade"} duration={400}>
            {sourceUrls?.map((fileSourceUrl, i) => <ImageSourceItem {...props} fileSourceUrl={baseUrl + `/AnimalsImages/${fileSourceUrl}`} key={i} />)}
        </Carousel>
    </>
}

const ImageFileItem: React.FC<{
    file: File
}> = ({ file, ...props }) => {
    const [preview, setPreview] = useState<string>("")

    useEffect(() => {
        const objectUrl = URL.createObjectURL(file)
        setPreview(objectUrl)

        return () => URL.revokeObjectURL(objectUrl)
    }, [file])

    return <ImageSourceItem {...props} fileSourceUrl={preview} />
}

const ImageSourceItem: React.FC<{
    fileSourceUrl: string
}> = ({ fileSourceUrl, ...props }) => {
    return <>

        <Card variant="outlined"
            sx={{
                position: "relative",
                overflow: "hidden",
                height: "300px",
                ...props,
            }}>
            <div style={{
                position: "relative",
                height: "100%",
                backgroundImage: `url(${fileSourceUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                filter: "blur(16px)"
            }}/>
            <img src={fileSourceUrl}
                style={{
                    height: "300px",
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    objectFit: "cover",
                    ...props
                }} />
        </Card>
    </>
}