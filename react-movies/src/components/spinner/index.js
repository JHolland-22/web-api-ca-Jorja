import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

export default function CircularIndeterminate() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: "center",
      '& > * + *': {
        marginLeft: '2em',
      }
    }}>
      <CircularProgress />
      <CircularProgress />
    </div>
  );
}