import React, { useState } from 'react';
import axios from "axios";
import { Box, Button, Divider,  Stack, TextField } from '@mui/material';
import { Link, NavLink, useNavigate  } from 'react-router-dom'

export default function Login() {
    return(
        <Stack
            direction="column"
            justifyContent={'center'}
            sx={{ height: '100vh', marginTop: 'auto', paddingTop: 'auto'}}
        >
            <Stack
                direction="row"
                justifyContent={'center'}
            >
                <Stack
                    direction="column"
                    spacing={2}
                >
                    {/* <Item>Item 1</Item>
                    <Item>Item 2</Item>
                    <Item>Item 3</Item> */}
                    <TextField id="outlined-basic" label="Nume" variant="outlined" />
                    <TextField id="outlined-basic" label="Prenume" variant="outlined" />
                    <TextField id="outlined-basic" label="Parola" variant="outlined" />
                    <Button variant="contained" LinkComponent={Link} to={'/orders'} onClick={()=>{}}>Login</Button>
                </Stack>
            </Stack>
        </Stack>
    )
}