import { useState } from 'react';

// @mui
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { alpha, useTheme } from '@mui/material/styles';

// @assets
import { IconCheck, IconX, IconCrown, IconSparkles, IconBolt } from '@tabler/icons-react';

// @project
import PageAnimateWrapper from '@/components/PageAnimateWrapper';

const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    price: 49,
    yearlyPrice: 17,
    yearlyTotal: 199,
    yearlySaving: 389,
    description: 'For solo marketers getting started',
    features: [
      { text: '1 category (~20 tools)', included: true },
      { text: '200 generations/month', included: true },
      { text: 'Single platform choice', included: true },
      { text: 'Basic templates', included: true },
      { text: 'Email support', included: true },
      { text: 'Multi-platform access', included: false },
      { text: 'Team collaboration', included: false },
      { text: 'API access', included: false }
    ],
    highlighted: false,
    cta: 'Get Started'
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 99,
    yearlyPrice: 42,
    yearlyTotal: 499,
    yearlySaving: 689,
    description: 'For growing marketing teams',
    features: [
      { text: '1 full platform (56-77 tools)', included: true },
      { text: '500 generations/month', included: true },
      { text: 'All platform tools', included: true },
      { text: 'All templates + custom', included: true },
      { text: 'Priority support', included: true },
      { text: 'Advanced analytics', included: true },
      { text: 'Team collaboration', included: false },
      { text: 'API access', included: false }
    ],
    highlighted: false,
    cta: 'Upgrade Now'
  },
  {
    id: 'all-tools',
    name: 'All Tools',
    price: 150,
    yearlyPrice: 83,
    yearlyTotal: 999,
    yearlySaving: 801,
    description: 'Full access to every tool and feature',
    features: [
      { text: 'All 3 platforms (206+ tools)', included: true },
      { text: '1,500 generations/month', included: true },
      { text: 'Google Ads (56 tools)', included: true },
      { text: 'Facebook/Meta (61 tools)', included: true },
      { text: 'Website/Shopify (77 tools)', included: true },
      { text: 'Full analytics & reporting', included: true },
      { text: 'Team collaboration', included: true },
      { text: 'API access', included: true }
    ],
    highlighted: true,
    cta: 'Get All Tools'
  }
];

/***************************  PRICING  ***************************/

