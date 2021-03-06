import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  DrawingManager,
  LoadScript,
  Polygon,
  Marker,
} from "@react-google-maps/api";
import {
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
} from "mdbreact";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


var classifyPoint = require("robust-point-in-polygon")
const MySwal = withReactContent(Swal);

const addDescSwal = {
  title: 'Change Password?',
  focusConfirm: false,
  html: `
    <input class="swal2-input" id="description" type="text" placeholder="Enter description..." />
  `,
  type: 'success',
  showCancelButton: true,
  cancelButtonColor: 'grey',
  confirmButtonText: 'Create!',
  allowOutsideClick: false,
  preConfirm: () => ({
    description: document.getElementById('description').value
  })
};
export default () => {
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [marker, setMarker] = useState(null);
  const [path, setPath] = useState([]);
  const [submitted, setSubmit] = useState(false);

  const checkPointer = () => {
    setSubmit(true);
    console.log(lat, lng);
    isLatLngInZone(lat, lng);
  };

  const mapContainerStyle = {
    height: "400px",
    width: "800px",
  };

  const center = {
    lat: 17.385,
    lng: 78.234,
  };

  useEffect(() => {
    if (localStorage.coords) {
      setPath(JSON.parse(localStorage.coords));
    }
  }, []);

  const isLatLngInZone = (lat, lng) => {
    var polygon_arr = [ ];
    path.forEach(pos=>{
      polygon_arr.push([pos.lat, pos.lng]);
    })
    var marker_arr = [lat, lng];
    if (classifyPoint(polygon_arr, marker_arr) <= 0) {
      alert("inside");
    } else {
      alert("outside");
    }
 
    // var x = lat,
    //   y = lng,
    //   vs = path;

    // var inside = false;
    // for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
    //   var xi = vs[i].lat,
    //     yi = vs[i].lng;
    //   var xj = vs[j].lat,
    //     yj = vs[j].lng;

    //   var intersect =
    //     (yi > y) !== (yj > y) && x < (((xj - xi) * (y - yi)) / (yj - yi) + xi);
    //   if (intersect) inside = !inside;
    // }

    // if (inside) {
    //   alert("inside");
    // } else {
    //   alert("outside");
    // }
   // return inside;
  };

  const drawingControlOptions = {
    drawingControlOptions: {
      drawingModes: ["marker", "polygon"],
    },
  };

  const onLoad = (drawingManager) => {
    console.log(drawingManager);
  };

  const onPolygonComplete = async (polygon) => {
    //console.log(polygon)
    
    const swalval = await MySwal.fire(addDescSwal);
    let v = (swalval && swalval.value) || swalval.dismiss;
    console.log(v);
    if ((v && v.description) || v === 'cancel') {
      if (v === 'cancel') {          
        polygon.setMap(null);
        await MySwal.fire({ type: 'error', title: 'Polygon not saved!!' });
        return false;
      }
    } else {      
			polygon.setMap(null);
      await MySwal.fire({ type: 'error', title: 'Description required!!' });
      return false;
    }
    let coords = [];
    for (var i = 0; i < polygon.getPath().getLength(); i++) {
      var coordinates = {
        lat: polygon.getPath().getAt(i).lat(),
        lng: polygon.getPath().getAt(i).lng(),
      };
      coords.push(coordinates);
    }

    console.log(coords);
    localStorage.setItem("polygon_desc", v.description);
    localStorage.setItem("coords", JSON.stringify(coords));
    setPath(coords);
  };

  const onMarkerComplete = (omarker) => {
    if(marker){
      marker.setMap(null);
    }
    setMarker(omarker);
    setLat(omarker.getPosition().lat());
    setLng(omarker.getPosition().lng());
    isLatLngInZone(omarker.getPosition().lat(), omarker.getPosition().lng());
  };

  return (
    <React.Fragment>
      <LoadScript
        libraries={["drawing"]}
        googleMapsApiKey={process.env.GOOGLEMAP_API_KEY}
      >
        <MDBContainer style={{ minHeight: "300px" }}>
          <h1>Maps</h1>
          <MDBRow>
            <MDBCol md="9">
              <GoogleMap
                id="drawing-manager-example"
                mapContainerStyle={mapContainerStyle}
                zoom={7}
                center={center}
              >
                <DrawingManager
                  drawingMode={"marker"}
                  onMarkerComplete={onMarkerComplete}
                  onPolygonComplete={onPolygonComplete}
                  onLoad={onLoad}
                  options={drawingControlOptions}
                />
                {path.length && <Polygon path={path} />}
                {lat && lng && submitted && <Marker position={{ lat, lng }} />}
              </GoogleMap>
            </MDBCol>

            <MDBCol md="3">
              <MDBCard className="login-card">
                <MDBCardBody>
                  <form>
                    <p className="h3 text-center py-3">Check position</p>
                    <p className="h5 text-center py-3">
                      Enter Lat&Lng and submit
                    </p>
                    <div>
                      <div className="grey-text">
                        <MDBInput
                          value={lat}
                          onChange={(e) => setLat(parseFloat(e.target.value))}
                          label="Latitude"
                          icon="pointer"
                          type="number"
                        >
                          {submitted && !lat && (
                            <div className="text-danger">
                              Latitude is required
                            </div>
                          )}
                        </MDBInput>

                        <MDBInput
                          value={lng}
                          onChange={(e) => setLng(parseFloat(e.target.value))}
                          label="Longitude"
                          icon="pointer"
                          type="number"
                        >
                          {submitted && !lng && (
                            <div className="text-danger">
                              Longitude is required
                            </div>
                          )}
                        </MDBInput>
                      </div>
                      <MDBRow style={{ paddingTop: "35px" }}>
                        <MDBCol md="6" style={{ textAlign: "center" }}>
                          <MDBBtn
                            size="lg"
                            color="primary"
                            onClick={(e) => checkPointer()}
                          >
                            Check
                          </MDBBtn>
                        </MDBCol>
                      </MDBRow>
                    </div>
                  </form>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </LoadScript>
    </React.Fragment>
  );
};
