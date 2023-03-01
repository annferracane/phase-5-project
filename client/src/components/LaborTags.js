import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

function LaborTags({ laborTags, deleteLaborTag }) {

    const handleDelete = (laborTag) => {
        deleteLaborTag(laborTag);
    };

    let laborTagArray;
    { deleteLaborTag ? laborTagArray = laborTags.map(laborTag => <Chip key={laborTag.name} label={laborTag.name} color="primary" variant="outlined" onDelete={() => handleDelete(laborTag)} />) : laborTagArray = laborTags.map(laborTag => <Chip key={laborTag.name} label={laborTag.name} color="primary" variant="filled" />) }


    return (
        <Stack direction="row" spacing={1}>
            { laborTagArray }
        </Stack>
    );
};

export default LaborTags;