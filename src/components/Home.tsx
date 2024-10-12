import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Card,
    CardHeader,
    CardContent,
    MenuItem,
    TextField,
    Button,
    Container,
    FormControlLabel,
    RadioGroup,
    Radio,
    FormLabel,
} from '@mui/material';

export const Home: React.FC = () => {
    const [candidateName, setCandidateName] = useState('');
    const [gender, setGender] = useState('');
    const [prefLang, setPrefLang] = useState('');
    let navigate = useNavigate();

    const submitHandler = () => {
        if (candidateName === '' || gender === '' || prefLang === '') {
            alert(' Please give proper input !');
            return false;
        } else {
            navigate(`/questions/${prefLang}`);
            console.log('dockl', candidateName, gender, prefLang);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 10 }} data-testid="home-component">
            <Card sx={{ maxWidth: 500 }}>
                <CardHeader title="Enter your details" />
                <CardContent>
                    <TextField
                        fullWidth
                        id="outlined-basic"
                        label="Enter your name"
                        variant="outlined"
                        margin="dense"
                        onChange={(e) => setCandidateName(e.target.value)}
                    />
                    <FormLabel>Gender</FormLabel>
                    <RadioGroup row onChange={(e) => setGender(e.target.value)}>
                        <FormControlLabel
                            value="male"
                            control={<Radio />}
                            label="Male"
                        />
                        <FormControlLabel
                            value="female"
                            control={<Radio />}
                            label="Female"
                        />

                        <FormControlLabel
                            value="other"
                            control={<Radio />}
                            label="Other"
                        />
                    </RadioGroup>

                    <TextField
                        select
                        fullWidth
                        label="Select"
                        defaultValue=""
                        className="inputText"
                        onChange={(e) => setPrefLang(e.target.value)}
                        helperText="Please select defficulty"
                        variant="outlined"
                        margin="dense"
                        required>
                        <MenuItem value="json">JSON</MenuItem>
                        <MenuItem value="react">React</MenuItem>
                        <MenuItem value="typescript">TypeScript</MenuItem>
                    </TextField>

                    <Button
                        variant="contained"
                        sx={{ m: 1 }}
                        onClick={submitHandler}>
                        Submit
                    </Button>
                </CardContent>
            </Card>
        </Container>
    );
};
