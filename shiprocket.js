const rx = require('rxjs');
const operators = require('rxjs/operators');
const authToken = require('./credentials');
const axiosAPI = require('axios');

function fetchShipments(authToken, orderId){
    // var url = '';
    if(!authToken.bearer){
        throw new Error("Something went wrong with the shipment credentials!!");
    }
    // if (orderId) { url = 'https://apiv2.shiprocket.in/v1/external/orders/show/' + orderId; } 
    // else { url = 'https://apiv2.shiprocket.in/v1/external/shipments/'; }
    var url = orderId ? 'https://apiv2.shiprocket.in/v1/external/orders/show/' + orderId : 'https://apiv2.shiprocket.in/v1/external/shipments/';
    return rx.from(axiosAPI.get(url,{
        headers:{
            'Authorization': 'Bearer ' + authToken.bearer,
            'Content-Type': 'application/json'
        }
    })).pipe(operators.filter(response => response.status === 200),
             operators.map(response => response.data)
    );

}
var finalShipmentList$ =  fetchShipments(authToken, 700697);
finalShipmentList$.subscribe(console.log);
