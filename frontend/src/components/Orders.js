import React, { useState } from 'react';
import axios from "axios";
import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, Divider,  IconButton,  List,  ListItem,  ListItemButton,  ListItemIcon,  ListItemText,  Stack, TextField, Typography } from '@mui/material';
import { Link, NavLink, useNavigate  } from 'react-router-dom'
import {Add, Close, Delete} from '@mui/icons-material';

import Order from './Order';
import NewOrder from './NewOrder';

const exampluUser = {
    Nume: '',
    Prenume: '',
    Adresa: '',
    Parola: '',
    Comenzi: [
        {
            Numar: '16988989898',
            Data: new Date(),
            Adresa: 'Timisoara',
            TotalPret: 100,
            Produse: [
                {
                    Nume: 'mere',
                    Cantitate: 3,
                    Pret: 5 // pret per bucata
                },
                {
                    Nume: 'salam',
                    Cantitate: 2,
                    Pret: 25
                },
                {
                    Nume: 'CocaCola',
                    Cantitate: 5,
                    Pret: 4
                },
                {
                    Nume: 'Baton',
                    Cantitate: 1,
                    Pret: 15
                },
            ]
        },
        {
            Numar: '2325443534',
            Data: new Date(),
            Adresa: 'Cluj',
            TotalPret: 700,
            Produse: [
                {
                    Nume: 'Prune',
                    Cantitate: 20,
                    Pret: 1 // pret per bucata
                },
                {
                    Nume: 'Parizer',
                    Cantitate: 3,
                    Pret: 20
                },
                {
                    Nume: 'Ciocolata',
                    Cantitate: 5,
                    Pret: 10
                },
                {
                    Nume: 'Parfum',
                    Cantitate: 1,
                    Pret: 270
                },
                {
                    Nume: 'Tricou',
                    Cantitate: 3,
                    Pret: 100
                },
            ]
        }
    ]    
}


export default function Orders() {

    const [comanadaNouaButtonPressed, setComanadaNouaButtonPressed] = useState(false);
    const [sendButtonPressed, setSendButtonPressed] = useState(false);
    const [resetButtonPressed, setResetButtonPressed] = useState(false);
    const [comanda, setComanda] = useState();

    const sendOrder = () => { 
        axios.post('http://localhost:3001/login', Order)
        .then(function (response) {
        console.log(response.data);
        })
        .catch(function (error) {
        // console.log(error);
        });
    }

    const handleComandaNoua = () => {
        setSendButtonPressed(false);
        setResetButtonPressed(false);
        setComanadaNouaButtonPressed(true);
    }

    const handleCloseDialogButton = () => {
        handleResetOrderButton();
        setComanadaNouaButtonPressed(false);
    }

    const handleResetOrderButton = () => {
        setComanda();
        setResetButtonPressed(true);
    }

    const handleSendOrderButton = () => {
        setSendButtonPressed(true);
    }
    
    const handleOnOrderChange = (Comanda) => {
        console.log(Comanda)
        setComanda(Comanda);
    }

    return([
        <Stack
            direction="column"
            justifyContent={'center'}
            alignItems="center"
            spacing={2}
            sx={{ height: '100vh', marginTop: 'auto', paddingTop: 'auto'}}
            >
            <Stack
                direction="row"
                spacing={2}
                justifyContent={'space-between'}
                alignItems="center"
                sx={{ width: '1000px' }}
            >
                <Typography>Hello</Typography>
                <TextField justifySelf='left' id="outlined-basic" label="Nume Prenume" variant="standard" disabled/>
                <Button justifySelf='right'
                        variant="outlined" 
                        sx={{width: 200, justifySelf: 'right'}}
                        onClick={() => {setComanadaNouaButtonPressed(true)}}
                        startIcon={<Add />}
                    >
                        Noua Comanda
                </Button>
            </Stack>
            <Stack
                direction="row"
                spacing={2}
                justifyContent={'center'}
            >
                <Stack
                    direction="column"
                    spacing={2}
                    justifyContent={'center'}
                >
                    {/* <Order data={2}/>    
                    <Order/> */}
                    {exampluUser.Comenzi.map((Comanda,index) => 
                        <Order comanda={Comanda} index={index+1}/>
                    )}
                </Stack>
            </Stack>
        </Stack>,
        <Dialog
            open={comanadaNouaButtonPressed}
            sx={{w: 500}}
            PaperProps={{
                sx: {
                  width: "100%",
                  maxWidth: "1300px",
                },
              }}
        >
            <DialogTitle>
                Comanda noua
                <IconButton
                    title='Close'
                    aria-label="close"
                    onClick={handleCloseDialogButton}
                    sx={{
                    position: "absolute",
                    right: 8,
                    top: 8,
                    }}>
                    <Close/>
                </IconButton>
            </DialogTitle>
            {/* <Box sx={{ width: "1800px"}}/> */}
            <DialogContent>
                <NewOrder onOrderChange={(Comanda) => {handleOnOrderChange(Comanda)}} resetOrder={resetButtonPressed}/>
                <Divider/>
                <br/>
                Sumar Comanda:
                { comanda &&
                    <Order comanda={comanda} index={123}/>
                }
            </DialogContent>
            <DialogActions>
                <Button autoFocus title='Reset Order' variant="contained" sx={{m: '0 auto 5px 5px'}} onClick={handleResetOrderButton} /*disabled={filesToUpload.length===0}*/>
                    Reset
                </Button>
                <Button autoFocus title='Send Order' variant="contained" sx={{m: '0 5px 5px auto',}} onClick={handleSendOrderButton} disabled={comanda ? !(comanda.Produse.length>0) : true}>
                    Send
                </Button>
            </DialogActions>
        </Dialog>
        
    ])
}