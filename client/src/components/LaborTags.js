import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

function LaborTags({ laborTags, deleteLaborTag }) {

    const handleDelete = (laborTag) => {
        deleteLaborTag(laborTag);
    };

    const laborTagArray = laborTags.map(laborTag => {
        return deleteLaborTag ? <Chip key={laborTag.name} label={laborTag.name} color="primary" variant="outlined" onDelete={() => handleDelete(laborTag)} /> : <Chip key={laborTag.name} label={laborTag.name} color="primary" variant="outlined" onDelete={() => handleDelete(laborTag)} />
    })
    

    return (
        <Stack direction="row" spacing={1}>
            { laborTagArray }
        </Stack>
    );
};

export default LaborTags;