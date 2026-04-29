import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import api from '../constants/api';
import { useStore } from '../asyncStorage/store.js';



    const data = [
        { lebel: '100ml', value: 100 },
        { lebel: '200ml', value: 200 },
        { lebel: '300ml', value: 300 },
        { lebel: '400ml', value: 400 },
        { lebel: '500ml', value: 500 },
    ];

const DropdownComponent = ( {onValueSelected} ) => {
    const [value, setValue] = useState(null);
    const [glass, setGlass] = useState();
    const { token } = useStore();
    const [loading, setLoading] = useState(true);

    const renderItem = item => {
        return(
            <View style={styles.item}>
                <Text style={styles.textItem}>{item.lebel}</Text>
                {item.value === value}
            </View>
        );
    }

    const changeAmount = async (item) => {
        setLoading(true);
        try {
            const response = await api.patch("/api/app/home/changeAmount", 
                { item },
                {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                
            });
            setGlass(response.data.updateAmount);
            setValue(response.data.updateAmount.amount);
            onValueSelected();
        } catch (error) {
            console.log(error.message);
        }finally{
            setLoading(false);
        }
    }


    const info = async () => {
        setLoading(true);
        try {
            const response = await api.get("/api/app/info", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setGlass(response.data.glass);
        } catch (error) {
            console.log(error.message);
        }finally{
            setLoading(false);
        }
        
    }

    useEffect(() => {
        info();         
    },[]);

    if( loading || !glass){
        return(
            <ActivityIndicator />
        )
    }


    return(
        <View>
            <Dropdown 
                data={data}
                placeholder={glass.amount}
                value={glass.amount}
                onChange={item => {
                    changeAmount(item.value);
                }}
                renderItem={renderItem}
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
            />
        </View>
    );
};

export default DropdownComponent;
           
  const styles = StyleSheet.create({
    dropdown: {
      margin: 16,
      height: 50,
      width:100,
      backgroundColor: 'lightblue',
      borderRadius: 12,
      padding: 12,
    },
    item: {
      padding: 17,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    textItem: {
      flex: 1,
      fontSize: 16,
    },
    placeholderStyle: {
      fontSize: 16,
    },
  });