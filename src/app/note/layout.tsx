'use client';

import { Container } from '@mui/material';
import React, { Suspense } from 'react';

const NoteLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Container maxWidth="xl">
            <Suspense>{children}</Suspense>
        </Container>
    );
};

export default NoteLayout;
