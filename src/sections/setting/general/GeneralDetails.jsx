import PropTypes from 'prop-types';
import { useState } from 'react';

// @mui
import { useTheme } from '@mui/material/styles';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// @project
import SettingCard from '@/components/cards/SettingCard';

// @assets
import { IconDotsVertical } from '@tabler/icons-react';

/***************************   GENERAL - LANGUAGE  ***************************/

function SettingsLanguage({ selectedTags = 'English', setSelectedTags, isDisabled = false }) {
  const [language, setLanguage] = useState(selectedTags);
  const languageList = ['English', 'Spanish', 'German'];

  return (
    <Box sx={{ width: 1 }}>
      <InputLabel>Language</InputLabel>
      <Autocomplete
        options={languageList}
        value={language}
        onChange={(_event, newValue) => {
          if (typeof newValue === 'string') {
            setLanguage(newValue);
            if (setSelectedTags) setSelectedTags(newValue);
          }
        }}
        disabled={isDisabled}
        disableClearable
        renderOption={({ key: optionKey, ...optionProps }, option) => (
          <li key={optionKey} {...optionProps}>
            {option}
          </li>
        )}
        renderInput={(params) => <TextField {...params} slotProps={{ htmlInput: { ...params.inputProps, 'aria-label': 'language' } }} />}
        sx={{ width: 1 }}
      />
      <FormHelperText>
        This is the language you will see across your MarketingTool dashboard.
      </FormHelperText>
    </Box>
  );
}

/***************************   GENERAL - TIMEZONE  ***************************/

function SettingsTimezone({ selectedTags, setSelectedTags, isDisabled = false }) {
  const [timezone, setTimeZone] = useState(selectedTags || '(GMT+05:30) Chennai,Kolkata, Mumbai, New Delhi');

  const TimeList = [
    '(GMT+05:30) Chennai,Kolkata, Mumbai, New Delhi',
    '(GMT-05:00) Eastern Time (US & Canada) - New York, Washington, D.C.',
    '(GMT-06:00) Central Time (US & Canada) - Chicago, Dallas'
  ];

  return (
    <Box sx={{ width: 1 }}>
      <InputLabel>Timezone</InputLabel>
      <Autocomplete
        options={TimeList}
        value={timezone}
        onChange={(_event, newValue) => {
          if (typeof newValue === 'string') {
            setTimeZone(newValue);
            if (setSelectedTags) setSelectedTags(newValue);
          }
        }}
        disabled={isDisabled}
        disableClearable
        renderOption={({ key: optionKey, ...optionProps }, option) => (
          <li key={optionKey} {...optionProps}>
            {option}
          </li>
        )}
        renderInput={(params) => <TextField {...params} slotProps={{ htmlInput: { ...params.inputProps, 'aria-label': 'timezone' } }} />}
        sx={{ width: 1 }}
      />
      <FormHelperText>
        This is the timezone for your account. All scheduled reports and notifications use this timezone.
      </FormHelperText>
    </Box>
  );
}

/***************************   GENERAL - DETAILS  ***************************/

export default function GeneralDetails() {
  const theme = useTheme();
  const listStyle = { p: { xs: 2, sm: 3 }, flexWrap: 'wrap', gap: 1 };
  const commonProps = {
    label: 'Indian Rupee (INR ₹)',
    variant: 'outlined',
    size: 'small'
  };

  return (
    <SettingCard title="Details" caption="Manage your currency, language and timezone.">
      <List disablePadding>
        <ListItem sx={listStyle} divider>
          <Stack direction="row" sx={{ justifyContent: 'space-between', width: 1, alignItems: 'center' }}>
            <Stack sx={{ gap: 1 }}>
              <Typography variant="body2" sx={{ color: 'text.disabled' }}>
                Currency display
              </Typography>
              <Typography variant="body2">
                Currency used for billing and pricing display
              </Typography>
            </Stack>
            <Stack direction="row" sx={{ gap: 0.75, alignItems: 'center' }}>
              <Chip {...commonProps} sx={{ color: 'text.disabled' }} />
              <IconButton color="secondary" aria-label="view more">
                <IconDotsVertical size={20} color={theme.vars.palette.text.secondary} />
              </IconButton>
            </Stack>
          </Stack>
        </ListItem>
        <ListItem sx={listStyle} divider>
          <SettingsLanguage />
        </ListItem>
        <ListItem sx={listStyle} divider>
          <SettingsTimezone />
        </ListItem>
        <ListItem sx={{ bgcolor: 'grey.100' }} divider>
          <Stack direction="row" sx={{ width: 1, alignItems: 'center', py: 1 }}>
            <Typography variant="body2">
              These settings apply to your MarketingTool account across all devices.
            </Typography>
          </Stack>
        </ListItem>
      </List>
    </SettingCard>
  );
}

SettingsLanguage.propTypes = { selectedTags: PropTypes.string, setSelectedTags: PropTypes.func, isDisabled: PropTypes.bool };

SettingsTimezone.propTypes = { selectedTags: PropTypes.string, setSelectedTags: PropTypes.func, isDisabled: PropTypes.bool };
