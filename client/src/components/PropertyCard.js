import { createElement } from 'react';
import { Card, Box, Typography, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import cartouche from '../assets/cartouche.png';

function PropertyCard({ icon, title, subtitle_one, subtitle_two, to, children }){
    return (
        <Card
            sx={{
                minHeight: 52,
                display: 'flex',
                flexDirection: 'column',
                flex: '1',
                '& a': {
                    textDecoration: 'none',
                    color: 'inherit',
                },
            }}
         >
        <Link to={to}>
            <Box
                sx={{
                    overflow: 'inherit',
                    padding: '16px',
                    background: theme =>
                        `url(${
                            cartouche
                        }) no-repeat`,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    '& .icon': {
                        color: theme =>
                            theme.palette.mode === 'dark'
                                ? 'inherit'
                                : '#dc2440',
                    },
                }}
            >
                <Box width="3em" className="icon">
                    {createElement(icon, { fontSize: 'large' })}
                </Box>
                <Box textAlign="right">
                    <Typography color="textSecondary">{subtitle_one}</Typography>
                    <Typography color="textSecondary">{subtitle_two}</Typography>
                    <Typography variant="h5" component="h2">
                        {title || ' '}
                    </Typography>
                </Box>
            </Box>
        </Link>
        {children && <Divider />}
        {children}
    </Card>
    )
};

export default PropertyCard;
