import React from 'react'
import {useTheme} from "@mui/material/styles";
import { useNavigate } from 'react-router-dom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Typography, Container, Box} from '@mui/material';
import Logo from '../components/Logo';
import Grid from "@mui/material/Unstable_Grid2"
import EnhancedTable from '../components/Tabel';

const RiwayatTransaksi = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  function createData(id, tanggal, nominal, idTujuan, tujuanTransfer) {
    return {
      id,
      tanggal,
      nominal,
      idTujuan,
      tujuanTransfer,
    };
  }
  
  const rows = [
    createData(1, "12/12/2023", 5000000, "abc321", "Biaya uang kuliah"),
    createData(2, "13/12/2023", 3000000, "abc001", "Biaya uang kos"),
  ];

  const headCells = [
    {
      id : "tanggal",
      numeric : false,
      disablePadding : true,
      label : "Tanggal"
    },
    {
      id : "nominal",
      numeric : false,
      disablePadding : true,
      label : "Nominal"
    },
    {
      id : "id-tujuan",
      numeric : false,
      disablePadding : true,
      label : "ID Tujuan"
    },
    {
      id : "tujuan-transfer",
      numeric : false,
      disablePadding : true,
      label : "Tujuan Transfer"
    }
  ];
  
  return (
    <Container fixed sx={{backgroundColor : theme.palette.primary.main, height : "100vh", minWidth : "100vw", display : "flex", flexDirection : "column", alignItems : "center", justifyContent : "center"}}>
      <Box sx={{backgroundColor : "rgba(255,255,255,.5)", borderRadius : "50%", width : 40, height : 40, position : "absolute", left : 50, top : 30, cursor : "pointer", "&:hover" : {backgroundColor : "rgba(255,255,255,.7)"}}} onClick={() => navigate(-1)}>
        <ChevronLeftIcon sx={{fontSize : 40, color : "black"}}/>
      </Box>
      <Grid container sx={{width : "80%", height : "95%", flexDirection : "column", alignItems : "center"}}>
        <Grid sx={{flexBasis : "10%"}}>
          <Logo width="220px" height="90px" imageSize="50px" orientation="horizontal" textVariant="h4"/>
        </Grid>
        <Grid sx={{height : "80px"}}>
          <Typography variant="h2" sx={{color : "white"}}>RIWAYAT TRANSAKSI</Typography>
        </Grid>
        <Grid container sx={{ width : "80%", height : "65%"}}>
          <EnhancedTable rows={rows} headCells={headCells}/>
        </Grid>
      </Grid>
    </Container>
  )
}

export default RiwayatTransaksi