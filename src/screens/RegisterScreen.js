import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Text } from 'react-native-paper';
import { Dropdown } from 'react-native-element-dropdown';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
import { emailValidator } from '../helpers/emailValidator';
import { passwordValidator } from '../helpers/passwordValidator';
import { nameValidator } from '../helpers/nameValidator';
import { signUpUser } from '../api/auth-api';
import Toast from '../components/Toast';

export default function RegisterScreen({ navigation }) {
    const [name, setName] = useState({ value: '', error: '' });
    const [email, setEmail] = useState({ value: '', error: '' });
    const [password, setPassword] = useState({ value: '', error: '' });
    const [userType, setUserType] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const userTypes = [
        { label: 'Pet Parent', value: 'Pet Parent' },
        { label: 'Pet Groomer', value: 'Pet Groomer' },
        { label: 'Pet Doctor', value: 'Pet Doctor' },
    ];

    const onSignUpPressed = async () => {
        const nameError = nameValidator(name.value);
        const emailError = emailValidator(email.value);
        const passwordError = passwordValidator(password.value);

        if (emailError || passwordError || nameError || !userType) {
            setName({ ...name, error: nameError });
            setEmail({ ...email, error: emailError });
            setPassword({ ...password, error: passwordError });
            if (!userType) setError('Please select a user type.');
            return;
        }

        setLoading(true);
        const response = await signUpUser({
            name: name.value,
            email: email.value,
            password: password.value,
            userType, // Include selected user type
        });

        setLoading(false);

        if (response.error) {
            setError(response.error);
        } else {
            Alert.alert('Success', response.message);
            navigation.replace('LoginScreen'); // Redirect to login
        }
    };

    return (
        <Background>
            <BackButton goBack={navigation.goBack} />
            <Logo />
            <Header>Create Account</Header>

            {/* Name Input */}
            <TextInput
                label="Name"
                returnKeyType="next"
                value={name.value}
                onChangeText={(text) => setName({ value: text, error: '' })}
                error={!!name.error}
                errorText={name.error}
            />

            {/* Email Input */}
            <TextInput
                label="Email"
                returnKeyType="next"
                value={email.value}
                onChangeText={(text) => setEmail({ value: text, error: '' })}
                error={!!email.error}
                errorText={email.error}
                autoCapitalize="none"
                autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address"
            />

            {/* Password Input */}
            <TextInput
                label="Password"
                returnKeyType="done"
                value={password.value}
                onChangeText={(text) => setPassword({ value: text, error: '' })}
                error={!!password.error}
                errorText={password.error}
                secureTextEntry
            />

            {/* User Type Selection Dropdown */}
            <View style={styles.inputContainer}>
                <Dropdown
                    data={userTypes}
                    labelField="label"
                    valueField="value"
                    placeholder="Select User Type"
                    value={userType}
                    onChange={(item) => setUserType(item.value)}
                    style={styles.dropdown}
                    containerStyle={styles.dropdownMenu}
                    placeholderStyle={styles.placeholder}
                    selectedTextStyle={styles.selectedText}
                    itemTextStyle={styles.dropdownItemText}
                />
            </View>

            {/* Sign Up Button */}
            <Button
                loading={loading}
                mode="contained"
                onPress={onSignUpPressed}
                style={{ marginTop: 24 }}
            >
                Sign Up
            </Button>

            {/* Login Link */}
            <View style={styles.row}>
                <Text>Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
                    <Text style={styles.link}>Login</Text>
                </TouchableOpacity>
            </View>

            <Toast message={error} onDismiss={() => setError('')} />
        </Background>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        marginTop: 4,
    },
    link: {
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
    inputContainer: {
        width: '100%',
        paddingHorizontal: 20,
        marginTop: 10,
    },
    dropdown: {
        height: 56,  // SAME HEIGHT AS INPUT FIELDS
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 12,
        backgroundColor: 'white',
        justifyContent: 'center',
        fontSize: 16,  // TEXT SIZE MATCHES INPUT FIELDS
    },
    dropdownMenu: {
        borderRadius: 5,
    },
    placeholder: {
        fontSize: 16,
        color: '#888',
    },
    selectedText: {
        fontSize: 16,
    },
    dropdownItemText: {
        fontSize: 16,
        paddingVertical: 10,
    },
});
