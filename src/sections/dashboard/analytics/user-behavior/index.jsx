// @mui
import Grid from '@mui/material/Grid';

// @project;
import AnalyticsBehaviorCard from './AnalyticsBehaviorCard';
import AnalyticsBehaviorChart from './AnalyticsBehaviorChart';
import AnalyticsBehaviorTable from './analytics-behavior-table';
import AnalyticsBehaviorTrafficDevice from './AnalyticsBehaviorTrafficDevice';

import PageAnimateWrapper from '@/components/PageAnimateWrapper';

/***************************  ANALYTICS - USER BEHAVIOR  ***************************/

export default function AnalyticsUserBehavior() {
  return (
    <PageAnimateWrapper>
      <Grid container spacing={{ xs: 2, md: 3 }}>
        <Grid size={12}>
          <AnalyticsBehaviorCard />
        </Grid>
        <Grid size={12}>
          <AnalyticsBehaviorChart />
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <AnalyticsBehaviorTable />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <AnalyticsBehaviorTrafficDevice />
        </Grid>
      </Grid>
    </PageAnimateWrapper>
  );
}
