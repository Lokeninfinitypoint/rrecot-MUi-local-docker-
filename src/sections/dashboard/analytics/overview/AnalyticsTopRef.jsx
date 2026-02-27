import PropTypes from 'prop-types';
import { useState } from 'react';

// @mui
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// @third-party
import { motion } from 'motion/react';

// @project
import ProgressCard from '@/components/cards/ProgressCard';
import { varSlide } from '@/components/third-party/motion/animate/dialog';
import { TabsType } from '@/enum';
import { getRadiusStyles } from '@/utils/getRadiusStyles';

/***************************  TABS - DATA  ***************************/

const sevenDaysData = [
  { title: 'Google Search', value: '$4,280', progress: { value: 45 } },
  { title: 'Facebook Ads', value: '$3,150', progress: { value: 56 } },
  { title: 'Instagram Ads', value: '$2,890', progress: { value: 74 } },
  { title: 'Google Display', value: '$1,420', progress: { value: 25 } },
  { title: 'YouTube Ads', value: '$680', progress: { value: 45 } },
  { title: 'LinkedIn Ads', value: '$340', progress: { value: 95 } }
];

const monthData = [
  { title: 'Google Search', value: '$17,120', progress: { value: 75 } },
  { title: 'Facebook Ads', value: '$12,600', progress: { value: 45 } },
  { title: 'Instagram Ads', value: '$11,560', progress: { value: 10 } },
  { title: 'Google Display', value: '$5,680', progress: { value: 89 } },
  { title: 'YouTube Ads', value: '$2,720', progress: { value: 95 } },
  { title: 'LinkedIn Ads', value: '$1,360', progress: { value: 74 } }
];

const yearData = [
  { title: 'Google Search', value: '$2,05,440', progress: { value: 52 } },
  { title: 'Facebook Ads', value: '$1,51,200', progress: { value: 45 } },
  { title: 'Instagram Ads', value: '$1,38,720', progress: { value: 85 } },
  { title: 'Google Display', value: '$68,160', progress: { value: 42 } },
  { title: 'YouTube Ads', value: '$32,640', progress: { value: 55 } },
  { title: 'LinkedIn Ads', value: '$16,320', progress: { value: 45 } }
];

const routesData = [
  { title: 'Brand Awareness', value: '16,890', progress: { value: 15 } },
  { title: 'Lead Generation', value: '4,909', progress: { value: 78 } },
  { title: 'App Installs', value: '2,550', progress: { value: 25 } },
  { title: 'Retargeting', value: '1,140', progress: { value: 47 } },
  { title: 'Sales / ROAS', value: '8,675', progress: { value: 20 } },
  { title: 'Traffic', value: '4,900', progress: { value: 74 } }
];

const pageData = [
  { title: 'Brand Awareness', value: '67,560', progress: { value: 45 } },
  { title: 'Lead Generation', value: '19,636', progress: { value: 25 } },
  { title: 'App Installs', value: '10,220', progress: { value: 74 } },
  { title: 'Retargeting', value: '4,560', progress: { value: 44 } },
  { title: 'Sales / ROAS', value: '34,700', progress: { value: 41 } },
  { title: 'Traffic', value: '19,600', progress: { value: 95 } }
];

const affiliateData = [
  { title: 'Google Search', value: '42,340', progress: { value: 44 } },
  { title: 'Facebook Feed', value: '28,190', progress: { value: 90 } },
  { title: 'Instagram Reels', value: '15,720', progress: { value: 20 } },
  { title: 'Google Shopping', value: '8,640', progress: { value: 85 } },
  { title: 'YouTube Pre-roll', value: '5,275', progress: { value: 75 } },
  { title: 'Facebook Stories', value: '3,900', progress: { value: 78 } }
];

const campaignData = [
  { title: 'Summer Sale 2026', value: '$18,450', progress: { value: 25 } },
  { title: 'App Launch Q1', value: '$12,380', progress: { value: 74 } },
  { title: 'Black Friday', value: '$9,220', progress: { value: 65 } },
  { title: 'Product Launch', value: '$7,560', progress: { value: 45 } },
  { title: 'Retarget - Cart', value: '$5,700', progress: { value: 85 } },
  { title: 'Brand Awareness', value: '$3,600', progress: { value: 47 } }
];

const marketingData = [
  { title: 'Summer Sale 2026', value: '$2,21,400', progress: { value: 41 } },
  { title: 'App Launch Q1', value: '$1,48,560', progress: { value: 35 } },
  { title: 'Black Friday', value: '$1,10,640', progress: { value: 55 } },
  { title: 'Product Launch', value: '$90,720', progress: { value: 75 } },
  { title: 'Retarget - Cart', value: '$68,400', progress: { value: 100 } },
  { title: 'Brand Awareness', value: '$43,200', progress: { value: 20 } }
];

/***************************  TABS - A11Y  ***************************/

function a11yProps(value) {
  return { value: value, id: `simple-tab-${value}`, 'aria-controls': `simple-tabpanel-${value}` };
}

/***************************  TABS - PANEL  ***************************/

function TabPanel({ children, value, index, ...other }) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <Box sx={{ pt: 1.5 }}>{children}</Box>}
    </div>
  );
}

