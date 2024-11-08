"use client
import React from 'react';
import { Button } from '@mui/material';
import ArrowBackIos from '@mui/icons-material/ArrowBackIos';
import { useRouter } from 'next/navigation';

export default function BackButton({ returnUrl }) {
    const router = useRouter();

    const handleBack = () => {
        router.push(returnUrl);
    };

    return (
        <Button
            variant="contained"
            color="primary"
            startIcon={<ArrowBackIos />}
            onClick={handleBack}
        >
            Back
        </Button>
    );
}
