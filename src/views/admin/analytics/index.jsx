import { useState, useEffect, useCallback, useMemo } from 'react';

// @mui
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import LinearProgress from '@mui/material/LinearProgress';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import TablePagination from '@mui/material/TablePagination';
import Skeleton from '@mui/material/Skeleton';
import Alert from '@mui/material/Alert';
import useMediaQuery from '@mui/material/useMediaQuery';
import Tooltip from '@mui/material/Tooltip';
// @mui/x-charts
import { LineChart } from '@mui/x-charts/LineChart';

// @assets
import {
  IconArrowUpRight,
  IconArrowDownRight,
  IconDownload,
  IconTrendingUp,
  IconTrendingDown,
  IconChartBar,
  IconBrandFacebook,
  IconBrandGoogle,
  IconBrandInstagram,
  IconBrandTiktok,
  IconArrowRight,
  IconRefresh,
  IconCalendar,
  IconDeviceDesktop,
  IconDeviceMobile,
  IconDeviceTablet,
  IconWorld,
  IconUsers,
  IconPhoto,
  IconVideo,
  IconLayoutGrid,
  IconCircleFilled,
  IconPlayerPlay,
  IconEye,
  IconTargetArrow,
  IconChartLine,
  IconFileSpreadsheet,
  IconColumns,
  IconBell,
  IconLock,
  IconRocket,
  IconBolt,
  IconChartPie,
  IconPercentage,
  IconClick,
  IconCurrencyDollar
} from '@tabler/icons-react';

import { fetchMetrics, fetchCampaigns } from '@/utils/api/windmill';

/***************************  DESIGN TOKENS  ***************************/

const ACCENT = '#805AF5';

const glass = {
  bg: 'rgba(30, 30, 35, 0.65)',
  border: '1px solid rgba(255,255,255,0.06)',
  blur: 'blur(40px)',
  shadow: 'inset 2px 4px 16px 0px rgba(248,248,248,0.03)',
  radius: 24,
  hoverBorder: 'rgba(255,255,255,0.12)'
};

const text = {
  primary: 'rgba(248,248,248,0.92)',
  secondary: 'rgba(248,248,248,0.55)',
  muted: 'rgba(248,248,248,0.35)',
  accent: ACCENT
};

/***************************  CONSTANTS  ***************************/

const PLATFORM_ICON = {
  meta: IconBrandFacebook,
  facebook: IconBrandFacebook,
  google: IconBrandGoogle,
  instagram: IconBrandInstagram,
  tiktok: IconBrandTiktok
};

const PLATFORM_BRAND = {
  meta: '#1877F2',
  facebook: '#1877F2',
  google: '#4285F4',
  instagram: '#E1306C',
  tiktok: '#000000'
};

const FORMAT_ICON = {
  Video: IconVideo,
  Image: IconPhoto,
  Carousel: IconLayoutGrid,
  Story: IconPlayerPlay
};

/***************************  GLASS CARD WRAPPER  ***************************/

function GlassCard({ children, sx = {}, hover = false, ...props }) {
  return (
    <Box
      sx={{
        position: 'relative',
        borderRadius: `${glass.radius}px`,
        border: glass.border,
        background: glass.bg,
        backdropFilter: glass.blur,
        WebkitBackdropFilter: glass.blur,
        boxShadow: glass.shadow,
        overflow: 'hidden',
        transition: 'border-color 0.25s ease, transform 0.25s ease',
        ...(hover && {
          '&:hover': { borderColor: glass.hoverBorder, transform: 'translateY(-2px)' }
        }),
        ...sx
      }}
      {...props}
    >
      {children}
    </Box>
  );
}

/***************************  CSV EXPORT  ***************************/

function exportToCsv(filename, headers, rows) {
  const csv = [
    headers.join(','),
    ...rows.map((r) =>
      r.map((c) => `"${String(c ?? '').replace(/"/g, '""')}"`).join(',')
    )
  ].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

/***************************  KPI SCORECARD  ***************************/

function KpiCard({ label, value, change, up, icon: Icon, sub }) {
  return (
    <GlassCard hover sx={{ height: '100%' }}>
      <Box sx={{ p: 2.5 }}>
        <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: '12px',
              bgcolor: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.06)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Icon size={18} style={{ color: text.secondary }} />
          </Box>
          {change && (
            <Stack
              direction="row"
              sx={{
                alignItems: 'center',
                gap: 0.25,
                px: 1,
                py: 0.25,
                borderRadius: '8px',
                bgcolor: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.05)'
              }}
            >
              {up ? (
                <IconArrowUpRight size={12} style={{ color: '#3EB75E' }} />
              ) : (
                <IconArrowDownRight size={12} style={{ color: '#FF4D4D' }} />
              )}
              <Typography
                sx={{
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  color: up ? '#3EB75E' : '#FF4D4D'
                }}
              >
                {change}
              </Typography>
            </Stack>
          )}
        </Stack>
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: '1.55rem',
            color: text.primary,
            mb: 0.25,
            letterSpacing: '-0.02em',
            fontFamily: '"DM Sans", sans-serif'
          }}
        >
          {value}
        </Typography>
        <Typography sx={{ fontSize: '0.78rem', fontWeight: 500, color: text.secondary }}>
          {label}
        </Typography>
        {sub && (
          <Typography sx={{ display: 'block', mt: 0.5, fontSize: '0.65rem', color: text.muted }}>
            {sub}
          </Typography>
        )}
      </Box>
    </GlassCard>
  );
}

/***************************  PLATFORM ROW  ***************************/

function PlatformRow({ plat, maxSpend }) {
  const key = (plat.platform || plat.name || '').toLowerCase();
  const Icon = PLATFORM_ICON[key] || IconChartBar;
  const brandColor = PLATFORM_BRAND[key] || ACCENT;
  const name = plat.name || plat.platform || 'Unknown';
  const spend = Number(plat.spend) || 0;
  const barWidth = maxSpend > 0 ? (spend / maxSpend) * 100 : 0;

  return (
    <Box sx={{ py: 2, borderBottom: '1px solid rgba(255,255,255,0.03)', '&:last-child': { borderBottom: 'none' } }}>
      <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', mb: 1.5, gap: 2, flexWrap: 'wrap' }}>
        <Stack direction="row" sx={{ alignItems: 'center', gap: 1.5, minWidth: 160 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: '12px',
              bgcolor: `${brandColor}12`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Icon size={20} color={brandColor} />
          </Box>
          <Box>
            <Typography sx={{ fontWeight: 700, fontSize: '0.9rem', color: text.primary }}>{name}</Typography>
            {plat.share > 0 && (
              <Typography sx={{ fontSize: '0.68rem', color: text.muted }}>{plat.share}% of total spend</Typography>
            )}
          </Box>
        </Stack>
        <Stack direction="row" spacing={3} sx={{ flexWrap: 'wrap' }}>
          {[
            { label: 'Impressions', val: plat.impressions ? `${(plat.impressions / 1000).toFixed(0)}K` : '\u2014' },
            { label: 'Clicks', val: plat.clicks ? plat.clicks.toLocaleString() : '\u2014' },
            { label: 'CTR', val: plat.ctr ? `${Number(plat.ctr).toFixed(2)}%` : '\u2014' },
            { label: 'CPC', val: plat.cpc ? `$${Number(plat.cpc).toFixed(2)}` : '\u2014' },
            { label: 'ROAS', val: plat.roas ? `${Number(plat.roas).toFixed(1)}x` : '\u2014' },
            { label: 'Spend', val: spend ? `$${spend.toLocaleString()}` : '\u2014' }
          ].map((m) => (
            <Box key={m.label} sx={{ textAlign: 'right', minWidth: 55 }}>
              <Typography sx={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: 0.6, color: text.muted }}>
                {m.label}
              </Typography>
              <Typography sx={{ fontWeight: 700, fontSize: '0.85rem', color: text.primary }}>{m.val}</Typography>
            </Box>
          ))}
        </Stack>
      </Stack>
      <Box sx={{ position: 'relative', height: 4, borderRadius: 3, bgcolor: 'rgba(255,255,255,0.04)', overflow: 'hidden' }}>
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            top: 0,
            height: '100%',
            width: `${barWidth}%`,
            borderRadius: 3,
            bgcolor: ACCENT,
            opacity: 0.7,
            transition: 'width 0.6s ease'
          }}
        />
      </Box>
    </Box>
  );
}

