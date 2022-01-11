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

export default () => {
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [path, setPath] = useState([]);
  const [submitted, setSubmit] = useState(false);

  const checkPointer = () => {
    setSubmit(true);
    console.log(lat, lng);
    isLatLngInZone();
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

  const isLatLngInZone = () => {
    var x = lat,
      y = lng,
      vs = path;

    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
      var xi = vs[i].lat,
        yi = vs[i].lng;
      var xj = vs[j].lat,
        yj = vs[j].lng;

      var intersect =
        (yi > y) !== (yj > y) && x < (((xj - xi) * (y - yi)) / (yj - yi) + xi);
      if (intersect) inside = !inside;
    }

    if (inside) {
      alert("inside");
    } else {
      alert("outside");
    }
    return inside;
  };

  const drawingControlOptions = {
    drawingControlOptions: {
      drawingModes: ["marker", "polygon"],
    },
  };

  const onLoad = (drawingManager) => {
    console.log(drawingManager);
  };

  const onPolygonComplete = (polygon) => {
    //console.log(polygon)
    let coords = [];
    for (var i = 0; i < polygon.getPath().getLength(); i++) {
      var coordinates = {
        lat: polygon.getPath().getAt(i).lat(),
        lng: polygon.getPath().getAt(i).lng(),
      };
      coords.push(coordinates);
    }
    console.log(coords);
    localStorage.setItem("coords", JSON.stringify(coords));
    setPath(coords);
  };

  const onMarkerComplete = (marker) => {
    setLat(marker.getPosition().lat());
    setLng(marker.getPosition().lng());
    isLatLngInZone();
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
                {lat && lng && <Marker position={{ lat, lng }} />}
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
                          onChange={(e) => setLat(e.target.value)}
                          label="Latitude"
                          icon="pointer"
                          type="number"
                        >
                          {submitted && lat && (
                            <div className="text-danger">
                              Latitude is required
                            </div>
                          )}
                        </MDBInput>

                        <MDBInput
                          value={lng}
                          onChange={(e) => setLng(e.target.value)}
                          label="Longitude"
                          icon="pointer"
                          type="number"
                        >
                          {submitted && lng && (
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
                            type="submit"
                            onClick={(e) => checkPointer}
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
