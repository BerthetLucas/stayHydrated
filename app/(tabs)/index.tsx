import {KeyboardAvoidingView, StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import {useState} from "react";
import {Dropdown} from "@/components/Dropdown";
import {useNotifications} from "@/hooks/useNotifications";
import * as Notifications from "expo-notifications";

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
                    <ThemedText>Saisie des prénoms</ThemedText>
                    <View style={styles.input}>
                        <ThemedText>Prénom</ThemedText>
                        <TextInput
                            value={firstPerson}
                            onChangeText={setFirstPerson}
                            placeholder="Entrez le premier prénom"
                            autoCapitalize="words"
                            autoCorrect={false}
                        />
                    </View>
                    <View style={styles.input}>
                        <ThemedText>Deuxième prénom</ThemedText>
                        <TextInput
                            value={secondPerson}
                            onChangeText={setSecondPerson}
                            placeholder="Entrez le deuxième prénom"
                            autoCapitalize="words"
                            autoCorrect={false}
                        />
                    </View>
                    <View style={styles.input}>
                        <Dropdown onValueChange={handleSelect} value={reminderFrequency}/>
                    </View>
                    <TouchableOpacity
                        onPress={handleSubmit}
                    >
                        <ThemedText>Valider</ThemedText>
                    </TouchableOpacity>
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
        gap: 10
    },
    title: {
        fontSize: 20,
        fontWeight: "bold"
    },
    form: {
        justifyContent: "center",
        alignItems: "center"
    },
    input: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10
    },
    dropdown: {
        flexDirection: 'row', alignItems: "center"
    }
});
