import { useNavigate } from 'react-router-dom';

// @mui
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

// @assets
import { IconRocket, IconSettings, IconTrendingUp, IconArrowRight } from '@tabler/icons-react';

/***************************  GLASS TOKENS (same as Meta Audit)  ***************************/

const glass = {
  bg: 'rgba(30, 30, 35, 0.65)',
  border: '1px solid rgba(255,255,255,0.06)',
  blur: 'blur(40px)',
  shadow: 'inset 2px 4px 16px 0px rgba(248,248,248,0.03)',
  radius: '24px',
  hoverBorder: 'rgba(255,255,255,0.12)',
};

/***************************  WORKFLOW CARD  ***************************/

function WorkflowCard({ name, description, iconImage, status, statusColor, statusLabel, slug, large }) {
  const navigate = useNavigate();

  return (
    <Box
      onClick={() => navigate(`/tools/${slug}`)}
      sx={{
        height: '100%',
        background: glass.bg,
        backdropFilter: glass.blur,
        WebkitBackdropFilter: glass.blur,
        border: glass.border,
        boxShadow: glass.shadow,
        borderRadius: glass.radius,
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'border-color 0.25s ease, transform 0.25s ease',
        '&:hover': {
          borderColor: glass.hoverBorder,
          transform: 'translateY(-2px)'
        }
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', p: large ? 3 : 2.5 }}>
        <Box sx={{ width: large ? 52 : 44, height: large ? 52 : 44, mb: 2 }}>
          <img
            src={iconImage}
            alt={name}
            width={large ? 52 : 44}
            height={large ? 52 : 44}
            style={{ objectFit: 'contain' }}
          />
        </Box>

        <Typography variant={large ? 'h6' : 'subtitle1'} sx={{ fontWeight: 600, mb: 1 }}>
          {name}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flex: 1 }}>
          {description}
        </Typography>

        {status && (
          <Stack direction="row" sx={{ alignItems: 'center', gap: 0.75, mb: 1.5 }}>
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: statusColor || 'success.main' }} />
            <Typography variant="caption" color="text.secondary">
              {statusLabel}
            </Typography>
          </Stack>
        )}

        <Typography variant="body2" color="primary.main" sx={{ fontWeight: 500, display: 'flex', alignItems: 'center', gap: 0.5 }}>
          Run workflow <IconArrowRight size={14} />
        </Typography>
      </Box>
    </Box>
  );
}

/***************************  COMMAND CENTRE  ***************************/

export default function CommandCentrePage() {
  return (
    <Stack sx={{ gap: { xs: 4, md: 5 } }}>
      {/* ── LAUNCH ── */}
      <Box>
        <Stack direction="row" sx={{ alignItems: 'center', gap: 1.5, mb: 0.5 }}>
          <IconRocket size={20} />
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Launch
          </Typography>
        </Stack>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Build and launch new campaigns
        </Typography>

        <Grid container spacing={2.5}>
          <Grid size={{ xs: 12, md: 6 }}>
            <WorkflowCard
              large
              name="Google Search Ads"
              description="Launch high-converting Google Search campaigns with AI-optimised headlines, descriptions & keyword groups"
              iconImage="/images/icons/marketing-strategy-3d.png"
              status
              statusColor="error.main"
              statusLabel="Google Ads (not connected)"
              slug="google-ads-performance-grader"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <WorkflowCard
              large
              name="Meta Campaign"
              description="Create full Facebook & Instagram campaigns — ad sets, audiences, creatives & budget allocation"
              iconImage="/images/icons/facebook-3d.png"
              status
              statusColor="success.main"
              statusLabel="Meta Ads"
              slug="facebook-ads-manager"
            />
          </Grid>
        </Grid>
      </Box>

      {/* ── OPTIMISE ── */}
      <Box>
        <Stack direction="row" sx={{ alignItems: 'center', gap: 1.5, mb: 0.5 }}>
          <IconSettings size={20} />
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Optimise
          </Typography>
        </Stack>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Improve what&apos;s already running
        </Typography>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <WorkflowCard
              name="A/B Test Generator"
              description="Generate statistically sound A/B test variations for headlines, images, audiences & landing pages"
              iconImage="/images/icons/ab-testing-3d.png"
              slug="campaign-ab-test-manager"
              status
              statusColor="success.main"
              statusLabel="Ad Account"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <WorkflowCard
              name="Bid Optimisation"
              description="AI analyses your campaign data to recommend optimal bidding strategies and budget allocation"
              iconImage="/images/icons/data-analytic-3d.png"
              slug="bid-optimization-engine"
              status
              statusColor="success.main"
              statusLabel="Ad Account"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <WorkflowCard
              name="Creative Refresh"
              description="Detect ad fatigue and generate fresh creative variations while preserving what's working"
              iconImage="/images/icons/copywriting-3d.png"
              slug="creative-refresh-agent"
              status
              statusColor="success.main"
              statusLabel="Ad Account"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <WorkflowCard
              name="Audience Expansion"
              description="Discover new high-value audience segments based on your best performers and market data"
              iconImage="/images/icons/social-media-engagement-3d.png"
              slug="audience-optimization-tool"
              status
              statusColor="success.main"
              statusLabel="Ad Account"
            />
          </Grid>
        </Grid>
      </Box>

      {/* ── SCALE ── */}
      <Box>
        <Stack direction="row" sx={{ alignItems: 'center', gap: 1.5, mb: 0.5 }}>
          <IconTrendingUp size={20} />
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Scale
          </Typography>
        </Stack>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Grow your best performers
        </Typography>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <WorkflowCard
              name="Scale Winners"
              description="Identify your top-performing campaigns and get an AI scaling plan with budget & targeting adjustments"
              iconImage="/images/icons/promotion-3d.png"
              slug="campaign-scaling-assistant"
              status
              statusColor="success.main"
              statusLabel="Ad Account"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <WorkflowCard
              name="Kill Underperformers"
              description="Automatically identify and pause wasted spend — ads, keywords & audiences bleeding your budget"
              iconImage="/images/icons/optimization-3d.png"
              slug="campaign-health-monitor"
              status
              statusColor="success.main"
              statusLabel="Ad Account"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <WorkflowCard
              name="Retargeting Setup"
              description="Build multi-touchpoint retargeting funnels across platforms with optimal frequency caps"
              iconImage="/images/icons/backlink-3d.png"
              slug="cart-recovery-ads"
              status
              statusColor="success.main"
              statusLabel="Ad Account"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <WorkflowCard
              name="Cross-Platform Report"
              description="Unified performance report across Google, Meta & Instagram with AI insights and recommendations"
              iconImage="/images/icons/data-analytic-3d.png"
              slug="multi-channel-attribution"
              status
              statusColor="success.main"
              statusLabel="Ad Account"
            />
          </Grid>
        </Grid>
      </Box>
    </Stack>
  );
}
