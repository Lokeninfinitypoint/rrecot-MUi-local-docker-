// @mui
import Box from '@mui/material/Box';

/***************************  LOGO - MAIN  ***************************/

export default function LogoMain() {
  return (
    <Box sx={{ width: 140, height: 48, flexShrink: 0 }}>
      <img src="/images/logo.png" alt="MarketingTool" width="140" height="48" style={{ objectFit: 'contain', display: 'block' }} />
    </Box>
  );
}
