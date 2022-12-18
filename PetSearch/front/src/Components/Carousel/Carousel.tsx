import { Box, Card } from "@mui/material";
import React, { useEffect, useState } from "react";

export const Carousel: React.FC<{
    files: File[]
}> = ({ files }) => {
    return <>
        {files.map((file, i) => <Item file={file} key={i} />)}
    </>
}

const Item: React.FC<{
    file: File
}> = ({ file }) => {

    const [preview, setPreview] = useState<string>()

    useEffect(() => {
        const objectUrl = URL.createObjectURL(file)
        setPreview(objectUrl)

        return () => URL.revokeObjectURL(objectUrl)
    }, [file])

    return <Card>
        <Box sx={{
            position: "relative",
            overflow: "hidden",
            height: "300px",
        }}>
            <img src={preview} style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                height: "300px",
                objectFit: "cover"
            }} />
        </Box>
    </Card>;
}