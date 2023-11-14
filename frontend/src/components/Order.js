import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Checkbox, Divider,  IconButton,  List,  ListItem,  ListItemButton,  ListItemIcon,  ListItemText,  Stack, TextField, Typography } from '@mui/material';
import { Link, NavLink, useNavigate  } from 'react-router-dom'
import {Delete, ExitToApp, ExpandMore} from '@mui/icons-material';

export default function Order({comanda, index}) {
    return (
            <Accordion
                sx={{border: 1, borderColor: 'primary.main'}}
            >
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                >
                    {/* <Typography>Comanda 1 - {data ? data : 'invalid date'}</Typography> */}
                    <Typography>Comanda din data : {comanda.Data.toLocaleString()}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Stack
                        direction="row"
                        spacing={2}
                        justifyContent={'center'}
                    >
                        <TextField id="outlined-basic" label={'Adresa:' + comanda.Adresa} variant="outlined" disabled/>
                        <TextField id="outlined-basic" label={'Comanda:' + comanda.Numar} variant="outlined" disabled/>
                    </Stack>
                    <List sx={{ minWidth: '1200px', maxWidth: '2000px', marginY: 2, paddingBottom: 0, bgcolor: 'background.paper', border: 2, borderColor: 'gray' }}>
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
                            return ([
                                <Divider variant="middle"/>,
                                <ListItem
                                    key={index}
                                    secondaryAction={
                                        <IconButton edge="end">
                                            <ExitToApp/>
                                        </IconButton>
                                    }
                                    justifyContent={'center'}
                                    // sx={{ borderTop: 1, borderColor: 'gray' }}
                                    disablePadding
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
                            ]);
                        })}
                    </List>
                    <ListItemText sx={{paddingRight: 1}}>
                        {/* primary={`Total comanda`} 
                        secondary={comanda.TotalPret + " RON"} 
                        // justifySelf={'center'}
                        // sx={{position: 'relative', left: '90%'}}     */}
                        <Typography variant="subheading" sx={{display:'flex', justifyContent:'flex-end'}}>
                            {`Total comanda`}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" sx={{display:'flex', justifyContent:'flex-end'}}>
                            {comanda.TotalPret + " RON"}
                        </Typography>
                    </ListItemText> 
                </AccordionDetails>
            </Accordion>
    )
}