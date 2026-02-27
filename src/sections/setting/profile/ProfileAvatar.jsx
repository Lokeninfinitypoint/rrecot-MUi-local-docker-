import PropTypes from 'prop-types';
import { useEffect, useTransition } from 'react';

// @mui
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

// @third-party
import { enqueueSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';

// @project
import AvatarUpload from '@/components/third-party/dropzone/AvatarUpload';

const initialData = {
  avatar: ''
};

/***************************  PROFILE - AVATAR  ***************************/

export default function ProfileAvatar({ avatar }) {
  const [isProcessing, startTransition] = useTransition();

  const {
    handleSubmit,
    control,
    reset,
    formState: { isDirty, dirtyFields, defaultValues }
  } = useForm({ defaultValues: initialData });

  const onSubmit = ({ avatar }) => {
    const formData = new FormData();

    formData.append('avatar', avatar);

    startTransition(async () => {
      // Replace the below timeout with your actual API call to upload the avatar
      // Example: await uploadAvatarAPI(formData);
      await new Promise((resolve) => setTimeout(() => resolve('ok'), 3000));
      enqueueSnackbar(`Profile photo has been saved.`, { variant: 'success' });
    });
  };

  useEffect(() => {
    const formInitData = avatar ? { avatar: avatar } : initialData;
    reset(formInitData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [avatar]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="row" sx={{ width: 1, gap: 2, alignItems: 'start', justifyContent: 'space-between' }}>
        <AvatarUpload control={control} showDiscardAction={!!dirtyFields.avatar} initialAvatar={defaultValues?.avatar} />
        <Button
          variant="outlined"
          color="secondary"
          size="small"
          type="submit"
          disabled={!isDirty}
          {...(isProcessing && { loading: true, loadingPosition: 'end' })}
        >
          Save Photo
        </Button>
      </Stack>
    </form>
  );
}

ProfileAvatar.propTypes = { avatar: PropTypes.string };
