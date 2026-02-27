// @mui
import Grid from '@mui/material/Grid';

// @project
import AnalyticsOverviewCard from './AnalyticsOverviewCard';
import AnalyticsOverviewChart from './AnalyticsOverviewChart';
import AnalyticsTopRef from './AnalyticsTopRef';

import PageAnimateWrapper from '@/components/PageAnimateWrapper';

/***************************  ANALYTICS - OVERVIEW  ***************************/

export default function AnalyticsOverview() {
  return (
    <PageAnimateWrapper>
      <Grid container spacing={{ xs: 2, md: 3 }}>
        <Grid size={12}>
          <AnalyticsOverviewCard />
        </Grid>
        <Grid size={12}>
          <AnalyticsOverviewChart />
        </Grid>
        <Grid size={12}>
          <AnalyticsTopRef />
        </Grid>
      </Grid>
    </PageAnimateWrapper>
  );
}