/***************************  TABS - CONTENT  ***************************/

function TabContent({ data }) {
  return (
    <motion.div variants={varSlide('slideInDown', { distance: 30 })} initial="initial" animate="animate">
      <Stack sx={{ gap: 1.25 }}>
        {data.map((item, index) => (
          <ProgressCard key={index} {...item} />
        ))}
      </Stack>
    </motion.div>
  );
}

/***************************  CARDS - BORDER WITH RADIUS  ***************************/

export function applyBorderWithRadius(radius, theme) {
  return {
    overflow: 'hidden',
    '--Grid-borderWidth': '1px',
    borderTop: 'var(--Grid-borderWidth) solid',
    borderLeft: 'var(--Grid-borderWidth) solid',
    borderColor: 'divider',
    '& > div': {
      overflow: 'hidden',
      borderRight: 'var(--Grid-borderWidth) solid',
      borderBottom: 'var(--Grid-borderWidth) solid',
      borderColor: 'divider',
      [theme.breakpoints.only('xs')]: {
        '&:first-of-type': getRadiusStyles(radius, 'topLeft', 'topRight'),
        '&:last-of-type': getRadiusStyles(radius, 'bottomLeft', 'bottomRight')
      },
      [theme.breakpoints.between('sm', 'md')]: {
        '&:nth-of-type(1)': getRadiusStyles(radius, 'topLeft'),
        '&:nth-of-type(2)': getRadiusStyles(radius, 'topRight'),
        '&:nth-of-type(3)': getRadiusStyles(radius, 'bottomLeft', 'bottomRight')
      },
      [theme.breakpoints.up('md')]: {
        '&:first-of-type': getRadiusStyles(radius, 'topLeft', 'bottomLeft'),
        '&:last-of-type': getRadiusStyles(radius, 'topRight', 'bottomRight')
      }
    }
  };
}

/***************************  CARDS - TOP REFERRERS  ***************************/
export default function TopReferrers() {
  const theme = useTheme();
  const [httpReferrers, setHttpReferrers] = useState('days');
  const [pages, setPages] = useState('routes');
  const [sources, setSources] = useState('affiliate');

  // Separate handleChange functions
  const handleHTTPReferrers = (_event, newValue) => {
    setHttpReferrers(newValue);
  };

  const handlePages = (_event, newValue) => {
    setPages(newValue);
  };

  const handleSources = (_event, newValue) => {
    setSources(newValue);
  };

  return (
    <>
      <Grid container sx={{ borderRadius: 4, boxShadow: theme.vars.customShadows.section, ...applyBorderWithRadius(16, theme) }}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Stack sx={{ gap: 2.5, p: 3 }}>
            <Typography variant="subtitle1">Platform Spend</Typography>
            <Box>
              <Tabs
                variant="fullWidth"
                value={httpReferrers}
                onChange={handleHTTPReferrers}
                aria-label="basic tabs example"
                type={TabsType.SEGMENTED}
              >
                <Tab label="Last 7 days" {...a11yProps('days')} />
                <Tab label="Last Month" {...a11yProps('month')} />
                <Tab label="Last Year" {...a11yProps('year')} />
              </Tabs>
              <TabPanel value={httpReferrers} index="days">
                <TabContent data={sevenDaysData} />
              </TabPanel>
              <TabPanel value={httpReferrers} index="month">
                <TabContent data={monthData} />
              </TabPanel>
              <TabPanel value={httpReferrers} index="year">
                <TabContent data={yearData} />
              </TabPanel>
            </Box>
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Stack sx={{ gap: 2.5, p: 3 }}>
            <Typography variant="subtitle1">Campaign Objectives</Typography>
            <Box>
              <Tabs variant="fullWidth" value={pages} onChange={handlePages} aria-label="basic tabs example" type={TabsType.SEGMENTED}>
                <Tab label="By Goal" {...a11yProps('routes')} />
                <Tab label="By Budget" {...a11yProps('pages')} />
              </Tabs>
              <TabPanel value={pages} index="routes">
                <TabContent data={routesData} />
              </TabPanel>
              <TabPanel value={pages} index="pages">
                <TabContent data={pageData} />
              </TabPanel>
            </Box>
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Stack sx={{ gap: 2.5, p: 3 }}>
            <Typography variant="subtitle1">Top Placements</Typography>
            <Box>
              <Tabs variant="fullWidth" value={sources} onChange={handleSources} aria-label="basic tabs example" type={TabsType.SEGMENTED}>
                <Tab label="Placement" {...a11yProps('affiliate')} />
                <Tab label="Campaign" {...a11yProps('campaign')} />
                <Tab label="Spend" {...a11yProps('marketing')} />
              </Tabs>
              <TabPanel value={sources} index="affiliate">
                <TabContent data={affiliateData} />
              </TabPanel>
              <TabPanel value={sources} index="campaign">
                <TabContent data={campaignData} />
              </TabPanel>
              <TabPanel value={sources} index="marketing">
                <TabContent data={marketingData} />
              </TabPanel>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}

TabPanel.propTypes = {
  children: PropTypes.any,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  index: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  other: PropTypes.any
};

TabContent.propTypes = { data: PropTypes.array };
