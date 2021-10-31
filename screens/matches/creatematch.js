import React, { Component } from 'react';

import { View, Button,Text } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { render } from 'react-dom';

// function CreateMatch({ testId }) {
//     React.useEffect(() => {
//       const subscriber = firestore()
//         .collection('test')
//         .doc(testId)
//         .onSnapshot(documentSnapshot => {
//           console.log('Test data: ', documentSnapshot.data());
//         });
        
//       // Stop listening for updates when no longer required
//       return () => subscriber();
//     }, [testId]);
//   }
 

class CreateMatch extends Component {
    constructor(props) {
        super(props);
        this.getTest();
    }

    getTest = async () => {
        const test = await firestore().collection('test').doc('imlW2IK7DfdrJ9fGRSFZ').get();
        console.log(test)
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#e67e22' }} >
            <Text style={{ flex: 0, marginBottom: 50, marginTop: 0, fontSize: 50, alignItems: 'top', justifyContent: 'center', backgroundColor: '#e67e22' }}></Text>
            <Text style={{ flex: 0, marginBottom: 50, marginTop: 0, fontSize: 80, alignItems: 'top', textTransform: 'uppercase', justifyContent: 'center', backgroundColor: '#e67e22' }}> Join & Play</Text>
            <Button style={{ flex: 0, marginBottom: 50, marginTop: 0}} title="Go page A" onPress={() => props.navigation.navigate('PageA')} />
            </View>
        );
    }    

}
  
  export default CreateMatch;