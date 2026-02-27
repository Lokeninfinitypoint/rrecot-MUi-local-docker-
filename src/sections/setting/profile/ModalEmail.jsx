import PropTypes from 'prop-types';
import { useEffect, useState, useTransition } from 'react';

// @mui
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';

// @third-party
import { enqueueSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';

// @project
import Modal from '@/components/Modal';
import { ModalSize } from '@/enum';
import { emailSchema } from '@/utils/validation-schema/common';

// @assets
import { IconMail } from '@tabler/icons-react';

const initialData = {
  email: ''
};

/***************************   MODAL - EMAIL  ***************************/

export default function ModalEmail({ email }) {
  const [open, setOpen] = useState(false);
  const [isProcessing, startTransition] = useTransition();

  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty }
  } = useForm({ defaultValues: initialData });

  const onSubmit = (data) => {
    if (!isDirty) return;
    console.log(data);

    startTransition(async () => {
      // Replace the below timeout with your actual API call to update email
      // Example: await updateEmail(data);
      await new Promise((resolve) => setTimeout(() => resolve('ok'), 3000));
      enqueueSnackbar(`Email has been ${email ? 'updated' : 'added'}.`, { variant: 'success' });
      setOpen(false);
    });
  };

  useEffect(() => {
    if (open) {
      const formInitData = email ? { email: email } : initialData;
      reset(formInitData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, email]);

  return (
    <>
      <Button onClick={() => setOpen(true)}>{email ? 'Update' : 'Add'}</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        maxWidth={ModalSize.MD}
        header={{ title: 'Email Address', subheader: `${email ? 'Update' : 'Add'} your email address to keep your account up to date.` }}
        modalContent={
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <InputLabel>Email</InputLabel>
            <OutlinedInput
              fullWidth
              startAdornment={
                <InputAdornment position="start">
                  <IconMail />
                </InputAdornment>
              }
              error={errors.email && Boolean(errors.email)}
              {...register('email', emailSchema)}
              aria-describedby="outlined-email"
              slotProps={{ input: { 'aria-label': 'email' } }}
            />
            {errors.email?.message && <FormHelperText error>{errors.email?.message}</FormHelperText>}
          </form>
        }
        footer={
          <Stack direction="row" sx={{ width: 1, justifyContent: 'space-between', gap: 2 }}>
            <Button variant="outlined" color="secondary" onClick={() => setOpen(false)} disabled={isProcessing}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              onClick={handleSubmit(onSubmit)}
              disabled={!isDirty}
              {...(isProcessing && { loading: true, loadingPosition: 'end' })}
            >
              {email ? 'Update' : 'Add'} Email
            </Button>
          </Stack>
        }
      />
    </>
  );
}

ModalEmail.propTypes = { email: PropTypes.string };
