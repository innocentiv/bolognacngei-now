import { useEffect, useCallback } from "react";
import Queue from "smart-request-balancer";

const queue = new Queue({
  rules: {
    common: {
      // Common rule. Will be used if you won't provide rule argument
      rate: 1, // Allow to send 30 messages
      limit: 1, // per 1 second
      priority: 1
    }
  },
  overall: {
    rate: 1,
    limit: 1,
    priority: 1
  },
  ignoreOverallOverheat: false
});

export const usePlaceApi = () => {
  useEffect(() => {
    if (!("googleLoaded" in window)) {
      (window as any).googleLoaded = new Promise(resolve => {
        const script = document.createElement(`script`);
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_PLACE_API_KEY}&libraries=places`;
        document.head.append(script);
        script.addEventListener(`load`, resolve);
      });
    }
  }, []);

  const formattedFromAddress = useCallback(async (address: string) => {
    if (!address) return address;
    await (window as any).googleLoaded;
    try {
      const request = {
        query: address,
        fields: ["formatted_address"],
        locationBias: new google.maps.Circle({
          center: new google.maps.LatLng(44.480957, 11.361944),
          radius: 25000
        })
      };

      const mapRef = new google.maps.Map(document.createElement("div"));
      const service = new google.maps.places.PlacesService(mapRef);

      const results = await queue.request(
        retry =>
          new Promise<google.maps.places.PlaceResult[]>((resolve, reject) =>
            service.findPlaceFromQuery(request, function(results, status) {
              if (status === google.maps.places.PlacesServiceStatus.OK) {
                resolve(results);
              } else if (
                status ===
                google.maps.places.PlacesServiceStatus.OVER_QUERY_LIMIT
              ) {
                retry(10);
              } else {
                reject(status);
              }
            })
          ),
        address,
        "common"
      );

      return (results[0].formatted_address as string) || address;
    } catch {
      return address;
    }
  }, []);

  return { formattedFromAddress };
};