export default function PricingPage() {
  const [billing, setBilling] = useState('monthly');
  const theme = useTheme();
  const yearly = billing === 'yearly';

  return (
    <PageAnimateWrapper>
      <Stack spacing={5} sx={{ maxWidth: 1100, mx: 'auto' }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center' }}>
          <Chip
            icon={<IconSparkles size={14} />}
            label="Start Free for 7 Days"
            size="small"
            color="primary"
            variant="outlined"
            sx={{ mb: 2, fontWeight: 600 }}
          />
          <Typography variant="h3" sx={{ mb: 1, fontWeight: 700 }}>
            Plans & Pricing
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 480, mx: 'auto' }}>
            Full access to all 206+ AI marketing tools. No credit card required for free trial.
          </Typography>

          {/* Monthly / Yearly Toggle */}
          <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'center', gap: 1.5 }}>
            <ToggleButtonGroup
              value={billing}
              exclusive
              onChange={(e, val) => val && setBilling(val)}
              size="small"
              sx={{
                bgcolor: alpha(theme.palette.primary.main, 0.08),
                borderRadius: 3,
                p: 0.5,
                '& .MuiToggleButton-root': {
                  border: 'none',
                  borderRadius: '10px !important',
                  px: 3,
                  py: 0.75,
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  textTransform: 'none',
                  '&.Mui-selected': {
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                    '&:hover': { bgcolor: 'primary.dark' }
                  }
                }
              }}
            >
              <ToggleButton value="monthly">Monthly</ToggleButton>
              <ToggleButton value="yearly">Yearly</ToggleButton>
            </ToggleButtonGroup>
            {yearly && (
              <Chip
                label="Save up to $801/yr"
                size="small"
                color="success"
                sx={{ fontWeight: 600, animation: 'fadeIn 0.3s ease' }}
              />
            )}
          </Stack>
        </Box>

        {/* Plan Cards */}
        <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
          {PLANS.map((plan) => {
            const isPopular = plan.highlighted;
            return (
              <Grid key={plan.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <Card
                  sx={{
                    height: '100%',
                    border: isPopular ? 2 : 1,
                    borderColor: isPopular ? 'primary.main' : 'divider',
                    borderRadius: 3,
                    position: 'relative',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: theme.shadows[8]
                    }
                  }}
                >
                  {isPopular && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: -14,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 1
                      }}
                    >
                      <Chip
                        icon={<IconCrown size={14} />}
                        label="Most Popular"
                        size="small"
                        color="primary"
                        sx={{ fontWeight: 700, px: 1 }}
                      />
                    </Box>
                  )}

                  <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%', p: 3, pt: isPopular ? 4 : 3 }}>
                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
                      {plan.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                      {plan.description}
                    </Typography>

                    {/* Price */}
                    <Stack direction="row" sx={{ alignItems: 'baseline', mb: 0.5 }}>
                      <Typography variant="h2" sx={{ fontWeight: 800, lineHeight: 1 }}>
                        ${yearly ? plan.yearlyPrice : plan.price}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                        /month
                      </Typography>
                    </Stack>

                    {yearly ? (
                      <Typography variant="caption" color="success.main" sx={{ fontWeight: 600, mb: 2 }}>
                        Save ${plan.yearlySaving}/year vs monthly
                      </Typography>
                    ) : (
                      <Typography variant="caption" color="text.secondary" sx={{ mb: 2 }}>
                        Billed monthly
                      </Typography>
                    )}

                    <Divider sx={{ mb: 2.5 }} />

                    {/* Features */}
                    <Stack spacing={1.5} sx={{ flex: 1, mb: 3 }}>
                      {plan.features.map((feature, i) => (
                        <Stack key={i} direction="row" sx={{ alignItems: 'center', gap: 1 }}>
                          {feature.included ? (
                            <IconCheck size={18} color={theme.palette.success.main} stroke={2.5} />
                          ) : (
                            <IconX size={18} style={{ opacity: 0.25 }} />
                          )}
                          <Typography variant="body2" sx={{ opacity: feature.included ? 1 : 0.45 }}>
                            {feature.text}
                          </Typography>
                        </Stack>
                      ))}
                    </Stack>

                    <Button
                      variant={isPopular ? 'contained' : 'outlined'}
                      fullWidth
                      size="large"
                      sx={{ borderRadius: 2, fontWeight: 600, py: 1.2 }}
                    >
                      {plan.cta}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        {/* Extra Tokens */}
        <Card sx={{ borderRadius: 3, border: 1, borderColor: 'divider' }}>
          <CardContent sx={{ textAlign: 'center', py: 3 }}>
            <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'center', gap: 1, mb: 1 }}>
              <IconBolt size={20} color={theme.palette.warning.main} />
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Need More Generations?
              </Typography>
            </Stack>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Top up anytime — $3 = 100 extra generations. No expiry.
            </Typography>
            <Button variant="outlined" size="small" sx={{ borderRadius: 2 }}>
              Buy Extra Credits
            </Button>
          </CardContent>
        </Card>

        {/* Agency */}
        <Card
          sx={{
            borderRadius: 3,
            border: 1,
            borderColor: 'divider',
            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.04)}, ${alpha(theme.palette.secondary.main, 0.06)})`
          }}
        >
          <CardContent sx={{ textAlign: 'center', py: 5 }}>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
              Agency Plan
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 500, mx: 'auto' }}>
              White-label solution for agencies managing 10+ client accounts. Unlimited generations, dedicated account manager, custom integrations.
            </Typography>
            <Button variant="contained" size="large" sx={{ borderRadius: 2, px: 4 }}>
              Contact Sales
            </Button>
          </CardContent>
        </Card>

        {/* Platform Breakdown */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
            What's Included in Each Platform
          </Typography>
          <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
            {[
              { name: 'Google Ads', tools: 56, color: '#4285F4' },
              { name: 'Facebook / Meta', tools: 61, color: '#1877F2' },
              { name: 'Website / Shopify', tools: 77, color: '#96BF48' }
            ].map((platform) => (
              <Grid key={platform.name} size={{ xs: 12, sm: 4 }}>
                <Card sx={{ borderRadius: 3, border: 1, borderColor: 'divider' }}>
                  <CardContent sx={{ textAlign: 'center', py: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                      {platform.name}
                    </Typography>
                    <Typography variant="h3" sx={{ fontWeight: 800, color: platform.color }}>
                      {platform.tools}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      AI tools
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Stack>
    </PageAnimateWrapper>
  );
}