/***************************  SORTABLE CAMPAIGN TABLE  ***************************/

const CAMPAIGN_COLUMNS = [
  { id: 'name', label: 'Campaign', align: 'left', hideOnMobile: false },
  { id: 'impressions', label: 'Impressions', align: 'right', hideOnMobile: true, format: (v) => (v ? Number(v).toLocaleString() : '\u2014') },
  { id: 'clicks', label: 'Clicks', align: 'right', hideOnMobile: false, format: (v) => (v ? Number(v).toLocaleString() : '\u2014') },
  { id: 'ctr', label: 'CTR', align: 'right', hideOnMobile: false, format: (v) => (v ? `${Number(v).toFixed(2)}%` : '\u2014') },
  { id: 'conversions', label: 'Conv.', align: 'right', hideOnMobile: true, format: (v) => (v ? Number(v).toLocaleString() : '\u2014') },
  { id: 'spend', label: 'Spend', align: 'right', hideOnMobile: false, format: (v) => (v ? `$${Number(v).toLocaleString()}` : '\u2014') },
  { id: 'roas', label: 'ROAS', align: 'right', hideOnMobile: false, format: (v) => (v ? `${Number(v).toFixed(1)}x` : '\u2014') }
];

function SortableCampaignTable({ campaigns, isMobile }) {
  const [sortBy, setSortBy] = useState('spend');
  const [sortDir, setSortDir] = useState('desc');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleSort = (col) => {
    if (sortBy === col) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(col);
      setSortDir('desc');
    }
    setPage(0);
  };

  const sorted = useMemo(() => {
    if (!campaigns) return [];
    return [...campaigns].sort((a, b) => {
      if (sortBy === 'name') {
        return sortDir === 'asc'
          ? (a.name || '').localeCompare(b.name || '')
          : (b.name || '').localeCompare(a.name || '');
      }
      const aVal = Number(a[sortBy]) || 0;
      const bVal = Number(b[sortBy]) || 0;
      return sortDir === 'asc' ? aVal - bVal : bVal - aVal;
    });
  }, [campaigns, sortBy, sortDir]);

  const paged = sorted.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  const statusColor = { active: '#3EB75E', paused: '#FFC876', ended: '#FF4D4D', draft: 'rgba(248,248,248,0.35)' };
  const visibleCols = CAMPAIGN_COLUMNS.filter((c) => !isMobile || !c.hideOnMobile);

  return (
    <>
      <TableContainer>
        <Table
          size={isMobile ? 'small' : 'medium'}
          sx={{
            '& th': {
              fontWeight: 700,
              fontSize: '0.68rem',
              textTransform: 'uppercase',
              letterSpacing: 0.5,
              color: text.muted,
              borderBottomColor: 'rgba(255,255,255,0.04)'
            },
            '& td': {
              borderBottomColor: 'rgba(255,255,255,0.03)',
              color: text.primary
            }
          }}
        >
          <TableHead>
            <TableRow>
              {visibleCols.map((col) => (
                <TableCell key={col.id} align={col.align}>
                  <TableSortLabel
                    active={sortBy === col.id}
                    direction={sortBy === col.id ? sortDir : 'asc'}
                    onClick={() => handleSort(col.id)}
                    sx={{
                      '&.MuiTableSortLabel-root': { color: text.muted },
                      '&.Mui-active': { color: text.secondary },
                      '& .MuiTableSortLabel-icon': { color: `${text.muted} !important` }
                    }}
                  >
                    {col.label}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell align="center" sx={{ width: 40 }}>
                Trend
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paged.map((c, i) => {
              const key = (c.platform || '').toLowerCase();
              const PlatIcon = PLATFORM_ICON[key] || IconChartBar;
              const brandColor = PLATFORM_BRAND[key] || ACCENT;
              return (
                <TableRow
                  key={c.id || c.name || i}
                  sx={{
                    transition: 'background 0.15s',
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.02)' }
                  }}
                >
                  <TableCell>
                    <Stack direction="row" sx={{ alignItems: 'center', gap: 1.5 }}>
                      <Box
                        sx={{
                          width: 32,
                          height: 32,
                          borderRadius: '10px',
                          bgcolor: `${brandColor}12`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}
                      >
                        <PlatIcon size={16} color={brandColor} />
                      </Box>
                      <Box sx={{ minWidth: 0 }}>
                        <Typography
                          noWrap
                          sx={{
                            fontWeight: 600,
                            fontSize: '0.85rem',
                            color: text.primary,
                            maxWidth: { xs: 120, sm: 200, md: 300 }
                          }}
                        >
                          {c.name}
                        </Typography>
                        {c.status && (
                          <Stack direction="row" sx={{ alignItems: 'center', gap: 0.5 }}>
                            <IconCircleFilled size={6} color={statusColor[c.status] || text.muted} />
                            <Typography
                              sx={{
                                fontSize: '0.6rem',
                                textTransform: 'capitalize',
                                color: statusColor[c.status] || text.muted
                              }}
                            >
                              {c.status}
                            </Typography>
                          </Stack>
                        )}
                      </Box>
                    </Stack>
                  </TableCell>
                  {visibleCols.slice(1).map((col) => {
                    const val = col.format ? col.format(c[col.id]) : c[col.id];
                    return (
                      <TableCell key={col.id} align={col.align}>
                        <Typography
                          sx={{
                            fontWeight: col.id === 'roas' || col.id === 'spend' ? 700 : 400,
                            fontSize: '0.85rem',
                            color: text.primary
                          }}
                        >
                          {val}
                        </Typography>
                      </TableCell>
                    );
                  })}
                  <TableCell align="center">
                    {c.trend === 'up' && <IconTrendingUp size={16} style={{ color: '#3EB75E' }} />}
                    {c.trend === 'down' && <IconTrendingDown size={16} style={{ color: '#FF4D4D' }} />}
                    {(!c.trend || c.trend === 'stable') && <IconChartBar size={14} style={{ color: text.muted }} />}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {sorted.length > 10 && (
        <TablePagination
          component="div"
          count={sorted.length}
          page={page}
          onPageChange={(_, p) => setPage(p)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
          rowsPerPageOptions={[10, 25, 50]}
          sx={{
            borderTop: '1px solid rgba(255,255,255,0.04)',
            color: text.secondary,
            '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': { color: text.muted, fontSize: '0.75rem' },
            '& .MuiTablePagination-select': { color: text.secondary },
            '& .MuiTablePagination-actions .MuiIconButton-root': { color: text.secondary }
          }}
        />
      )}
    </>
  );
}

/***************************  CREATIVE ROW  ***************************/

function CreativeRow({ c, isMobile }) {
  const FmtIcon = FORMAT_ICON[c.format] || IconPhoto;
  return (
    <TableRow sx={{ transition: 'background 0.15s', '&:hover': { bgcolor: 'rgba(255,255,255,0.02)' } }}>
      <TableCell>
        <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
          <FmtIcon size={16} style={{ color: text.secondary }} />
          <Typography sx={{ fontSize: '0.82rem', fontWeight: 600, color: text.primary }}>{c.name}</Typography>
        </Stack>
      </TableCell>
      <TableCell>
        <Chip
          label={c.format || 'Unknown'}
          size="small"
          sx={{
            height: 22,
            fontSize: '0.63rem',
            fontWeight: 600,
            bgcolor: 'rgba(255,255,255,0.04)',
            color: text.secondary,
            border: '1px solid rgba(255,255,255,0.06)'
          }}
        />
      </TableCell>
      {!isMobile && (
        <TableCell align="right">
          <Typography sx={{ color: text.primary, fontSize: '0.82rem' }}>
            {c.impressions ? `${(Number(c.impressions) / 1000).toFixed(0)}K` : '\u2014'}
          </Typography>
        </TableCell>
      )}
      <TableCell align="right">
        <Typography sx={{ fontWeight: 700, fontSize: '0.82rem', color: text.primary }}>
          {c.ctr ? `${Number(c.ctr).toFixed(2)}%` : '\u2014'}
        </Typography>
      </TableCell>
      <TableCell align="right">
        <Typography sx={{ fontWeight: 700, fontSize: '0.82rem', color: text.primary }}>
          {c.roas ? `${Number(c.roas).toFixed(1)}x` : '\u2014'}
        </Typography>
      </TableCell>
      {!isMobile && c.fatigue !== undefined && (
        <TableCell align="right">
          <Stack direction="row" sx={{ alignItems: 'center', gap: 1, justifyContent: 'flex-end' }}>
            <Box sx={{ width: 60, height: 4, borderRadius: 3, bgcolor: 'rgba(255,255,255,0.04)', overflow: 'hidden' }}>
              <Box
                sx={{
                  height: '100%',
                  width: `${c.fatigue}%`,
                  borderRadius: 3,
                  bgcolor: c.fatigue >= 50 ? '#FF4D4D' : c.fatigue >= 30 ? '#FFC876' : '#3EB75E'
                }}
              />
            </Box>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: '0.7rem',
                color: c.fatigue >= 50 ? '#FF4D4D' : c.fatigue >= 30 ? '#FFC876' : '#3EB75E',
                minWidth: 28,
                textAlign: 'right'
              }}
            >
              {c.fatigue}%
            </Typography>
          </Stack>
        </TableCell>
      )}
      {!isMobile && c.fatigue === undefined && (
        <TableCell align="right">
          <Typography sx={{ color: text.muted }}>{'\u2014'}</Typography>
        </TableCell>
      )}
    </TableRow>
  );
}

/***************************  TREND CHART  ***************************/

function TrendChart({ data, dateRange }) {
  if (!data || !data.dates || data.dates.length === 0) return null;

  const series = [];
  if (data.spend) series.push({ data: data.spend, label: 'Spend ($)', color: ACCENT, area: true, showMark: false });
  if (data.revenue) series.push({ data: data.revenue, label: 'Revenue ($)', color: 'rgba(248,248,248,0.55)', area: true, showMark: false });
  if (data.impressions) series.push({ data: data.impressions.map((v) => v / 1000), label: 'Impressions (K)', color: 'rgba(248,248,248,0.25)', showMark: false });
  if (data.clicks) series.push({ data: data.clicks, label: 'Clicks', color: 'rgba(128,90,245,0.5)', showMark: false });

  if (series.length === 0) return null;

  return (
    <GlassCard>
      <Box sx={{ p: { xs: 2, sm: 3 } }}>
        <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
            <IconChartLine size={18} style={{ color: text.secondary }} />
            <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: text.primary, fontFamily: '"DM Sans", sans-serif' }}>
              Performance Trend
            </Typography>
          </Stack>
          <Typography sx={{ fontSize: '0.75rem', color: text.muted }}>
            {dateRange === '7d' ? 'Last 7 days' : dateRange === '30d' ? 'Last 30 days' : 'Last 90 days'}
          </Typography>
        </Stack>
        <Box sx={{ width: '100%', height: 300 }}>
          <LineChart
            xAxis={[
              {
                data: data.dates.map((_, i) => i),
                scaleType: 'point',
                valueFormatter: (v) => data.dates[v] || '',
                tickLabelStyle: { fontSize: 10, fill: text.muted }
              }
            ]}
            series={series.map((s) => ({ ...s, curve: 'natural' }))}
            height={280}
            margin={{ top: 20, bottom: 30, left: 60, right: 20 }}
            sx={{
              '& .MuiLineElement-root': { strokeWidth: 2 },
              '& .MuiAreaElement-root': { fillOpacity: 0.04 },
              '& .MuiChartsAxis-line': { stroke: 'rgba(255,255,255,0.06)' },
              '& .MuiChartsAxis-tick': { stroke: 'rgba(255,255,255,0.06)' },
              '& .MuiChartsAxisHighlight-root': { stroke: `${ACCENT}40` },
              '& .MuiChartsAxis-tickLabel': { fill: text.muted }
            }}
            slotProps={{
              legend: { labelStyle: { fontSize: 11, fill: text.secondary } }
            }}
          />
        </Box>
      </Box>
    </GlassCard>
  );
}

/***************************  LOADING SKELETON  ***************************/

function SkeletonDashboard() {
  return (
    <Stack spacing={2.5} sx={{ maxWidth: 1920, mx: 'auto', width: '100%' }}>
      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Skeleton width={180} height={32} sx={{ bgcolor: 'rgba(255,255,255,0.04)' }} />
          <Skeleton width={260} height={16} sx={{ bgcolor: 'rgba(255,255,255,0.03)' }} />
        </Box>
        <Stack direction="row" spacing={1}>
          <Skeleton variant="rounded" width={130} height={36} sx={{ bgcolor: 'rgba(255,255,255,0.04)', borderRadius: '12px' }} />
          <Skeleton variant="rounded" width={90} height={36} sx={{ bgcolor: 'rgba(255,255,255,0.04)', borderRadius: '12px' }} />
        </Stack>
      </Stack>
      <Grid container spacing={2}>
        {Array.from({ length: 6 }).map((_, i) => (
          <Grid key={i} size={{ xs: 6, sm: 4, lg: 2 }}>
            <GlassCard>
              <Box sx={{ p: 2.5 }}>
                <Stack direction="row" sx={{ justifyContent: 'space-between', mb: 1.5 }}>
                  <Skeleton variant="rounded" width={40} height={40} sx={{ bgcolor: 'rgba(255,255,255,0.04)', borderRadius: '12px' }} />
                  <Skeleton variant="rounded" width={60} height={22} sx={{ bgcolor: 'rgba(255,255,255,0.03)', borderRadius: '8px' }} />
                </Stack>
                <Skeleton width="60%" height={28} sx={{ bgcolor: 'rgba(255,255,255,0.04)' }} />
                <Skeleton width="45%" height={16} sx={{ bgcolor: 'rgba(255,255,255,0.03)' }} />
              </Box>
            </GlassCard>
          </Grid>
        ))}
      </Grid>
      <Skeleton variant="rounded" height={300} sx={{ bgcolor: 'rgba(255,255,255,0.04)', borderRadius: `${glass.radius}px` }} />
      <GlassCard>
        <Box sx={{ p: 3 }}>
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} variant="rounded" height={48} sx={{ mb: 1.5, bgcolor: 'rgba(255,255,255,0.03)', borderRadius: '12px' }} />
          ))}
        </Box>
      </GlassCard>
    </Stack>
  );
}

