import React from 'react'
import {createBrowserRouter, RouterProvider} from "react-router-dom"

import Welcome from "./routes/Welcome"
import Daftar from "./routes/Daftar"
import Error from "./routes/Error"
import InfoSaldo from "./routes/InfoSaldo"
import IsiSaldo from "./routes/IsiSaldo"
import Keluar from "./routes/Keluar"
import Masuk from "./routes/Masuk"
import MenuUtama from "./routes/MenuUtama"
import RiwayatTransaksi from "./routes/RiwayatTransaksi"
import TarikDana from "./routes/TarikDana"
import Thankyou from "./routes/Thankyou"
import Transfer from "./routes/Transfer"

import {ThemeProvider, createTheme} from "@mui/material/styles"
import ProtectedRoute from './routes/ProtectedRoute'

const theme = createTheme({
  breakpoints : {
    values : {
      xxs: 0,
      xs : 375,
      sm: 600,
      md: 1025,
      lg: 1200,
      xl: 1536,
      xxl : 1920
    },
  },
  palette : {
    primary : {
      main : "#324B4B",
      light : "#265A5B",
      dark : "#223434"
    },
  },
  typography : {
    fontFamily : ["Lexend", "sans-serif"].join(","),
    h1 : {
      fontSize : 50,
      fontWeight : 700
    },
    h2 : {
      fontSize : 36,
      fontWeight : 700
    },
    h3 : {
      fontSize : 28,
      fontWeight : 700
    },
    h4 : {
      fontSize : 20,
      fontWeight : 600
    },
    h5 : {
      fontSize : 16,
      fontWeight : 600
    },
    body1 : {
      fontSize : 20,
      fontWeight : 400
    },
    body2 : {
      fontSize : 16,
      fontWeight : 500
    },
    body3 : {
      fontSize : 14,
      fontWeight : 500
    },
    body4 : {
      fontSize : 12,
      fontWeight : 500
    },
  },
  components : {
    MuiAppBar : {
      styleOverrides : {
        root : {
          backgroundColor : "#265A5B"
        }
      }
    },
    MuiButton : {
      variants : [
        {
          props : { variant: "contained", color : "primary"},
          style : {
            backgroundColor : "#FF8748",
            color : "white",
            "&:hover" : {
              backgroundColor : "#B74424",
            }
          }
        },
        {
          props : { variant: "contained", color : "secondary"},
          style : {
            backgroundColor : "#FFE1D1",
            color : "black",
            "&:hover" : {
              backgroundColor : "#FF8748",
              color : "white"
            }
          }
        },
        {
          props : { variant: "contained", color : "warning"},
          style : {
            backgroundColor : "#B73A7E",
            color : "white",
            "&:hover" : {
              backgroundColor : "#7A1660",
              color : "white"
            }
          }
        },
      ],
      styleOverrides : {
        root : {
          padding : "5px 20px",
        }
      }
    },
    MuiFormControl : {
      styleOverrides : {
        root : {
          "& fieldset" : {
            borderColor : "white"
          },
          "& label" : {
            fontSize : 16,
            color : "white"
          }
        },
      }
    },
    MuiFormLabel : {
      styleOverrides : {
        root : {
          color : "white",
          "&.Mui-focused" : {
            color : "white"
          }
        }
      }
    },
    MuiOutlinedInput : {
      styleOverrides : {
        root : {
          "&.Mui-focused .MuiOutlinedInput-notchedOutline" : {
            borderColor : "white !important"
          },
          "&:hover.Mui-disabled .MuiOutlinedInput-notchedOutline" : {
            borderColor : "rgba(0, 0, 0, 0.3) !important"
          },
          
          "&:hover .MuiOutlinedInput-notchedOutline" : {
            borderColor : "white !important"
          },
        },
        input : {
          color : "white",
          fontSize : 16
        }
      }
    },
    MuiInput : {
      styleOverrides : {
        root : {
          '&:before, &:after': {
            borderBottom: 'none',
          },
          '&:hover:not(.Mui-disabled, .Mui-error):before': {
            borderBottom: 'none',
          },
          '&.Mui-focused:after': {
            borderBottom: 'none',
          },
        },
        input : {
          color : "black",
          fontSize : 14
        }
      }
    },
    MuiSvgIcon : {
      styleOverrides : {
        root : {
          color : "white"
        }
      }
    }
  }
})


const router = createBrowserRouter([
  { path : "/", element: <Welcome />},
  { path : "/daftar", element: <Daftar />},
  { path : "/info-saldo", element: (
    <ProtectedRoute redirectPath="/" msg="Masuk untuk dapat menuju halaman info saldo">
      <InfoSaldo />
    </ProtectedRoute>
  )},
  { path : "/isi-saldo", element: (
    <ProtectedRoute redirectPath="/" msg="Masuk untuk dapat menuju halaman isi saldo">
      <IsiSaldo />
    </ProtectedRoute>
  )},
  { path : "/keluar", element: (
    <ProtectedRoute redirectPath="/" msg="Masuk untuk dapat menuju halaman keluar">
      <Keluar />
    </ProtectedRoute>
  )},
  { path : "/masuk", element: <Masuk />},
  { path : "/menu-utama", element : (
    <ProtectedRoute redirectPath="/" msg="Masuk untuk dapat menuju halaman menu utama">
      <MenuUtama />
    </ProtectedRoute>
  )},
  { path : "/riwayat-transaksi", element : (
    <ProtectedRoute redirectPath="/" msg="Masuk untuk dapat menuju halaman riwayat transaksi">
      <RiwayatTransaksi />
    </ProtectedRoute>
  )},
  { path : "/tarik-dana", element: (
    <ProtectedRoute redirectPath="/" msg="Masuk untuk dapat menuju halaman tarik dana">
      <TarikDana />
    </ProtectedRoute>
  )},
  { path : "/terima-kasih", element: (
    <ProtectedRoute redirectPath="/" msg="Masuk untuk dapat menuju halaman terima kasih">
      <Thankyou />
    </ProtectedRoute>
  )},
  { path : "/transfer", element: (
    <ProtectedRoute redirectPath="/" msg="Masuk untuk dapat menuju halaman transfer">
      <Transfer />
    </ProtectedRoute>
  )},
  { path : "*", element : <Error />}
])

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}



export default App