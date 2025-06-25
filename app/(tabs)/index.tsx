import {KeyboardAvoidingView, StyleSheet, View} from 'react-native';
import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import {useState} from "react";
import {Dropdown} from "@/components/Dropdown";
import {useNotifications} from "@/hooks/useNotifications";
import * as Notifications from "expo-notifications";
import {Button, TextInput} from "react-native-paper";

export default function HomeScreen() {

    const [firstPerson, setFirstPerson] = useState('');
    const [secondPerson, setSecondPerson] = useState('');
    const [reminderFrequency, setReminderFrequency] = useState(0);

    const {scheduleNotificationAsync, cancelNotificationAsync} =
        useNotifications();

    const sendNotification = () => {
        scheduleNotificationAsync({
            content: {
                title: `${firstPerson} reminds ${secondPerson} to drink some water !`,
            },
            trigger: {
                type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
                seconds: reminderFrequency * 60,
                repeats: true,
            },
        });
    };

    const handleSubmit = () => {
        sendNotification();
    }

    const handleSelect = (value: number) => {
        setReminderFrequency(value)
    }

    return (
        <ThemedView style={styles.container}>
            <ThemedText style={styles.title}>Stay Hydrated !</ThemedText>
            <KeyboardAvoidingView behavior="padding">
                <View style={styles.form}>
                    <ThemedText style={styles.text}>Who needs to be reminded ?</ThemedText>
                    <View style={styles.textInputContainer}>
                        <TextInput style={styles.textInput}
                                   mode="outlined"
                                   label="First Person"
                                   value={firstPerson}
                                   onChangeText={setFirstPerson}
                                   placeholder="Set FirstName"
                                   autoCapitalize="words"
                                   autoCorrect={false}
                                   activeOutlineColor="green"
                        />
                        <TextInput style={styles.textInput}
                                   label="Second person"
                                   mode="outlined"
                                   value={secondPerson}
                                   onChangeText={setSecondPerson}
                                   placeholder="Entrez le deuxième prénom"
                                   autoCapitalize="words"
                                   autoCorrect={false}
                                   activeOutlineColor="green"
                        />
                    </View>
                    <Dropdown onValueChange={handleSelect} value={reminderFrequency}/>
                    <Button mode="outlined" style={styles.button}
                            onPress={handleSubmit}
                    >
                        <ThemedText>Valider</ThemedText>
                    </Button>
                </View>
            </KeyboardAvoidingView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#004643"
    },
    keyboardView: {
        width: '100%',
    },
    textInputContainer: {
        width: '100%',
        gap: 10,
        marginBottom: 20,
        marginTop: 10,
        alignItems: "center"
    },
    textInput: {
        width: 190,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 30,
        color: "#fffffe"
    },
    form: {
        width: '100%',
        alignItems: "center",
    },
    button: {
        marginTop: 20,
        width: '100%',
        backgroundColor: "#f9bc60",
        color: "#001e1d"
    },
    text: {
        color: "white"
    },

});
