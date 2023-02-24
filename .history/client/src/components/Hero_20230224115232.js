import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

export default function Hero({ title, summary, ctaFirst, ctaSecond}) {
  return (
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              { title }
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              { summary }
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained" href={ ctaFirst[1] }>{ ctaFirst[0] }</Button>
              { ctaSecond ? <Button variant="outlined" href={ ctaSecond[1] }>{ ctaSecond[0] }</Button> : null }
            </Stack>
          </Container>
        </Box>
  );
}