import * as React from 'react';
import { Box, Button, Container, Stack, Typography } from '@mui/material';

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
              { ctaFirst ? <Button variant="contained" href={ ctaFirst[1] }>{ ctaFirst[0] }</Button> : null } 
              { ctaSecond ? <Button variant="outlined" href={ ctaSecond[1] }>{ ctaSecond[0] }</Button> : null }
            </Stack>
          </Container>
        </Box>
  );
}