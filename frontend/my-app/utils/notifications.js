import * as Notifications from 'expo-notifications';
import { SchedulableTriggerInputTypes } from 'expo-notifications';



// iskoči i svira zvuk čak i ako korisnik trenutno gleda u aplikaciju
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});


export const scheduleWaterReminder = async (hours) => {
  // Obrišemo sve prethodne alarme da ne bismo imali duple notifikacije
  await Notifications.cancelAllScheduledNotificationsAsync();

  if (hours === 0) {
    console.log("Podsjetnici su isključeni.");
    return;
  }

  const intervalInSeconds = hours * 60 * 60 ;

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Vrijeme je za vodu!",
      body: "Popij čašu vode i prati svoj cilj za danas.",
      sound: true, 
    },
    trigger: {
      type: SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: intervalInSeconds,
      repeats: true, 
    },
  });

  console.log(`Uspješno zakazan alarm svaka ${hours} sata.`);
};

// traženje dozvole
export const requestNotificationPermissions = async () => {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  
  if (finalStatus !== 'granted') {
    alert('Morate dopustiti notifikacije da bi vas podsjećali na vodu!');
    return false;
  }
  return true;
};