/***************************  CONNECT STATE  ***************************/

function ConnectState() {
  return (
    <Stack spacing={2.5} sx={{ maxWidth: 1920, mx: 'auto', width: '100%' }}>
      {/* Hero */}
      <GlassCard sx={{ position: 'relative' }}>
        <Box
          sx={{
            position: 'absolute',
            top: -120,
            right: -80,
            width: 350,
            height: 350,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${ACCENT}0A 0%, transparent 70%)`,
            pointerEvents: 'none'
          }}
        />

        <Box sx={{ p: { xs: 3, md: 5 }, position: 'relative' }}>
          <Grid container spacing={4} sx={{ alignItems: 'center' }}>
            <Grid size={{ xs: 12, md: 7 }}>
              <Chip
                label="CROSS-PLATFORM ANALYTICS"
                size="small"
                sx={{
                  mb: 2.5,
                  height: 26,
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  letterSpacing: 1.5,
                  bgcolor: `${ACCENT}10`,
                  color: ACCENT,
                  border: `1px solid ${ACCENT}20`,
                  borderRadius: '8px'
                }}
              />
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: '1.75rem', md: '2.4rem' },
                  lineHeight: 1.12,
                  mb: 2,
                  fontFamily: '"DM Sans", sans-serif',
                  color: text.primary
                }}
              >
                See The Full Picture
                <br />
                <Box component="span" sx={{ color: ACCENT }}>
                  Across Every Platform
                </Box>
              </Typography>
              <Typography sx={{ mb: 3, lineHeight: 1.7, maxWidth: 520, fontSize: '0.95rem', color: text.secondary }}>
                Connect your ad accounts to unlock real-time analytics, performance trends, campaign breakdowns, and AI-powered insights &mdash; all in one unified dashboard.
              </Typography>

              <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap' }}>
                {[
                  { name: 'Google Ads', sub: 'Search, Display, YouTube', icon: IconBrandGoogle, brandColor: '#4285F4' },
                  { name: 'Meta Ads', sub: 'Facebook, Instagram', icon: IconBrandFacebook, brandColor: '#1877F2' }
                ].map((p) => (
                  <GlassCard
                    key={p.name}
                    hover
                    sx={{ flex: 1, minWidth: 160, cursor: 'pointer' }}
                  >
                    <Box sx={{ py: 2.5, textAlign: 'center' }}>
                      <Box
                        sx={{
                          width: 44,
                          height: 44,
                          borderRadius: '12px',
                          bgcolor: `${p.brandColor}12`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mx: 'auto',
                          mb: 1
                        }}
                      >
                        <p.icon size={22} color={p.brandColor} />
                      </Box>
                      <Typography sx={{ fontWeight: 700, fontSize: '0.88rem', color: text.primary }}>{p.name}</Typography>
                      <Typography sx={{ fontSize: '0.72rem', color: text.muted }}>{p.sub}</Typography>
                    </Box>
                  </GlassCard>
                ))}
              </Stack>

              <Button
                variant="contained"
                size="large"
                endIcon={<IconArrowRight size={16} />}
                sx={{
                  mt: 3,
                  borderRadius: '14px',
                  px: 5,
                  py: 1.5,
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  textTransform: 'none',
                  letterSpacing: 0.3,
                  background: ACCENT,
                  boxShadow: `0 8px 32px ${ACCENT}30`,
                  '&:hover': { background: '#6C47E0', boxShadow: `0 12px 40px ${ACCENT}40` }
                }}
              >
                Connect Ad Accounts
              </Button>
            </Grid>

            <Grid size={{ xs: 12, md: 5 }}>
              <Stack spacing={2.5}>
                {[
                  { icon: IconChartLine, label: 'Real-time trend charts', desc: 'Spend, revenue & conversions over time' },
                  { icon: IconChartPie, label: 'Platform breakdown', desc: 'Compare Google, Meta, TikTok side-by-side' },
                  { icon: IconTargetArrow, label: 'Campaign deep-dive', desc: 'Sort, filter, paginate all campaigns' },
                  { icon: IconBolt, label: 'AI-powered insights', desc: 'Automated recommendations to improve ROAS' }
                ].map((item) => {
                  const F = item.icon;
                  return (
                    <Stack key={item.label} direction="row" sx={{ gap: 2, alignItems: 'center' }}>
                      <Box
                        sx={{
                          width: 44,
                          height: 44,
                          borderRadius: '12px',
                          bgcolor: 'rgba(255,255,255,0.03)',
                          border: '1px solid rgba(255,255,255,0.06)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}
                      >
                        <F size={20} style={{ color: text.secondary }} />
                      </Box>
                      <Box>
                        <Typography sx={{ fontWeight: 600, fontSize: '0.88rem', color: text.primary }}>{item.label}</Typography>
                        <Typography sx={{ fontSize: '0.78rem', color: text.muted }}>{item.desc}</Typography>
                      </Box>
                    </Stack>
                  );
                })}
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </GlassCard>

      {/* Feature Cards */}
      <Grid container spacing={2}>
        {[
          { icon: IconChartLine, name: 'Line Charts', desc: 'Spend, revenue & conversion trends' },
          { icon: IconCalendar, name: 'Date Comparison', desc: 'Compare period vs previous period' },
          { icon: IconFileSpreadsheet, name: 'CSV/PDF Export', desc: 'Download reports for your team' },
          { icon: IconColumns, name: 'Sortable Tables', desc: 'Sort by any metric, paginate results' },
          { icon: IconBell, name: 'Alerts & Thresholds', desc: 'Get notified when CPA spikes' },
          { icon: IconUsers, name: 'Audience Insights', desc: 'Demographics, geo, device breakdown' }
        ].map((feat) => {
          const FeatIcon = feat.icon;
          return (
            <Grid key={feat.name} size={{ xs: 6, sm: 4, lg: 2 }}>
              <GlassCard hover sx={{ height: '100%' }}>
                <Box sx={{ p: 2.5, textAlign: 'center' }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '14px',
                      bgcolor: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 1.5
                    }}
                  >
                    <FeatIcon size={22} style={{ color: text.secondary }} />
                  </Box>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.82rem', color: text.primary, mb: 0.5 }}>{feat.name}</Typography>
                  <Typography sx={{ fontSize: '0.7rem', lineHeight: 1.45, color: text.muted }}>{feat.desc}</Typography>
                </Box>
              </GlassCard>
            </Grid>
          );
        })}
      </Grid>

      {/* How It Works */}
      <GlassCard>
        <Box sx={{ p: { xs: 3, md: 4 } }}>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: '1.15rem',
              mb: 3.5,
              textAlign: 'center',
              color: text.primary,
              fontFamily: '"DM Sans", sans-serif'
            }}
          >
            How It Works
          </Typography>
          <Grid container spacing={3}>
            {[
              { step: '01', title: 'Connect Accounts', desc: 'Link your Google Ads, Meta, or TikTok accounts with read-only OAuth access.' },
              { step: '02', title: 'Data Syncs Instantly', desc: 'Campaigns, spend, impressions and conversions flow in from every connected platform.' },
              { step: '03', title: 'Unified Dashboard', desc: 'See all platforms side-by-side with sortable tables, charts and AI-powered insights.' }
            ].map((item) => (
              <Grid key={item.step} size={{ xs: 12, md: 4 }}>
                <Stack sx={{ alignItems: 'center', textAlign: 'center' }}>
                  <Box
                    sx={{
                      width: 52,
                      height: 52,
                      borderRadius: '50%',
                      bgcolor: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 700,
                        color: text.secondary,
                        fontSize: '0.85rem',
                        fontFamily: '"DM Sans", sans-serif',
                        letterSpacing: 1
                      }}
                    >
                      {item.step}
                    </Typography>
                  </Box>
                  <Typography sx={{ fontWeight: 700, mb: 0.75, fontSize: '0.95rem', color: text.primary }}>{item.title}</Typography>
                  <Typography sx={{ lineHeight: 1.6, maxWidth: 300, fontSize: '0.85rem', color: text.secondary }}>{item.desc}</Typography>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Box>
      </GlassCard>

      {/* Stats */}
      <Grid container spacing={2}>
        {[
          { value: '3+', label: 'Ad platforms supported' },
          { value: '< 5s', label: 'Data sync speed' },
          { value: '100%', label: 'Read-only, safe access' },
          { value: '24/7', label: 'Real-time monitoring' }
        ].map((stat) => (
          <Grid key={stat.label} size={{ xs: 6, md: 3 }}>
            <GlassCard sx={{ textAlign: 'center' }}>
              <Box sx={{ p: 2.5 }}>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: '1.75rem',
                    color: text.primary,
                    fontFamily: '"DM Sans", sans-serif',
                    mb: 0.5
                  }}
                >
                  {stat.value}
                </Typography>
                <Typography sx={{ fontSize: '0.72rem', lineHeight: 1.45, color: text.muted }}>{stat.label}</Typography>
              </Box>
            </GlassCard>
          </Grid>
        ))}
      </Grid>

      {/* Trust bar */}
      <Stack direction="row" sx={{ gap: 4, justifyContent: 'center', flexWrap: 'wrap', py: 1 }}>
        {[
          { icon: IconLock, text: 'Read-only access' },
          { icon: IconRocket, text: 'Real-time sync' },
          { icon: IconFileSpreadsheet, text: 'Export anytime' },
          { icon: IconBolt, text: 'AI insights included' }
        ].map((item) => {
          const TrustIcon = item.icon;
          return (
            <Stack key={item.text} direction="row" sx={{ gap: 0.75, alignItems: 'center' }}>
              <TrustIcon size={14} style={{ color: text.muted }} />
              <Typography sx={{ fontSize: '0.72rem', color: text.muted }}>{item.text}</Typography>
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
}

/***************************  EMPTY TAB STATE  ***************************/

function EmptyTab({ icon: Icon, title, description }) {
  return (
    <Box sx={{ py: 8, textAlign: 'center' }}>
      <Box
        sx={{
          width: 56,
          height: 56,
          borderRadius: '50%',
          bgcolor: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mx: 'auto',
          mb: 2
        }}
      >
        <Icon size={28} style={{ color: text.muted }} />
      </Box>
      <Typography sx={{ fontWeight: 600, fontSize: '0.95rem', color: text.primary, mb: 0.5 }}>{title}</Typography>
      <Typography sx={{ fontSize: '0.85rem', color: text.secondary, maxWidth: 400, mx: 'auto' }}>{description}</Typography>
    </Box>
  );
}

/***************************  ANALYTICS PAGE  ***************************/

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('7d');
  const [tab, setTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState(null);
  const [campaigns, setCampaigns] = useState(null);
  const [error, setError] = useState(null);
  const isMobile = useMediaQuery((t) => t.breakpoints.down('sm'));

  const loadMetrics = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchMetrics({ dateRange });
      setMetrics(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch metrics');
    } finally {
      setLoading(false);
    }
  }, [dateRange]);

  useEffect(() => {
    loadMetrics();
  }, [loadMetrics]);

  useEffect(() => {
    if (tab === 1 && campaigns === null) {
      fetchCampaigns({ dateRange })
        .then((data) => setCampaigns(Array.isArray(data) ? data : data?.campaigns || []))
        .catch(() => setCampaigns([]));
    }
  }, [tab, dateRange, campaigns]);

  // Loading
  if (loading) return <SkeletonDashboard />;

  // No connection / fetch failed - show connect state
  if (error && (error.includes('404') || error.includes('not found') || error.includes('Failed to fetch'))) {
    return <ConnectState />;
  }

  // Other error
  if (error) {
    return (
      <Stack spacing={3} sx={{ maxWidth: 1920, mx: 'auto', width: '100%' }}>
        <Alert
          severity="error"
          sx={{
            borderRadius: '16px',
            bgcolor: 'rgba(255,0,3,0.06)',
            border: '1px solid rgba(255,0,3,0.15)',
            color: text.primary,
            '& .MuiAlert-icon': { color: '#FF0003' }
          }}
          action={
            <Button
              size="small"
              startIcon={<IconRefresh size={14} />}
              onClick={loadMetrics}
              sx={{
                color: text.secondary,
                textTransform: 'none',
                fontWeight: 600,
                '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' }
              }}
            >
              Retry
            </Button>
          }
        >
          {error}
        </Alert>
      </Stack>
    );
  }

  if (!metrics) return <ConnectState />;

  // Extract data from metrics response
  const kpis = metrics.kpis || metrics.summary || metrics;
  const platforms = metrics.platforms || metrics.platformBreakdown || [];
  const creatives = metrics.creatives || metrics.creativeInsights || [];
  const audience = metrics.audience || metrics.demographics || null;
  const trendData = metrics.trend || metrics.chart || metrics.timeSeries || null;

  // Build KPI cards with monochrome icons
  const kpiCards = [];
  if (kpis.impressions !== undefined)
    kpiCards.push({
      label: 'Impressions',
      value: Number(kpis.impressions).toLocaleString(),
      change: kpis.impressionsChange,
      up: !kpis.impressionsChange?.startsWith('-'),
      icon: IconEye
    });
  if (kpis.clicks !== undefined)
    kpiCards.push({
      label: 'Clicks',
      value: Number(kpis.clicks).toLocaleString(),
      change: kpis.clicksChange,
      up: !kpis.clicksChange?.startsWith('-'),
      icon: IconClick
    });
  if (kpis.ctr !== undefined)
    kpiCards.push({
      label: 'CTR',
      value: `${Number(kpis.ctr).toFixed(2)}%`,
      change: kpis.ctrChange,
      up: !kpis.ctrChange?.startsWith('-'),
      icon: IconPercentage
    });
  if (kpis.conversions !== undefined)
    kpiCards.push({
      label: 'Conversions',
      value: Number(kpis.conversions).toLocaleString(),
      change: kpis.conversionsChange,
      up: !kpis.conversionsChange?.startsWith('-'),
      icon: IconTargetArrow
    });
  if (kpis.roas !== undefined)
    kpiCards.push({
      label: 'ROAS',
      value: `${Number(kpis.roas).toFixed(1)}x`,
      change: kpis.roasChange,
      up: !kpis.roasChange?.startsWith('-'),
      icon: IconTrendingUp,
      sub: kpis.revenue ? `Revenue: $${Number(kpis.revenue).toLocaleString()}` : undefined
    });
  if (kpis.spend !== undefined)
    kpiCards.push({
      label: 'Ad Spend',
      value: `$${Number(kpis.spend).toLocaleString()}`,
      change: kpis.spendChange,
      up: kpis.spendChange?.startsWith('-'),
      icon: IconCurrencyDollar,
      sub: kpis.cpc ? `CPC: $${Number(kpis.cpc).toFixed(2)}` : undefined
    });

  const maxSpend = platforms.reduce((max, p) => Math.max(max, Number(p.spend) || 0), 0);

  const handleExportCampaigns = () => {
    if (!campaigns || campaigns.length === 0) return;
    const headers = ['Campaign', 'Platform', 'Status', 'Impressions', 'Clicks', 'CTR', 'Conversions', 'Spend', 'ROAS'];
    const rows = campaigns.map((c) => [c.name, c.platform, c.status, c.impressions, c.clicks, c.ctr, c.conversions, c.spend, c.roas]);
    exportToCsv(`campaigns-${dateRange}-${new Date().toISOString().split('T')[0]}.csv`, headers, rows);
  };

  const handleExportMetrics = () => {
    const blob = new Blob([JSON.stringify(metrics, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics-${dateRange}-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Stack spacing={2.5} sx={{ maxWidth: 1920, mx: 'auto', width: '100%' }}>
      {/* Header */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        sx={{ justifyContent: 'space-between', alignItems: { sm: 'center' }, gap: 2 }}
      >
        <Box>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: { xs: '1.5rem', md: '1.75rem' },
              color: text.primary,
              fontFamily: '"DM Sans", sans-serif'
            }}
          >
            Analytics
          </Typography>
          <Typography sx={{ fontSize: '0.85rem', color: text.muted }}>Cross-platform marketing performance</Typography>
        </Box>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <FormControl size="small" sx={{ minWidth: 140 }}>
            <Select
              value={dateRange}
              onChange={(e) => {
                setDateRange(e.target.value);
                setCampaigns(null);
              }}
              startAdornment={<IconCalendar size={14} style={{ marginRight: 6, color: text.muted }} />}
              sx={{
                borderRadius: '12px',
                fontWeight: 600,
                fontSize: '0.85rem',
                color: text.primary,
                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.08)' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.15)' },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: ACCENT, borderWidth: 1 },
                '& .MuiSelect-icon': { color: text.muted }
              }}
            >
              <MenuItem value="7d">Last 7 days</MenuItem>
              <MenuItem value="30d">Last 30 days</MenuItem>
              <MenuItem value="90d">Last 90 days</MenuItem>
            </Select>
          </FormControl>
          <Tooltip title="Refresh">
            <Button
              variant="outlined"
              size="small"
              onClick={loadMetrics}
              sx={{
                borderRadius: '12px',
                minWidth: 40,
                px: 1,
                borderColor: 'rgba(255,255,255,0.08)',
                color: text.secondary,
                '&:hover': { borderColor: 'rgba(255,255,255,0.15)', bgcolor: 'rgba(255,255,255,0.03)' }
              }}
            >
              <IconRefresh size={16} />
            </Button>
          </Tooltip>
          <Button
            variant="outlined"
            size="small"
            startIcon={<IconDownload size={14} />}
            onClick={handleExportMetrics}
            sx={{
              borderRadius: '12px',
              fontWeight: 600,
              fontSize: '0.82rem',
              borderColor: 'rgba(255,255,255,0.08)',
              color: text.secondary,
              textTransform: 'none',
              '&:hover': { borderColor: 'rgba(255,255,255,0.15)', bgcolor: 'rgba(255,255,255,0.03)' }
            }}
          >
            Export
          </Button>
        </Stack>
      </Stack>

      {/* KPI Scorecards */}
      {kpiCards.length > 0 ? (
        <Grid container spacing={2}>
          {kpiCards.map((kpi) => (
            <Grid key={kpi.label} size={{ xs: 6, sm: 4, lg: 2 }}>
              <KpiCard {...kpi} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <GlassCard>
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography sx={{ fontSize: '0.85rem', color: text.muted }}>No KPI data available for this period.</Typography>
          </Box>
        </GlassCard>
      )}

      {/* Performance Trend Chart */}
      {trendData && <TrendChart data={trendData} dateRange={dateRange} />}

      {/* Tabs */}
      <Box>
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          variant={isMobile ? 'scrollable' : 'standard'}
          scrollButtons="auto"
          sx={{
            borderBottom: '1px solid rgba(255,255,255,0.04)',
            '& .MuiTab-root': {
              textTransform: 'none',
              minHeight: 44,
              fontWeight: 500,
              fontSize: '0.88rem',
              color: text.muted
            },
            '& .Mui-selected': { fontWeight: 700, color: `${text.primary} !important` },
            '& .MuiTabs-indicator': { backgroundColor: ACCENT, height: 2 }
          }}
        >
          <Tab label="Platform Breakdown" />
          <Tab label="Campaign Performance" />
          <Tab label="Creative Insights" />
          {audience && <Tab label="Audience" />}
        </Tabs>
      </Box>

      {/* Tab 0: Platform Breakdown */}
      {tab === 0 && (
        <Grid container spacing={2.5}>
          <Grid size={{ xs: 12, lg: 8 }}>
            <GlassCard sx={{ height: '100%' }}>
              <Box sx={{ p: { xs: 2, sm: 3 } }}>
                <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: text.primary, fontFamily: '"DM Sans", sans-serif' }}>
                    Platform Performance
                  </Typography>
                  <Chip
                    label={`${platforms.length} platform${platforms.length !== 1 ? 's' : ''}`}
                    size="small"
                    sx={{
                      height: 24,
                      fontSize: '0.65rem',
                      fontWeight: 600,
                      bgcolor: 'rgba(255,255,255,0.04)',
                      color: text.secondary,
                      border: '1px solid rgba(255,255,255,0.06)'
                    }}
                  />
                </Stack>
                {platforms.length > 0 ? (
                  platforms.map((plat, i) => <PlatformRow key={plat.name || plat.platform || i} plat={plat} maxSpend={maxSpend} />)
                ) : (
                  <EmptyTab
                    icon={IconChartBar}
                    title="No platform data"
                    description="Platform breakdown will appear once your campaigns are running."
                  />
                )}
              </Box>
            </GlassCard>
          </Grid>

          {/* Spend Distribution Sidebar */}
          <Grid size={{ xs: 12, lg: 4 }}>
            <Stack spacing={2.5}>
              {platforms.length > 0 && (
                <GlassCard>
                  <Box sx={{ p: 3 }}>
                    <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', color: text.primary, mb: 2.5, fontFamily: '"DM Sans", sans-serif' }}>
                      Spend Distribution
                    </Typography>
                    <Stack spacing={2}>
                      {platforms.map((plat, i) => {
                        const k = (plat.platform || plat.name || '').toLowerCase();
                        const BrandIcon = PLATFORM_ICON[k] || IconChartBar;
                        const brandColor = PLATFORM_BRAND[k] || ACCENT;
                        const share = plat.share || (maxSpend > 0 ? Math.round(((Number(plat.spend) || 0) / maxSpend) * 100) : 0);
                        return (
                          <Box key={i}>
                            <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', mb: 0.75 }}>
                              <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
                                <Box
                                  sx={{
                                    width: 24,
                                    height: 24,
                                    borderRadius: '6px',
                                    bgcolor: `${brandColor}12`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                  }}
                                >
                                  <BrandIcon size={13} color={brandColor} />
                                </Box>
                                <Typography sx={{ fontWeight: 600, fontSize: '0.82rem', color: text.primary }}>
                                  {plat.name || plat.platform}
                                </Typography>
                              </Stack>
                              <Typography sx={{ fontWeight: 700, fontSize: '0.82rem', color: text.primary }}>
                                {plat.spend ? `$${Number(plat.spend).toLocaleString()}` : '\u2014'}
                              </Typography>
                            </Stack>
                            <Box sx={{ height: 4, borderRadius: 3, bgcolor: 'rgba(255,255,255,0.04)', overflow: 'hidden' }}>
                              <Box
                                sx={{
                                  height: '100%',
                                  width: `${share}%`,
                                  borderRadius: 3,
                                  bgcolor: ACCENT,
                                  opacity: 0.7,
                                  transition: 'width 0.5s ease'
                                }}
                              />
                            </Box>
                          </Box>
                        );
                      })}
                    </Stack>
                  </Box>
                </GlassCard>
              )}

              {kpis.revenue && (
                <GlassCard>
                  <Box sx={{ p: 3, textAlign: 'center' }}>
                    <Typography sx={{ fontSize: '0.78rem', color: text.muted, mb: 1.5 }}>Revenue vs Spend</Typography>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: '2rem',
                        color: text.primary,
                        letterSpacing: '-0.02em',
                        fontFamily: '"DM Sans", sans-serif'
                      }}
                    >
                      ${Number(kpis.revenue).toLocaleString()}
                    </Typography>
                    {kpis.spend && (
                      <Typography sx={{ mt: 0.5, fontSize: '0.78rem', color: text.muted }}>
                        from ${Number(kpis.spend).toLocaleString()} spend
                      </Typography>
                    )}
                    {kpis.roas && (
                      <Box
                        sx={{
                          mt: 2,
                          p: 1.5,
                          borderRadius: '12px',
                          bgcolor: `${ACCENT}08`,
                          border: `1px solid ${ACCENT}15`
                        }}
                      >
                        <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: ACCENT }}>
                          {Number(kpis.roas).toFixed(1)}x ROAS
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </GlassCard>
              )}
            </Stack>
          </Grid>
        </Grid>
      )}

      {/* Tab 1: Campaign Performance */}
      {tab === 1 && (
        <GlassCard>
          <Box sx={{ p: { xs: 1.5, sm: 3 } }}>
            <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 2.5 }}>
              <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: text.primary, fontFamily: '"DM Sans", sans-serif' }}>
                Campaign Performance
              </Typography>
              <Stack direction="row" spacing={1}>
                {campaigns && campaigns.length > 0 && (
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<IconDownload size={14} />}
                    onClick={handleExportCampaigns}
                    sx={{
                      borderRadius: '12px',
                      borderColor: 'rgba(255,255,255,0.08)',
                      textTransform: 'none',
                      fontWeight: 600,
                      fontSize: '0.75rem',
                      color: text.secondary,
                      '&:hover': { borderColor: 'rgba(255,255,255,0.15)', bgcolor: 'rgba(255,255,255,0.03)' }
                    }}
                  >
                    Export CSV
                  </Button>
                )}
                {campaigns && (
                  <Chip
                    label={`${campaigns.length} campaign${campaigns.length !== 1 ? 's' : ''}`}
                    size="small"
                    sx={{
                      height: 24,
                      fontSize: '0.65rem',
                      fontWeight: 600,
                      bgcolor: 'rgba(255,255,255,0.04)',
                      color: text.secondary,
                      border: '1px solid rgba(255,255,255,0.06)'
                    }}
                  />
                )}
              </Stack>
            </Stack>
            {campaigns && campaigns.length > 0 ? (
              <SortableCampaignTable campaigns={campaigns} isMobile={isMobile} />
            ) : (
              <EmptyTab
                icon={IconChartBar}
                title={campaigns === null ? 'Loading campaigns...' : 'No campaigns found'}
                description={campaigns === null ? 'Fetching your campaign data...' : 'Campaign data will appear once you have active campaigns.'}
              />
            )}
            {campaigns === null && (
              <LinearProgress
                sx={{
                  mt: 1,
                  borderRadius: 2,
                  bgcolor: 'rgba(255,255,255,0.03)',
                  '& .MuiLinearProgress-bar': { bgcolor: ACCENT, opacity: 0.6 }
                }}
              />
            )}
          </Box>
        </GlassCard>
      )}

      {/* Tab 2: Creative Insights */}
      {tab === 2 && (
        <GlassCard>
          <Box sx={{ p: { xs: 2, sm: 3 } }}>
            <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
              <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: text.primary, fontFamily: '"DM Sans", sans-serif' }}>
                Creative Performance
              </Typography>
              {creatives.length > 0 && (
                <Chip
                  label={`${creatives.length} creative${creatives.length !== 1 ? 's' : ''}`}
                  size="small"
                  sx={{
                    height: 24,
                    fontSize: '0.65rem',
                    fontWeight: 600,
                    bgcolor: 'rgba(255,255,255,0.04)',
                    color: text.secondary,
                    border: '1px solid rgba(255,255,255,0.06)'
                  }}
                />
              )}
            </Stack>
            <Typography sx={{ fontSize: '0.82rem', color: text.secondary, mb: 3 }}>
              Performance breakdown by creative type and format
            </Typography>
            {creatives.length > 0 ? (
              <TableContainer>
                <Table
                  size="small"
                  sx={{
                    '& th': {
                      fontWeight: 700,
                      fontSize: '0.68rem',
                      textTransform: 'uppercase',
                      letterSpacing: 0.5,
                      color: text.muted,
                      borderBottomColor: 'rgba(255,255,255,0.04)'
                    },
                    '& td': {
                      borderBottomColor: 'rgba(255,255,255,0.03)',
                      color: text.primary
                    }
                  }}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>Creative</TableCell>
                      <TableCell>Format</TableCell>
                      {!isMobile && <TableCell align="right">Impressions</TableCell>}
                      <TableCell align="right">CTR</TableCell>
                      <TableCell align="right">ROAS</TableCell>
                      {!isMobile && <TableCell align="right">Fatigue</TableCell>}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {creatives.map((c, i) => (
                      <CreativeRow key={c.id || c.name || i} c={c} isMobile={isMobile} />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <EmptyTab
                icon={IconPhoto}
                title="No creative data"
                description="Creative insights will appear once your campaigns have active creatives."
              />
            )}
          </Box>
        </GlassCard>
      )}

      {/* Tab 3: Audience */}
      {tab === 3 && audience && (
        <Grid container spacing={2.5}>
          {audience.demographics && (
            <Grid size={{ xs: 12, md: 6 }}>
              <GlassCard sx={{ height: '100%' }}>
                <Box sx={{ p: 3 }}>
                  <Stack direction="row" sx={{ alignItems: 'center', gap: 1, mb: 2.5 }}>
                    <IconUsers size={18} style={{ color: text.secondary }} />
                    <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: text.primary, fontFamily: '"DM Sans", sans-serif' }}>
                      Demographics
                    </Typography>
                  </Stack>
                  <Stack spacing={2}>
                    {(audience.demographics.age || audience.demographics).map((d, i) => (
                      <Box key={i}>
                        <Stack direction="row" sx={{ justifyContent: 'space-between', mb: 0.5 }}>
                          <Typography sx={{ fontWeight: 600, fontSize: '0.85rem', color: text.primary }}>
                            {d.label || d.range || d.name}
                          </Typography>
                          <Typography sx={{ fontWeight: 700, fontSize: '0.85rem', color: text.primary }}>
                            {d.percent || d.share || d.value}%
                          </Typography>
                        </Stack>
                        <Box sx={{ height: 4, borderRadius: 3, bgcolor: 'rgba(255,255,255,0.04)', overflow: 'hidden' }}>
                          <Box
                            sx={{
                              height: '100%',
                              width: `${d.percent || d.share || d.value}%`,
                              borderRadius: 3,
                              bgcolor: ACCENT,
                              opacity: 0.7
                            }}
                          />
                        </Box>
                      </Box>
                    ))}
                  </Stack>
                </Box>
              </GlassCard>
            </Grid>
          )}

          {audience.geography && (
            <Grid size={{ xs: 12, md: 6 }}>
              <GlassCard sx={{ height: '100%' }}>
                <Box sx={{ p: 3 }}>
                  <Stack direction="row" sx={{ alignItems: 'center', gap: 1, mb: 2.5 }}>
                    <IconWorld size={18} style={{ color: text.secondary }} />
                    <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: text.primary, fontFamily: '"DM Sans", sans-serif' }}>
                      Top Locations
                    </Typography>
                  </Stack>
                  <Stack spacing={1.5}>
                    {audience.geography.map((g, i) => (
                      <Stack
                        key={i}
                        direction="row"
                        sx={{
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          py: 1,
                          borderBottom: '1px solid rgba(255,255,255,0.03)'
                        }}
                      >
                        <Typography sx={{ fontWeight: 600, fontSize: '0.85rem', color: text.primary }}>
                          {g.country || g.city || g.name}
                        </Typography>
                        <Stack direction="row" spacing={2}>
                          {g.impressions && (
                            <Typography sx={{ fontSize: '0.75rem', color: text.muted }}>
                              {Number(g.impressions).toLocaleString()} imp
                            </Typography>
                          )}
                          <Typography sx={{ fontWeight: 700, fontSize: '0.85rem', color: text.primary }}>
                            {g.percent || g.share}%
                          </Typography>
                        </Stack>
                      </Stack>
                    ))}
                  </Stack>
                </Box>
              </GlassCard>
            </Grid>
          )}

          {audience.devices && (
            <Grid size={{ xs: 12, md: 6 }}>
              <GlassCard>
                <Box sx={{ p: 3 }}>
                  <Typography
                    sx={{ fontWeight: 700, fontSize: '1rem', color: text.primary, mb: 2.5, fontFamily: '"DM Sans", sans-serif' }}
                  >
                    Device Breakdown
                  </Typography>
                  <Stack spacing={2}>
                    {audience.devices.map((d, i) => {
                      const DevIcon = d.name?.toLowerCase().includes('mobile')
                        ? IconDeviceMobile
                        : d.name?.toLowerCase().includes('tablet')
                          ? IconDeviceTablet
                          : IconDeviceDesktop;
                      return (
                        <Stack key={i} direction="row" sx={{ alignItems: 'center', gap: 2 }}>
                          <Box
                            sx={{
                              width: 36,
                              height: 36,
                              borderRadius: '10px',
                              bgcolor: 'rgba(255,255,255,0.04)',
                              border: '1px solid rgba(255,255,255,0.06)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <DevIcon size={18} style={{ color: text.secondary }} />
                          </Box>
                          <Box sx={{ flex: 1 }}>
                            <Stack direction="row" sx={{ justifyContent: 'space-between', mb: 0.5 }}>
                              <Typography sx={{ fontWeight: 600, fontSize: '0.85rem', color: text.primary }}>{d.name}</Typography>
                              <Typography sx={{ fontWeight: 700, fontSize: '0.85rem', color: text.primary }}>
                                {d.percent || d.share}%
                              </Typography>
                            </Stack>
                            <Box sx={{ height: 4, borderRadius: 3, bgcolor: 'rgba(255,255,255,0.04)', overflow: 'hidden' }}>
                              <Box
                                sx={{
                                  height: '100%',
                                  width: `${d.percent || d.share}%`,
                                  borderRadius: 3,
                                  bgcolor: ACCENT,
                                  opacity: 0.7
                                }}
                              />
                            </Box>
                          </Box>
                        </Stack>
                      );
                    })}
                  </Stack>
                </Box>
              </GlassCard>
            </Grid>
          )}
        </Grid>
      )}
    </Stack>
  );
}
