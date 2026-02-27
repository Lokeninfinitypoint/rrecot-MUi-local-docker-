import PropTypes from 'prop-types';
import { useState } from 'react';

// @mui
import Autocomplete from '@mui/material/Autocomplete';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

// @third-party
import { enqueueSnackbar } from 'notistack';

// @project
import SettingCard from '@/components/cards/SettingCard';

const languageList = ['English', 'Spanish', 'German'];

/***************************   PROFILE - PREFERRED LANGUAGE  ***************************/

export default function SettingLanguageCard({ selectedTags = 'English', setSelectedTags, isDisabled = false }) {
  const [value, setValue] = useState(selectedTags);

  return (
    <SettingCard title="Preferred language" caption="Manage your preferred language.">
      <Box sx={{ p: { xs: 2, sm: 3 } }}>
        <InputLabel>Language</InputLabel>
        <Autocomplete
          options={languageList}
          value={value}
          onChange={(_event, newValue) => {
            if (typeof newValue === 'string') {
              setValue(newValue);
              if (setSelectedTags) setSelectedTags(newValue);
              enqueueSnackbar(`Your preferred language has been updated to ${newValue}.`, { variant: 'success' });
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
          This is the language you will see. It doesn&apos;t affect the language your customers see on your online store.
        </FormHelperText>
      </Box>
    </SettingCard>
  );
}

SettingLanguageCard.propTypes = { selectedTags: PropTypes.string, setSelectedTags: PropTypes.func, isDisabled: PropTypes.bool };
