import RNPickerSelect from 'react-native-picker-select';
import {StyleSheet} from 'react-native';

interface DropdownProps {
    onValueChange: (value: number) => void;
    value: number;
}

export const Dropdown = ({onValueChange, value}: DropdownProps) => {

    return (
        <RNPickerSelect
            onValueChange={onValueChange}
            value={value}
            placeholder={{
                label: 'Select a reminder frequency',
                value: null,
            }}
            items={[
                {label: '1 min', value: 1},
                {label: '30 min', value: 30},
                {label: '1H', value: 60},
                {label: '2H', value: 120},
            ]}
            style={pickerSelectStyles}
        />
    );
};

const pickerSelectStyles = StyleSheet.create({
    inputAndroid: {
        fontSize: 16,
        borderColor: 'purple',
        borderRadius: 8,
        color: '#001e1d',
        width: 280,
        backgroundColor: "#abd1c6"
    },
});