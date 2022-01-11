import React from 'react';
import { LoadScript } from '@react-google-maps/api';


function ScriptLoaded() {
  return (
    <LoadScript
      googleMapsApiKey="GOOGLEMAP_API_KEY"
    >
    </LoadScript>
  )
}

export default React.memo(ScriptLoaded)