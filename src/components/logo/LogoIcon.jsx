// @mui
import Box from '@mui/material/Box';

/***************************  LOGO - ICON  ***************************/

export default function LogoIcon() {
  return (
    <Box sx={{ width: 56, height: 42, cursor: 'pointer', flexShrink: 0 }}>
      <img src="/images/logo.png" alt="MarketingTool" width="56" height="42" style={{ objectFit: 'contain', display: 'block' }} />
    </Box>
  );
}
