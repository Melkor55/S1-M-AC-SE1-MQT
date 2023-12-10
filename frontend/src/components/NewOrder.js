import React, { useEffect, useRef, useState } from 'react';
import axios from "axios";
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Checkbox, Divider,  IconButton,  List,  ListItem,  ListItemButton,  ListItemIcon,  ListItemText,  Stack, TextField, Typography } from '@mui/material';
import { Link, NavLink, useNavigate  } from 'react-router-dom'
import {Delete, ExitToApp, ExpandMore, ShoppingCart} from '@mui/icons-material';
import Order from './Order';

let Produse = [
    {
        "Nume": "Banane",
        "CantitateProdus": "100g",
        "Pret": 7
    },
    {
        "Nume": "Mere",
        "CantitateProdus": "150g",
        "Pret": 5
    },
    {
        "Nume": "Portocale",
        "CantitateProdus": "200g",
        "Pret": 6
    },
    {
        "Nume": "Pere",
        "CantitateProdus": "120g",
        "Pret": 4
    },
    {
        "Nume": "Struguri",
        "CantitateProdus": "250g",
        "Pret": 8
    },
    {
        "Nume": "Kiwi",
        "CantitateProdus": "80g",
        "Pret": 3
    },
    {
        "Nume": "Ananas",
        "CantitateProdus": "300g",
        "Pret": 10
    },
    {
        "Nume": "Mango",
        "CantitateProdus": "180g",
        "Pret": 9
    },
    {
        "Nume": "Papaya",
        "CantitateProdus": "220g",
        "Pret": 11
    },
    {
        "Nume": "Avocado",
        "CantitateProdus": "160g",
        "Pret": 12
    },
    {
        "Nume": "Caise",
        "CantitateProdus": "140g",
        "Pret": 7
    },
    {
        "Nume": "Prune",
        "CantitateProdus": "130g",
        "Pret": 6
    },
    {
        "Nume": "Piersici",
        "CantitateProdus": "170g",
        "Pret": 8
    },
    {
        "Nume": "Nectarine",
        "CantitateProdus": "150g",
        "Pret": 7
    },
    {
        "Nume": "Cirese",
        "CantitateProdus": "100g",
        "Pret": 5
    },
    {
        "Nume": "Visine",
        "CantitateProdus": "90g",
        "Pret": 4
    },
    {
        "Nume": "Capsuni",
        "CantitateProdus": "110g",
        "Pret": 6
    },
    {
        "Nume": "Zmeura",
        "CantitateProdus": "80g",
        "Pret": 7
    },
    {
        "Nume": "Mure",
        "CantitateProdus": "70g",
        "Pret": 8
    },
    {
        "Nume": "Afini",
        "CantitateProdus": "60g",
        "Pret": 9
    },
    {
        "Nume": "Coacaze",
        "CantitateProdus": "50g",
        "Pret": 10
    },
    {
        "Nume": "Rodii",
        "CantitateProdus": "200g",
        "Pret": 12
    },
    {
        "Nume": "Lamai",
        "CantitateProdus": "100g",
        "Pret": 4
    },
    {
        "Nume": "Lime",
        "CantitateProdus": "80g",
        "Pret": 5
    },
    {
        "Nume": "Grepfrut",
        "CantitateProdus": "150g",
        "Pret": 6
    },
    {
        "Nume": "Mandarine",
        "CantitateProdus": "120g",
        "Pret": 5
    },
    {
        "Nume": "Clementine",
        "CantitateProdus": "100g",
        "Pret": 4
    },
    {
        "Nume": "Kumquat",
        "CantitateProdus": "40g",
        "Pret": 3
    },
    {
        "Nume": "Fistic",
        "CantitateProdus": "50g",
        "Pret": 15
    },
    {
        "Nume": "Alune",
        "CantitateProdus": "60g",
        "Pret": 10
    },
    {
        "Nume": "Nuci",
        "CantitateProdus": "70g",
        "Pret": 12
    },
    {
        "Nume": "Caju",
        "CantitateProdus": "40g",
        "Pret": 14
    },
    {
        "Nume": "Migdale",
        "CantitateProdus": "50g",
        "Pret": 13
    },
    {
        "Nume": "Arahide",
        "CantitateProdus": "80g",
        "Pret": 8
    },
    {
        "Nume": "Seminte de floarea soarelui",
        "CantitateProdus": "100g",
        "Pret": 6
    },
    {
        "Nume": "Seminte de dovleac",
        "CantitateProdus": "90g",
        "Pret": 7
    },
    {
        "Nume": "Seminte de chia",
        "CantitateProdus": "30g",
        "Pret": 9
    },
    {
        "Nume": "Seminte de in",
        "CantitateProdus": "40g",
        "Pret": 8
    },
    {
        "Nume": "Seminte de susan",
        "CantitateProdus": "50g",
        "Pret": 7
    },
    {
        "Nume": "Seminte de mac",
        "CantitateProdus": "20g",
        "Pret": 6
    },
    {
        "Nume": "Curmale",
        "CantitateProdus": "100g",
        "Pret": 10
    },
    {
        "Nume": "Smochine",
        "CantitateProdus": "120g",
        "Pret": 12
    },
    {
        "Nume": "Stafide",
        "CantitateProdus": "80g",
        "Pret": 8
    },
    {
        "Nume": "Merisoare",
        "CantitateProdus": "60g",
        "Pret": 9
    },
    {
        "Nume": "Goji",
        "CantitateProdus": "40g",
        "Pret": 11
    },
    {
        "Nume": "Caise uscate",
        "CantitateProdus": "70g",
        "Pret": 7
    },
    {
        "Nume": "Prune uscate",
        "CantitateProdus": "90g",
        "Pret": 6
    },
    {
        "Nume": "Piersici uscate",
        "CantitateProdus": "100g",
        "Pret": 8
    },
    {
        "Nume": "Ananas uscat",
        "CantitateProdus": "110g",
        "Pret": 10
    },
    {
        "Nume": "Mango uscat",
        "CantitateProdus": "130g",
        "Pret": 12
    }
]

