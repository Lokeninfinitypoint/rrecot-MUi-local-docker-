import { useState } from 'react';

// @mui
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Chip from '@mui/material/Chip';
import LinearProgress from '@mui/material/LinearProgress';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Switch from '@mui/material/Switch';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Alert from '@mui/material/Alert';

// @assets
import {
  IconFileSpreadsheet,
  IconDownload,
  IconMail,
  IconCalendar,
  IconClock,
  IconChartBar,
  IconPlayerPlay,
  IconTrash,
  IconEdit,
  IconEye,
  IconArrowUpRight,
  IconArrowDownRight,
  IconPlus,
  IconBrandGoogle,
  IconBrandFacebook,
  IconReportAnalytics
} from '@tabler/icons-react';

const PRIMARY_COLOR = '#805AF5';

// Metric options for report builder
const metricOptions = [
  { id: 'spend', label: 'Ad Spend', category: 'Cost' },
  { id: 'impressions', label: 'Impressions', category: 'Reach' },
  { id: 'clicks', label: 'Clicks', category: 'Engagement' },
  { id: 'ctr', label: 'CTR', category: 'Engagement' },
  { id: 'cpc', label: 'CPC', category: 'Cost' },
  { id: 'conversions', label: 'Conversions', category: 'Performance' },
  { id: 'cpa', label: 'Cost per Acquisition', category: 'Cost' },
  { id: 'revenue', label: 'Revenue', category: 'Performance' },
  { id: 'roas', label: 'ROAS', category: 'Performance' },
  { id: 'reach', label: 'Reach', category: 'Reach' },
  { id: 'frequency', label: 'Frequency', category: 'Reach' },
  { id: 'video_views', label: 'Video Views', category: 'Engagement' }
];

// Scheduled reports data
const scheduledReports = [
  {
    id: 1,
    name: 'Weekly Performance Summary',
    frequency: 'Weekly',
    nextRun: 'Mon, 9:00 AM',
    recipients: 'team@company.com',
    platforms: ['Google', 'Meta'],
    enabled: true
  },
  {
    id: 2,
    name: 'Monthly Client Report',
    frequency: 'Monthly',
    nextRun: '1st, 8:00 AM',
    recipients: 'client@agency.com',
    platforms: ['Google', 'Meta'],
    enabled: true
  },
  {
    id: 3,
    name: 'Daily Spend Alert',
    frequency: 'Daily',
    nextRun: '6:00 PM',
    recipients: 'manager@company.com',
    platforms: ['Google'],
    enabled: false
  }
];

// Report history data
const reportHistory = [
  {
    id: 1,
    name: 'Weekly Performance Summary',
    generatedAt: 'Feb 24, 2026 - 9:00 AM',
    period: 'Feb 17 - Feb 23, 2026',
    status: 'delivered',
    size: '2.4 MB'
  },
  {
    id: 2,
    name: 'Monthly Client Report',
    generatedAt: 'Feb 1, 2026 - 8:00 AM',
    period: 'Jan 1 - Jan 31, 2026',
    status: 'delivered',
    size: '5.8 MB'
  },
  {
    id: 3,
    name: 'Ad Hoc Campaign Analysis',
    generatedAt: 'Feb 20, 2026 - 3:45 PM',
    period: 'Feb 1 - Feb 20, 2026',
    status: 'downloaded',
    size: '1.2 MB'
  },
  {
    id: 4,
    name: 'Weekly Performance Summary',
    generatedAt: 'Feb 17, 2026 - 9:00 AM',
    period: 'Feb 10 - Feb 16, 2026',
    status: 'delivered',
    size: '2.1 MB'
  }
];

/***************************  KPI CARD  ***************************/

function KpiCard({ title, value, subtitle, icon: Icon }) {
  return (
    <Card>
      <CardContent>
        <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              {value}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="caption" display="block" color="text.secondary" sx={{ mt: 0.5 }}>
                {subtitle}
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: `${PRIMARY_COLOR}18`,
              color: PRIMARY_COLOR
            }}
          >
            <Icon size={24} />
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

/***************************  REPORT BUILDER TAB  ***************************/

