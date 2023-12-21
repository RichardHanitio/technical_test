import React, {useState, useEffect} from 'react'
import {useTheme} from "@mui/material/styles";
import { useNavigate } from 'react-router-dom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Typography, Container, Box} from '@mui/material';
import Logo from '../components/Logo';
import Grid from "@mui/material/Unstable_Grid2"
import EnhancedTable from '../components/Tabel';
import {useSnackbar} from "notistack"
import { makeRequest } from '../requests';
import {useSelector} from "react-redux"
import {selectAuth} from "../state/auth/authSlice"

const RiwayatTransaksi = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const {user} = useSelector(selectAuth)
  const [rows, setRows] = useState([])
  const {enqueueSnackbar} = useSnackbar();
  useEffect(() => {
    const fetchData = async() => {
      try {
        const res = await makeRequest({url : `/transactions?uid=${user.id}`})
        const data = res.data
        setRows(data.map((d) => createData(d.idTransaksi, d.tanggalTransaksi, d.idSumber, d.idTujuan, d.tujuanTransaksi, d.jumlah)) )
      } catch(err) {
        const errMsg = err.response.data.msg
        enqueueSnackbar(errMsg ? errMsg : "Gagal memuat riwayat transaksi, mohon coba lagi", {variant : "error"})
      }
    }
    fetchData();
  }, [])

  function createData(idTransaksi, tanggalTransaksi, idSumber, idTujuan, tujuanTransaksi, nominal) {
    return {
      idTransaksi,
      tanggalTransaksi,
      idSumber,
      idTujuan,
      tujuanTransaksi,
      nominal,
    };
  }
  
  // const rows = [
  //   createData(1, "12/12/2023", 5000000, "abc321", "Biaya uang kuliah"),
  //   createData(2, "13/12/2023", 3000000, "abc001", "Biaya uang kos"),
  // ];

  const headCells = [
    {
      id : "tanggal",
      numeric : false,
      disablePadding : true,
      label : "Tanggal"
    },
    {
      id : "id-sumber",
      numeric : false,
      disablePadding : true,
      label : "ID Sumber"
    },
    {
      id : "id-tujuan",
      numeric : false,
      disablePadding : true,
      label : "ID Tujuan"
    },
    {
      id : "nominal",
      numeric : false,
      disablePadding : true,
      label : "Nominal"
    },
    {
      id : "tujuan-transaksi",
      numeric : false,
      disablePadding : true,
      label : "Tujuan Transaksi"
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