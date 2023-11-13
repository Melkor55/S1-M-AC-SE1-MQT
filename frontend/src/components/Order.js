import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Checkbox, Divider,  IconButton,  List,  ListItem,  ListItemButton,  ListItemIcon,  ListItemText,  Stack, TextField, Typography } from '@mui/material';
import { Link, NavLink, useNavigate  } from 'react-router-dom'
import {Delete, ExitToApp, ExpandMore} from '@mui/icons-material';

export default function Order({comanda, index}) {
    return (
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                >
                    {/* <Typography>Comanda 1 - {data ? data : 'invalid date'}</Typography> */}
                    <Typography>Comanda {index} - {comanda.Data.toISOString}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Stack
                        direction="row"
                        spacing={2}
                        justifyContent={'center'}
                    >
                        <TextField id="outlined-basic" label={'Adresa:' + comanda.Adresa} variant="outlined" />
                        <TextField id="outlined-basic" label={'Comanda:' + comanda.Numar} variant="outlined" />
                    </Stack>
                    <List sx={{ minWidth: '1200px', maxWidth: '2000px', bgcolor: 'background.paper' }}>
                        <ListItem>
                                    <ListItemText primary={`Nr.`} sx={{width: 80, maxWidth: 80}} />
                                    <ListItemText primary={`Produs`} sx={{width: 700, maxWidth: 700}} />
                                    {/* <Divider orientation='vertical' flexItem sx={{marginX: '10px'}}/> */}
                                    <ListItemText primary={`Cantitate`}  sx={{width: 100, maxWidth: 100}} />
                                    <ListItemText primary={``}  sx={{width:50, maxWidth:50}} />
                                    <ListItemText primary={`Pret`} sx={{width: 120, maxWidth: 120}} />
                                    <ListItemText primary={`Total`} sx={{width: 120, maxWidth: 120}} />
                        </ListItem>
                        {comanda.Produse.map((Produs,index) => {
                            return (
                                <ListItem
                                    key={index}
                                    secondaryAction={
                                        <IconButton edge="end">
                                            <ExitToApp/>
                                        </IconButton>
                                    }
                                    disablePadding
                                    justifyContent={'center'}
                                >
                                    <ListItemButton role={undefined} onClick={()=>{}} sx={{paddingRight: 0, display: 'flex',}} disableRipple justifyContent={'center'}>
                                        {/* <ListItemIcon>
                                            <Checkbox
                                                edge="start"
                                                checked={1}
                                                tabIndex={-1}
                                                disableRipple
                                            />q
                                        </ListItemIcon> */}
                                        {/* <Stack
                                            direction="row"
                                            justifyContent={'center'}
                                            // divider={<Divider orientation="vertical" flexItem />}
                                            spacing={2}
                                        > */}
                                            <ListItemText primary={`# ${index+1}`} sx={{width: 80, maxWidth: 80}} />
                                            <ListItemText primary={`${Produs.Nume}`} sx={{width: 700, maxWidth: 700}} />
                                            <ListItemText primary={`${Produs.Cantitate}`} sx={{width: 100, maxWidth: 100}} />
                                            <ListItemText primary={`x`}  sx={{width:50, maxWidth:50}} />
                                            <ListItemText primary={`${Produs.Pret} RON `} sx={{width: 120, maxWidth: 120}} />
                                            <ListItemText primary={`${Produs.Cantitate*Produs.Pret} RON`} sx={{width: 120, maxWidth: 120}} />
                                        {/* </Stack> */}
                                        
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}
                    </List>
                    <ListItemText primary={`Total comanda`} secondary={comanda.TotalPret + " RON"} justifySelf={'center'}/>
                </AccordionDetails>
            </Accordion>
    )
}