import RNPickerSelect from 'react-native-picker-select';
import { StyleSheet } from 'react-native';

interface DropdownProps {
    onValueChange: (value: string) => void;
    value?: string;
}

export const Dropdown = ({onValueChange, value}: DropdownProps) => {

    return (
        <RNPickerSelect
            onValueChange={onValueChange}
            value={value}
            placeholder={{
                label: 'Sélectionner une durée...',
                value: null,
            }}
            items={[
                {label: '30 min', value: '30'},
                {label: '1H', value: '60'},
                {label: '2H', value: '120'},
            ]}
            style={pickerSelectStyles}
        />
    );
};

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30,
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30,
    },
});