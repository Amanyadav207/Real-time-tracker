const socket = io();

if(navigator.geolocation){
    navigator.geolocation.watchPosition((position)=>{
        socket.emit("send-location",{
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    },
    (error)=>{
        console.error("Error getting location: ", error);
    },
    {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 7000
    });
}

const map = L.map('map').setView([0, 0], 16);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    }).addTo(map);

const markers = {};

socket.on("new-location",(locationData)=>{
    const { id,latitude, longitude } = locationData;
    map.setView([latitude, longitude]);
    if(markers[id]){
        markers[id].setLatLng([latitude, longitude]);
    }
    else {
        markers[id] = L.marker([latitude, longitude]).addTo(map);
    }
    console.log("total users ", Object.keys(markers).length);

});

// socket.on("disconnect",()=>{
//     const { id } = socket;
//     if(markers[id]){
//         map.removeLayer(markers[id]);
//         delete markers[id];
//     }
// });
