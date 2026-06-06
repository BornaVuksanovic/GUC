import React, { useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useStore } from '../asyncStorage/store.js';
import styles from '../assets/styles/rewards.js'; // Pretpostavljam da ćeš ovdje spremiti stilove

export default function RewardsScreen() {
  const { streak, unlockedBadges, availableBadges, fetchAchievements } = useStore();

  useEffect(() => {
    fetchAchievements();
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Postignuća</Text>

      <View style={styles.streakCard}>
        <Text style={styles.streakIcon}>{streak > 0 ? "🔥" : "💤"}</Text>
        <View>
          <Text style={styles.streakNumber}>{streak} dana</Text>
          <Text style={styles.streakLabel}>Trenutni niz</Text>
        </View>
      </View>

      <Text style={styles.title2}>Značke:</Text>

      <View style={styles.badgesGrid}>
        {availableBadges.map((badge) => {
          const isUnlocked = unlockedBadges.includes(badge.id);
          return (
            <View key={badge.id} style={[styles.badgeCard, !isUnlocked && styles.badgeLocked]}>
              <Text style={styles.badgeIcon}>{badge.icon}</Text>
              <Text style={styles.badgeTitleText}>{badge.desc}</Text>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}