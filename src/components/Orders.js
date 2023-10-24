import React, { useState } from 'react';
import axios from "axios";
import { Box, Button, Checkbox, Divider,  IconButton,  List,  ListItem,  ListItemButton,  ListItemIcon,  ListItemText,  Stack, TextField } from '@mui/material';
import { Link, NavLink, useNavigate  } from 'react-router-dom'
import {Delete} from '@mui/icons-material';

export default function Orders() {
    return(
        <Stack
            direction="column"
            justifyContent={'center'}
            spacing={2}
            sx={{ height: '100vh', marginTop: 'auto', paddingTop: 'auto'}}
        >
            <Stack
                direction="row"
                spacing={2}
                justifyContent={'center'}
            >
                <TextField id="outlined-basic" label="Adresa" variant="outlined" />
                <TextField id="outlined-basic" label="Numar Comanda" variant="outlined" />
            </Stack>
            <Stack
                direction="row"
                spacing={2}
                justifyContent={'center'}
            >
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    {[0, 1, 2, 3].map((value) => {
                        const labelId = `checkbox-list-label-${value}`;

                        return (
                        <ListItem
                            key={value}
                            secondaryAction={
                            <IconButton edge="end" aria-label="comments">
                                <Delete/>
                            </IconButton>
                            }
                            disablePadding
                        >
                            <ListItemButton role={undefined} onClick={()=>{}} dense>
                                <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        checked={1}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{ 'aria-labelledby': labelId }}
                                    />
                                </ListItemIcon>
                                <ListItemText id={labelId} primary={`Produs ${value + 1}`} />
                                <Divider/>
                                <ListItemText id={labelId} primary={`Cantitate ${value + 1}`} />
                            </ListItemButton>
                        </ListItem>
                        );
                    })}
                    </List>
            </Stack>
        </Stack>
    )
}