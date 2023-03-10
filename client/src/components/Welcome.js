
import { useContext } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { UserContext } from "../context/user";
import { Avatar, Box, CssBaseline, Grid, Paper } from '@mui/material';
import ConstructionIcon from '@mui/icons-material/Construction';
import Hero from './Hero';

function Welcome() {
    // Variables
    const { user } = useContext(UserContext);
    const theme = createTheme();
    const ctaFirst = ['Login','/login'];
    const ctaSecond = ['Sign Up','/signup'];

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                    backgroundImage: 'url(https://source.unsplash.com/random/?home)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                            <ConstructionIcon />
                        </Avatar>
                        <Hero title="jindah" summary='...where the people are screaming: "these are the jobs I need done at home!"' ctaFirst={ user ? null : ctaFirst } ctaSecond={user ? null : ctaSecond}/> 
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    )

}

export default Welcome;