import React from 'react'
import { useNavigate} from 'react-router-dom';
import {useSelector} from "react-redux"

import {useTheme} from "@mui/material/styles";
import { Typography, Container, Box } from '@mui/material';
import Grid from "@mui/material/Unstable_Grid2"

import Logo from '../components/Logo';
import {selectAuth} from "../state/auth/authSlice"

const MenuUtama = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const {user} = useSelector(selectAuth);

  const menus = [
    {
      name : "INFO SALDO",
      path : "/info-saldo"
    },
    {
      name : "TRANSFER",
      path : "/transfer"
    },
    {
      name : "TARIK DANA",
      path : "/tarik-dana"
    },
    {
      name : "RIWAYAT TRANSAKSI",
      path : "/riwayat-transaksi"
    },
    {
      name : "KELUAR",
      path : "/keluar"
    }
  ]
  return (
    <Container fixed sx={{backgroundColor : theme.palette.primary.main, height : "100vh", minWidth : "100vw", display : "flex", flexDirection : "column", alignItems : "center", justifyContent : "center"}}>
      <Grid container sx={{width : "80%", height : "95%", flexDirection : "column", alignItems : "center"}}>
        <Grid>
          <Logo width="220px" height="90px" imageSize="50px" orientation="horizontal" textVariant="h4"/>
        </Grid>
        <Grid sx={{height : "130px", display : "flex", flexDirection : "column", alignItems : "center", justifyContent : "space-evenly", mb : 3}}>
          <Typography variant="h2" sx={{color : "white"}}>Selamat datang, {user ? user.nama : "John Doe"} </Typography>
          <Typography variant="body2" sx={{color : "white"}}>Silakan pilih apa yang ingin Anda lakukan dengan akun Anda</Typography>
        </Grid>
        <Grid container spacing={5} sx={{width : "100%", height : "50%"}}>
          {
            menus.map((menu, idx) => (
            <Grid xs={idx<3 ? 4 : 6} sx={{display : "flex", alignItems : "center", justifyContent : "center"}}>
              <Box sx={{borderRadius : 3, height : "100%", width : idx<3 ? "100%" : "64%", backgroundColor : "#FFE1D1", display : "flex", alignItems : "center", justifyContent : "center", cursor : "pointer", textAlign : "center", "&:hover" : {
                backgroundColor : "#FF8748",
                color : "white"
              }}} onClick={() => navigate(menu.path)}>
                <Typography variant="body1">{menu.name}</Typography>
              </Box>
            </Grid>
            ))
          }
          
        </Grid>
      </Grid>
    </Container>
  )
    
}

export default MenuUtama