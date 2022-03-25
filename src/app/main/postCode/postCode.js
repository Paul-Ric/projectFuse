import React, { useRef } from 'react';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import SignpostOutlinedIcon from '@mui/icons-material/SignpostOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm} from 'react-hook-form';
import axios from 'axios';
import NumberFormat from 'react-number-format';


function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" >
                Paulo Ricardo
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();


export default function Cep() {


    const { register, handleSubmit, setValue, control } = useForm();
    const onSubmit = (e) => {
        let res = JSON.parse(JSON.stringify(e))
        console.log(res)
    }
    const regExCep = "/\d{2}\.\d{3}\-\d{3}/"




    const checkCEP = (e) => {
        const cep = e.target.value

        if (cep?.length !== 8) {
            return;
        }
        axios.get(`https://viacep.com.br/ws/${cep}/json/`)
            .then(data => {
                console.log(data)
                setValue('address', data.data.logradouro)
                setValue('neighborhood', data.data.bairro)
                setValue('city', data.data.localidade)
                setValue('uf', data.data.uf)
                setValue('number')

            }).catch((e) => {
                console.error(e)
            })



    }

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                        <SignpostOutlinedIcon />
                    </Avatar>
                    {/* <Typography component="h1" variant="h5">
                        Código de Endereçamento Postal
                </Typography>*/}
                    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>

                        {/*<NumberFormat
                            label="Cep"
                            onChange={e=>setPostCode(e.target.value)}
                            margin='normal'
                            fullWidth
                            required
                            name='cep'
                            id='cep'
                            value={'cep'}
                            customInput={TextField}
                            format="#####-###"
                            {...register('cep')}
            onBlur={checkCEP} /> */}

                        <TextField
                            margin="normal"

                            fullWidth
                            name="Cep"
                            label="Cep"
                            type="text"
                            id="cep"
                            {...register("cep")}

                            disabled={false}
                            onBlur={checkCEP}
                            inputProps={{
                                maxLength: 8,
                                inputMode: 'numeric',

                            }}
                        />

                        <TextField
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                            name="estado"
                            label="Estado"
                            type="text"
                            id="estado"
                            {...register("uf")}
                            disabled={true}
                            inputProps={{ maxLength: 8, pattern: regExCep }}
                        />
                        <TextField
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                            name="city"
                            label="Cidade"
                            type="text"
                            id="estado"
                            {...register("city")}
                            disabled={true}
                        />
                        <TextField
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                            name="bairro"
                            label="Bairro"
                            type="text"
                            id="estado"
                            {...register("neighborhood")}
                            disabled={true}
                        />
                        <TextField
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                            name="rua"
                            label="Rua"
                            type="text"
                            id="rua"
                            {...register("address")}
                            disabled={true}
                        />

                        <TextField
                            label="Numero"
                            name='numero'
                            type="number"
                            required
                            {...register('number')}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"

                            sx={{ mt: 3, mb: 2 }}
                        >
                            Enviar
                        </Button>

                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}