var TemplateOrder = {
    Numar: '2325443534',
    Data: new Date().toJSON(),
    Adresa: 'Cluj',
    TotalPret: 700,
    Produse: []
}
const initialOrder = {
    Numar: Array.from({length: 10}, () => Math.floor(Math.random() * 10)).join(''),
    Data: new Date().toLocaleString(),
    Adresa: '',
    TotalPret: 0,
    Produse: null
}

export default function NewOrder(props) {

    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [date, setDate] = useState(new Date().toLocaleString());
    const [orderNumber, setOrderNumber] = useState(Array.from({length: 10}, () => Math.floor(Math.random() * 10)).join(''));  // generates 10 digit number
    const [adresa, setAdresa] = useState('');
    const [orderReady, setOrderReady] = useState(false);
    const [order, setOrder] = useState(initialOrder)
    var Order;
    
    const setupOrder = (Produs) => {
        console.log('adauga');
        Order = order;
        // Order = {
        //     // Numar: orderNumber,
        //     Data: date,
        //     // Adresa: 'Cluj',
        //     TotalPret: totalPrice + Produs.Pret,
        //     Produse: cartItems.concat({...Produs, Cantitate: 1})
        // }
        Order.TotalPret = totalPrice + Produs.Pret;
        Order.Produse = cartItems.concat({...Produs, Cantitate: 1});
        setTotalPrice(Order.TotalPret);
        setCartItems(Order.Produse);
        setOrder(Order);
        // props.onOrderChange(Order);
    }

    useEffect(() => {
        console.log('reset - ',props.resetOrder);
        if(props.resetOrder===true)
        {
            setTotalPrice(0);
            setCartItems([]);
            setOrder(initialOrder);
            setAdresa('');
            console.log(order);

            props.setResetButtonPressed(false);
        }
    }, [props.resetOrder] )
    
    useEffect(() => {
        // date = new Date().toLocaleString();
        if(order.Adresa !== '' && order.TotalPret !== 0 && order.Produse !== null)
        {
            console.log(order);
            props.onOrderChange(order);
        }
    }, [order.Adresa, order.TotalPret, order.Produse] )

    useEffect(() => {
        // console.log(adresa);
    }, [adresa] )
    
    return (
        <Box
            sx={{ height: 550 }}
        >
            <Stack
                direction="row"
                spacing={2}
                justifyContent={'center'}
                sx={{marginY: "10px"}}
            >
                <TextField 
                    label={'Adresa:'} 
                    variant="outlined" 
                    value={adresa}
                    onChange={(e) => {setOrder(prevOrder => ({...prevOrder, Adresa: e.target.value})) ; setAdresa(e.target.value)}}
                    fullWidth
                />
                <TextField
                    label={'Comanda:'}
                    variant="outlined"
                    value={order.Numar}
                    fullWidth
                />
            </Stack>
            Produse:
            <List sx={{ minWidth: '600px', maxWidth: '1300px', height: "400px", overflow: 'auto',marginY: 2, paddingBottom: 0, bgcolor: 'background.paper', border: 2, borderColor: 'gray' }}>
                {Produse.map((Produs,index) => {
                    return ([
                        <ListItem
                            key={index}
                            secondaryAction={
                                <IconButton title='Add to cart' edge="end" onClick={() => {setupOrder(Produs)}}>
                                    <ShoppingCart/>
                                </IconButton>
                            }
                            justifyContent={'center'}
                            disablePadding
                        >
                            <ListItemButton role={undefined} onClick={()=>{}} sx={{paddingRight: 0, display: 'flex',}} disableRipple justifyContent={'center'}>
                                    <ListItemText primary={`${Produs.Nume}`} sx={{width: 400, maxWidth: 1000}} />
                                    <ListItemText primary={`${Produs.CantitateProdus}`} sx={{width: 100, maxWidth: 100}} />
                                    <ListItemText primary={`${Produs.Pret} RON `} sx={{width: 120, maxWidth: 120}} />
                            </ListItemButton>
                        </ListItem>
                    ]);
                })}
            </List>
            {/* <Divider/>
            <br/>
            Sumar Comanda:
            { cartItems.length>0 &&
                <Order comanda={{...TemplateOrder, Produse: cartItems}} index={123}/>
            } */}
        </Box>
    )
}
