import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useStore } from '../asyncStorage/store.js';
import styles from '../assets/styles/notifications.js'; 

const INTERVALS = [
  { id: '1h', label: 'Svaki sat', hours: 1 },
  { id: '3h', label: 'Svaka 3 sata', hours: 3 },
  { id: '6h', label: 'Svakih 6 sati', hours: 6 },
  { id: 'off', label: 'Isključi podsjetnike', hours: 0 },
];

export default function NotificationSettings() {

  const [selectedOption, setSelectedOption] = useState(null);
  const { updateNotificationInterval, notificationInterval } = useStore();

    const saveSettings = async () => {
        if (!selectedOption) {
            Alert.alert('Molim vas odaberite koliko često želite podsjetnik');
            return;
        }

        const selectedItem = INTERVALS.find(i => i.id === selectedOption);
        
        const result = await updateNotificationInterval(selectedItem.hours);
        
        if (result.success) {
        Alert.alert(`Your reminders are set: ${selectedItem.label}`);
        } else {
        Alert.alert('Something went wrong while saving settings.');
        }
    };

  

return (
    <View style={styles.container}>
      <Text style={styles.title}>Podsjetnik</Text>
      <Text style={styles.subtitle}>Koliko često želite podsjetnik?</Text>
      
      <Text style={styles.infoText}>
        Trenutno: svakih {notificationInterval || 0} h
      </Text>

      <View style={styles.optionsWrapper}>
        {INTERVALS.map((item) => {
          const isSelected = selectedOption === item.id;
          return (
            <TouchableOpacity
              key={item.id}
              style={[styles.optionButton, isSelected && styles.buttonSelected]}
              onPress={() => setSelectedOption(item.id)}
            >
              <Text style={[styles.optionText, isSelected && styles.textSelected]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={saveSettings}>
        <Text style={styles.saveButtonText}>Spremi postavke</Text>
      </TouchableOpacity>
    </View>
  );
}