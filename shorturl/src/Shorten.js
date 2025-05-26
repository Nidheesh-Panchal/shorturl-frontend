import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import logo from './short-icon.png';
import './Shorten.css'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
//      {'Copyright © '}
      <Link color="inherit" href="http://localhost:3000/">
        Short URL
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function isValidURL(string) {
  var res =
    string.match(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi);
  return (res !== null);
};

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn() {

  const [selectedDate, setSelectedDate] = React.useState(dayjs().add(3, "day"));
  const [shortUrl, setShortUrl] = React.useState("");
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const data = new FormData(event.currentTarget);

    if (!isValidURL(data.get("originalUrl"))) {
      console.log("Is invalid URL. Try again.")
      return;
    }

    const originalUrl = data.get('originalUrl');
    const expirationDate = selectedDate.format('YYYY-MM-DDTHH:mm:ss');

    console.log({
      originalUrl: originalUrl,
      expirationDate: expirationDate,
    });

    try {
      const response = await fetch('/api/v1/generateShortUrl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ originalUrl, expirationDate }),
      });      
  
      if (response.ok) {
        const data = await response.json();
        console.log('API response:', data);
        setShortUrl("http://localhost:8080/"+data.shortUrl)
        // Handle the successful response from the API
      } else {
        console.error('API request failed:', response.status);
        // Handle the error case
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle network or other errors
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img src={logo} alt="Logo" className="Shorten-logo" />
          <Typography component="h1" variant="h5">
            Shorten your URL
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, padding: '4' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="originalUrl"
              label="Your URL"
              name="originalUrl"
              autoFocus
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                id="expirationDate"
                label="Expiration Date"
                value={selectedDate}
                onChange={handleDateChange}
                format="DD/MM/YYYY"
                disablePast={true}
                minDate={dayjs().add(3, "day")}
                slotProps={
                  {
                    textField: {
                      helperText: "DD/MM/YYYY",
                    },
                  }
                }
              />
            </LocalizationProvider>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Shorten URL
            </Button>
          </Box>

          <TextField
            margin="normal"
            fullWidth
            id="shortUrl"
            label="Your short URL"
            name="shortUrl"
            value={shortUrl}
            InputProps={{
              readOnly: true,
              endAdornment: (
                <IconButton onClick={handleCopy} aria-label="Copy URL">
                  <ContentCopyIcon />
                  {copied && <span style={{ marginLeft: '8px' }}>Copied!</span>}
                </IconButton>
              ),
            }}
          />
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}