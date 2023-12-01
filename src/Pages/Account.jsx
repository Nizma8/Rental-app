import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function Account() {
  const [expandedPanel, setExpandedPanel] = useState(null);

  const handleToggle = (id) => {
    setExpandedPanel((prevPanel) => (prevPanel === id ? null : id));
  };

  let haha = [
    { id: 1, title: 'hhf', price: 'hhf-price' },
    { id: 2, title: 'jgigi', price: 'jgigi-price' },
  ];

  return (
    <div className="pt-28 grid grid-cols-1">
      {haha.map((item, index) => (
        <div key={index}>
          <Card
            sx={{
              minWidth: 275,
              marginBottom: expandedPanel === item.id ? '10px' : '0',
            }}
            onClick={() => {
              handleToggle(item.id);
            }}
          >
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {item.title}
              </Typography>
            </CardContent>
          </Card>

          {expandedPanel === item.id && (
            <Card sx={{ minWidth: 275, marginTop: '10px' }}>
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  {item.title}
                </Typography>
              </CardContent>
            </Card>
          )}
        </div>
      ))}
    </div>
  );
}

export default Account;
