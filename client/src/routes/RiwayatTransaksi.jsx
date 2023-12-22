import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import {useSelector} from "react-redux"
import {useSnackbar} from "notistack"

import {useTheme} from "@mui/material/styles";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Typography, Container, Box} from '@mui/material';
import Grid from "@mui/material/Unstable_Grid2"

import { makeRequest } from '../requests';
import EnhancedTable from '../components/Tabel';
import Logo from '../components/Logo';
import {selectAuth} from "../state/auth/authSlice"

const RiwayatTransaksi = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const {user} = useSelector(selectAuth)
  const [rows, setRows] = useState([])
  const {enqueueSnackbar} = useSnackbar();
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchData = async() => {
      try {
        const res = await makeRequest({url : `/transactions?uid=${user.id}`})
        setError(false)
        setRows(res.data)
      } catch(err) {
        setError(true)
        let errMsg = "Gagal memuat riwayat transaksi, mohon coba lagi"
        if (err.response && err.response.data) {
          errMsg = err.response.data.msg
        }
        enqueueSnackbar(errMsg, {variant : "error"})
      } finally{
        setLoading(false)
      }
    }
    fetchData();
  }, [])

  const headCells = [
    {
      id : "tanggal-transaksi",
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
      id : "tujuan-transaksi",
      numeric : false,
      disablePadding : true,
      label : "Tujuan Transaksi"
    },
    {
      id : "nominal",
      numeric : false,
      disablePadding : true,
      label : "Nominal"
    },
  ];
  
  return (
    <Container fixed sx={{backgroundColor : theme.palette.primary.main, minHeight : "100vh", minWidth : "100vw", display : "flex", flexDirection : "column", alignItems : "center"}}>
      <Box sx={{backgroundColor : "rgba(255,255,255,.5)", borderRadius : "50%", width : 40, height : 40, position : "absolute", left : 50, top : 30, cursor : "pointer", "&:hover" : {backgroundColor : "rgba(255,255,255,.7)"}}} onClick={() => navigate(-1)}>
        <ChevronLeftIcon sx={{fontSize : 40, color : "black"}}/>
      </Box>
      <Grid container sx={{width : "80%", height : "95%", flexDirection : "column", alignItems : "center"}}>
        <Grid sx={{height : "100px", display : "flex", alignItems : "center"}}>
          <Logo width="220px" height="90px" imageSize="50px" orientation="horizontal" textVariant="h4"/>
        </Grid>
        <Grid sx={{height : "80px", display : "flex", alignItems : "center"}}>
          <Typography variant="h2" sx={{color : "white"}}>RIWAYAT TRANSAKSI</Typography>
        </Grid>
        <Grid container sx={{ width : "80%", height : "65%"}}>
          {
            (!loading && !error) ? 
              <EnhancedTable rows={rows} headCells={headCells}/>
            : (error) &&
              <Typography variant="body2" sx={{color : "white", textAlign : "center", width : "100%"}}>Gagal memuat riwayat</Typography>
          }
        </Grid>
      </Grid>
    </Container>
  )
}

export default RiwayatTransaksi