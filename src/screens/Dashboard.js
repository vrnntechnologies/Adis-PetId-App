import React from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import { logoutUser } from '../api/auth-api';

export default function Dashboard({ navigation }) {
    const handleLogout = () => {
        logoutUser(navigation); // ✅ Pass navigation
    };

    return (
        <Background>
            <Logo />
            <Header>Let’s start</Header>
            <Paragraph>
                Your amazing app starts here. Open your favorite code editor and start
                editing this project.
            </Paragraph>
            <Button mode="outlined" onPress={handleLogout}>
                Logout
            </Button>
        </Background>
    );
}
