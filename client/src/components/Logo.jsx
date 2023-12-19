import React from 'react'
import {Box, Typography} from "@mui/material"

const Logo = ({height, width, imageSize="200px", orientation="vertical", textVariant="h2"}) => {
  return (
    <Box sx={{display : "flex", flexDirection : orientation==="vertical" ? "column" : "row", alignItems : "center", justifyContent : "space-around", height : height || "250px", width : width || "300px"}}>
      <img src="/assets/R-logo.png" alt="bank logo" style={{width : imageSize}} />
      <Typography variant={textVariant} sx={{color : "white", fontWeight : "bold"}}>Bank of Richard</Typography>
    </Box>
  )
}

export default Logo