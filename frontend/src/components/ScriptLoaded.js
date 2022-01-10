import React from 'react';
import { LoadScript } from '@react-google-maps/api';


function ScriptLoaded() {
  return (
    <LoadScript
      googleMapsApiKey="AIzaSyA0qe-Nm-I-wRVSHg__FQmbIIE9WNpbqms"
    >
    </LoadScript>
  )
}

export default React.memo(ScriptLoaded)