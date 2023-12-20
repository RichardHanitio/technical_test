import React from 'react'
import { useNavigate } from 'react-router-dom';

import {Container, Typography, Box, Button} from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2"
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Logo from '../components/Logo';
import {useTheme} from "@mui/material/styles";

const Keluar = () => {
  const navigate = useNavigate()
  const theme = useTheme()

  return (
    <Container fixed sx={{backgroundColor : theme.palette.primary.main, height : "100vh", minWidth : "100vw", display : "flex", flexDirection : "column", alignItems : "center", justifyContent : "center"}}>
      <Box sx={{backgroundColor : "rgba(255,255,255,.5)", borderRadius : "50%", width : 40, height : 40, position : "absolute", left : 50, top : 30, cursor : "pointer", "&:hover" : {backgroundColor : "rgba(255,255,255,.7)"}}} onClick={() => navigate(-1)}>
        <ChevronLeftIcon sx={{fontSize : 40, color : "black"}}/>
      </Box>

      <Grid container sx={{width : "80%", height : "95%", flexDirection : "column", alignItems : "center"}}>
        <Grid sx={{flexBasis : "10%"}}>
          <Logo width="220px" height="90px" imageSize="50px" orientation="horizontal" textVariant="h4"/>
        </Grid>
        <Grid sx={{flexBasis : "20%", display : "flex", alignItems : "center", justifyContent : "center", mt:2}}>
          <Typography variant="h2" sx={{color : "white"}}>KELUAR</Typography>
        </Grid>
        <Grid sx={{flexBasis : "10%", display : "flex", alignItems : "center", justifyContent : "center", mt:2}}>
          <Typography variant="body1" sx={{color : "white"}}>Anda yakin ingin keluar?</Typography>
        </Grid>
        <Grid sx={{flexBasis : "10%", display : "flex", alignItems : "center", justifyContent : "space-evenly", mt:2, width : "30%"}}>
          <Button variant="contained" color = "primary" onClick={() => navigate("/")}>
            <Typography sx={{color : "white", fontWeight : "600"}}>Ya</Typography>
          </Button>
          <Button variant="contained" color="secondary" onClick={() => navigate("/menu-utama")}>
            <Typography sx={{fontWeight : "600"}}>Tidak</Typography>
          </Button>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Keluar