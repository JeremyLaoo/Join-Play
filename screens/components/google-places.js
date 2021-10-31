import React from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

const GooglePlacesInput = () => {
  return (
    <GooglePlacesAutocomplete
      placeholder="Adresse"
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.warn(data, details);
      }}
      query={{
        key: 'AIzaSyBVmr8pft2PuyAnZLgaOfcoetLZSDnCT98',
        language: 'fr',
        useOnPlatform: 'all',
      }}
    />
  );
};

export default GooglePlacesInput;
