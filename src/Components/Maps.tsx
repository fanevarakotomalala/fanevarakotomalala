import React , {useState , useEffect} from 'react'
import { GoogleMap , DirectionsRenderer , LoadScript } from '@react-google-maps/api';



interface MapProps {
    destination:string;
}

const Maps:React.FC<MapProps> = ({destination}) => {
    const [directions , setDirections] = useState<google.maps.DirectionsResult | null>(null);

      
    useEffect(() => {
        const directionsService = new google.maps.DirectionsService();
        directionsService.route(
            {
                origin:"Ambodivoanjo",
                destination,
                travelMode:google.maps.TravelMode.DRIVING
            },
            (result , status) => {
                if(status === google.maps.DirectionsStatus.OK){
                    setDirections(result)
                }
                else{
                    console.error(`
                       erreur lors de la recuperation des directions: ${status}
                    `);
                }
            }
        );
    } , [destination]);
    return (
        <div>
            <LoadScript googleMapsApiKey='AIzaSyB68MepFtGKzsb8uAayRsAUT3SKVGe3Gjw'>
              <GoogleMap center={{lat:0 , lng:0}}  zoom={8}>
                  {
                    directions && (
                        <DirectionsRenderer directions={directions}/>
                    )
                  }
             </GoogleMap>

            </LoadScript>
            

        </div>
    );
   
}
export default Maps;