function ReportBuilder() {
  const [reportName, setReportName] = useState('');
  const [dateRange, setDateRange] = useState('last_7_days');
  const [platforms, setPlatforms] = useState(['google', 'meta']);
  const [selectedMetrics, setSelectedMetrics] = useState(['spend', 'impressions', 'clicks', 'conversions', 'roas']);
  const [format, setFormat] = useState('pdf');

  const handleMetricToggle = (metricId) => {
    setSelectedMetrics((prev) => (prev.includes(metricId) ? prev.filter((id) => id !== metricId) : [...prev, metricId]));
  };

  const handlePlatformToggle = (platform) => {
    setPlatforms((prev) => (prev.includes(platform) ? prev.filter((p) => p !== platform) : [...prev, platform]));
  };

  return (
    <Grid container spacing={3}>
      {/* Report Settings */}
      <Grid size={{ xs: 12, md: 8 }}>
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Report Settings
            </Typography>

            <Stack spacing={3}>
              <TextField
                label="Report Name"
                placeholder="e.g., Weekly Performance Summary"
                value={reportName}
                onChange={(e) => setReportName(e.target.value)}
                fullWidth
              />

              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <FormControl fullWidth>
                    <InputLabel>Date Range</InputLabel>
                    <Select value={dateRange} label="Date Range" onChange={(e) => setDateRange(e.target.value)}>
                      <MenuItem value="today">Today</MenuItem>
                      <MenuItem value="yesterday">Yesterday</MenuItem>
                      <MenuItem value="last_7_days">Last 7 Days</MenuItem>
                      <MenuItem value="last_30_days">Last 30 Days</MenuItem>
                      <MenuItem value="this_month">This Month</MenuItem>
                      <MenuItem value="last_month">Last Month</MenuItem>
                      <MenuItem value="custom">Custom Range</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <FormControl fullWidth>
                    <InputLabel>Export Format</InputLabel>
                    <Select value={format} label="Export Format" onChange={(e) => setFormat(e.target.value)}>
                      <MenuItem value="pdf">PDF Report</MenuItem>
                      <MenuItem value="csv">CSV Data</MenuItem>
                      <MenuItem value="xlsx">Excel Spreadsheet</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
                  Platforms
                </Typography>
                <Stack direction="row" spacing={1}>
                  <Chip
                    icon={<IconBrandGoogle size={16} />}
                    label="Google Ads"
                    onClick={() => handlePlatformToggle('google')}
                    variant={platforms.includes('google') ? 'filled' : 'outlined'}
                    sx={{
                      bgcolor: platforms.includes('google') ? `${PRIMARY_COLOR}18` : 'transparent',
                      borderColor: platforms.includes('google') ? PRIMARY_COLOR : 'divider',
                      color: platforms.includes('google') ? PRIMARY_COLOR : 'text.secondary'
                    }}
                  />
                  <Chip
                    icon={<IconBrandFacebook size={16} />}
                    label="Meta Ads"
                    onClick={() => handlePlatformToggle('meta')}
                    variant={platforms.includes('meta') ? 'filled' : 'outlined'}
                    sx={{
                      bgcolor: platforms.includes('meta') ? `${PRIMARY_COLOR}18` : 'transparent',
                      borderColor: platforms.includes('meta') ? PRIMARY_COLOR : 'divider',
                      color: platforms.includes('meta') ? PRIMARY_COLOR : 'text.secondary'
                    }}
                  />
                </Stack>
              </Box>

              <Divider />

              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
                  Select Metrics
                </Typography>
                <Grid container spacing={1}>
                  {metricOptions.map((metric) => (
                    <Grid size={{ xs: 6, sm: 4 }} key={metric.id}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={selectedMetrics.includes(metric.id)}
                            onChange={() => handleMetricToggle(metric.id)}
                            sx={{ '&.Mui-checked': { color: PRIMARY_COLOR } }}
                          />
                        }
                        label={<Typography variant="body2">{metric.label}</Typography>}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Grid>

      {/* Preview & Actions */}
      <Grid size={{ xs: 12, md: 4 }}>
        <Stack spacing={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Report Preview
              </Typography>
              <Stack spacing={1.5}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="caption" color="text.secondary">
                    Name
                  </Typography>
                  <Typography variant="body2">{reportName || 'Untitled Report'}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="caption" color="text.secondary">
                    Date Range
                  </Typography>
                  <Typography variant="body2">{dateRange.replace(/_/g, ' ')}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="caption" color="text.secondary">
                    Platforms
                  </Typography>
                  <Typography variant="body2">{platforms.length} selected</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="caption" color="text.secondary">
                    Metrics
                  </Typography>
                  <Typography variant="body2">{selectedMetrics.length} selected</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="caption" color="text.secondary">
                    Format
                  </Typography>
                  <Typography variant="body2">{format.toUpperCase()}</Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>

          <Button
            variant="contained"
            size="large"
            startIcon={<IconPlayerPlay size={18} />}
            fullWidth
            sx={{ bgcolor: PRIMARY_COLOR, '&:hover': { bgcolor: '#6B48D6' } }}
          >
            Generate Report
          </Button>

          <Button variant="outlined" size="large" startIcon={<IconDownload size={18} />} fullWidth>
            Download Template
          </Button>

          <Card variant="outlined">
            <CardContent>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Schedule This Report
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Set up automated delivery for this report configuration
              </Typography>
              <Button size="small" startIcon={<IconClock size={16} />} sx={{ mt: 1.5, color: PRIMARY_COLOR }}>
                Create Schedule
              </Button>
            </CardContent>
          </Card>
        </Stack>
      </Grid>
    </Grid>
  );
}

/***************************  SCHEDULED REPORTS TAB  ***************************/

function ScheduledReports() {
  const [reports, setReports] = useState(scheduledReports);

  const handleToggle = (id) => {
    setReports((prev) => prev.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r)));
  };

  return (
    <Stack spacing={3}>
      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h6">Scheduled Reports</Typography>
          <Typography variant="body2" color="text.secondary">
            Automate your reporting and save hours every week
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<IconPlus size={18} />} sx={{ bgcolor: PRIMARY_COLOR, '&:hover': { bgcolor: '#6B48D6' } }}>
          New Schedule
        </Button>
      </Stack>

      <Alert severity="info" sx={{ bgcolor: `${PRIMARY_COLOR}08`, '& .MuiAlert-icon': { color: PRIMARY_COLOR } }}>
        Scheduled reports are automatically generated and delivered to your specified recipients. Connect your ad accounts to enable automated
        reporting.
      </Alert>

      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Report Name</TableCell>
                <TableCell>Frequency</TableCell>
                <TableCell>Next Run</TableCell>
                <TableCell>Recipients</TableCell>
                <TableCell>Platforms</TableCell>
                <TableCell align="center">Enabled</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reports.map((report) => (
                <TableRow key={report.id} hover>
                  <TableCell>
                    <Typography variant="subtitle2">{report.name}</Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={report.frequency}
                      size="small"
                      sx={{
                        bgcolor: `${PRIMARY_COLOR}18`,
                        color: PRIMARY_COLOR
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
                      <IconClock size={14} />
                      <Typography variant="body2">{report.nextRun}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {report.recipients}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={0.5}>
                      {report.platforms.map((p) => (
                        <Chip key={p} label={p} size="small" variant="outlined" />
                      ))}
                    </Stack>
                  </TableCell>
                  <TableCell align="center">
                    <Switch checked={report.enabled} onChange={() => handleToggle(report.id)} sx={{ '& .Mui-checked': { color: PRIMARY_COLOR } }} />
                  </TableCell>
                  <TableCell align="right">
                    <Stack direction="row" spacing={0.5} sx={{ justifyContent: 'flex-end' }}>
                      <IconButton size="small">
                        <IconEdit size={16} />
                      </IconButton>
                      <IconButton size="small">
                        <IconPlayerPlay size={16} />
                      </IconButton>
                      <IconButton size="small" color="error">
                        <IconTrash size={16} />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Stack>
  );
}

/***************************  REPORT HISTORY TAB  ***************************/

function ReportHistory() {
  return (
    <Stack spacing={3}>
      {/* Summary Cards */}
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <KpiCard title="Reports Generated" value="24" subtitle="This month" icon={IconReportAnalytics} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <KpiCard title="Reports Delivered" value="18" subtitle="Via email" icon={IconMail} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <KpiCard title="Downloads" value="12" subtitle="Manual exports" icon={IconDownload} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <KpiCard title="Scheduled Active" value="3" subtitle="Auto-running" icon={IconCalendar} />
        </Grid>
      </Grid>

      {/* History Table */}
      <Card>
        <CardContent sx={{ pb: 0 }}>
          <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">Report History</Typography>
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <Select defaultValue="all" size="small">
                <MenuItem value="all">All Reports</MenuItem>
                <MenuItem value="delivered">Delivered</MenuItem>
                <MenuItem value="downloaded">Downloaded</MenuItem>
                <MenuItem value="scheduled">Scheduled</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </CardContent>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Report Name</TableCell>
                <TableCell>Generated</TableCell>
                <TableCell>Period</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Size</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reportHistory.map((report) => (
                <TableRow key={report.id} hover>
                  <TableCell>
                    <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
                      <Box
                        sx={{
                          width: 36,
                          height: 36,
                          borderRadius: 1.5,
                          bgcolor: `${PRIMARY_COLOR}18`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <IconFileSpreadsheet size={18} color={PRIMARY_COLOR} />
                      </Box>
                      <Typography variant="subtitle2">{report.name}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{report.generatedAt}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {report.period}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={report.status === 'delivered' ? 'Delivered' : 'Downloaded'}
                      size="small"
                      sx={{
                        bgcolor: report.status === 'delivered' ? 'success.lighter' : `${PRIMARY_COLOR}18`,
                        color: report.status === 'delivered' ? 'success.main' : PRIMARY_COLOR
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{report.size}</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Stack direction="row" spacing={0.5} sx={{ justifyContent: 'flex-end' }}>
                      <IconButton size="small">
                        <IconEye size={16} />
                      </IconButton>
                      <IconButton size="small">
                        <IconDownload size={16} />
                      </IconButton>
                      <IconButton size="small">
                        <IconMail size={16} />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Stack>
  );
}

/***************************  REPORTS - MAIN  ***************************/

export default function ReportsPage() {
  const [tab, setTab] = useState(0);

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h4" sx={{ mb: 0.5 }}>
          Reports
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Generate, schedule, and export marketing performance reports
        </Typography>
      </Box>

      <Tabs value={tab} onChange={(_, v) => setTab(v)}>
        <Tab label="Report Builder" />
        <Tab label="Scheduled Reports" />
        <Tab label="Report History" />
      </Tabs>

      <Box>
        {tab === 0 && <ReportBuilder />}
        {tab === 1 && <ScheduledReports />}
        {tab === 2 && <ReportHistory />}
      </Box>
    </Stack>
  );
}
