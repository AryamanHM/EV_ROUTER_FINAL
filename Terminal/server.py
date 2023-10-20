import requests
import asyncio
import csv
# HERE API credentials
api_key = 'Yqto0OWdVQ1lN4JyZSUwbyw5gH_EpEWlflfn_-Oe3lI'

# Helper function to calculate the route
async def calculate_route(origin, destination, initial_charge):
    url = f"https://router.hereapi.com/v8/routes?apiKey={api_key}"

    payload = {
        "transportMode": "car",
        "origin": origin,
        "destination": destination,
        "return": "polyline,turnByTurnActions,actions,instructions,travelSummary",
        "ev[freeFlowSpeedTable]": "0,0.239,27,0.239,45,0.259,60,0.196,75,0.207,90,0.238,100,0.26,110,0.296,120,0.337,130,0.351,250,0.351",
        "ev[trafficSpeedTable]": "0,0.349,27,0.319,45,0.329,60,0.266,75,0.287,90,0.318,100,0.33,110,0.335,120,0.35,130,0.36,250,0.36",
        "ev[auxiliaryConsumption]": "1.8",
        "ev[ascent]": "9",
        "ev[descent]": "4.3",
        "ev[initialCharge]": initial_charge,
        "ev[maxCharge]": "99",
        "ev[chargingCurve]": "0,239,32,199,56,167,60,130,64,111,68,83,72,55,76,33,78,17,80,1",
        "ev[maxChargingVoltage]": "400",
        "ev[maxChargeAfterChargingStation]": "80",
        "ev[minChargeAtChargingStation]": "8",
        "ev[minChargeAtDestination]": "8",
        "ev[chargingSetupDuration]": "300",
        "ev[makeReachable]": "true",
        "ev[connectorTypes]": "iec62196Type1Combo,iec62196Type2Combo,Chademo,Tesla"
    }

    response = await asyncio.to_thread(requests.get, url, params=payload, verify=False)
    route_data = response.json()

    return route_data

# Helper function to process and display route details
def display_route_details(origin_name,destination_name,origin,destination,route_data):
    onroad_duration = 0
    distance = 0

    for section in route_data["routes"][0]["sections"]:
        distance += section["travelSummary"]["length"]
        onroad_duration += section["travelSummary"]["duration"]
    if "routes" in route_data:
        route = route_data["routes"][0]
        print("Route Details:")
        print(f"Total Distance: {distance/1000:.2f} km")
        total_duration = onroad_duration + (get_charging_duration(route['sections'])*60)
        print(f"Total Duration: {total_duration} seconds")
        print(f"Total On Road Duration: {onroad_duration} seconds")
        charging_duration = get_charging_duration(route['sections'])*60
        print(f"Charging Duration: {charging_duration} seconds")
        print(f"Number of Stops: {count_charging_stops(route['sections'])}")
        '''
        print("\nRoute Instructions:")
        for section in route['sections']:
            for action in section['actions']:
                print(f"{action['instruction']}")
                '''
        # Append route details to a CSV file
        with open('data.csv', 'a', newline='') as csv_file:
            csv_writer = csv.writer(csv_file)
            # Append data to the CSV file
            csv_writer.writerow([origin_name,destination_name,origin,destination,distance, total_duration, onroad_duration, charging_duration, 
                                 count_charging_stops(route['sections'])])



def get_charging_duration(sections):
    charging_duration = 0
    for section in sections:
        if "postActions" in section:
            for post_action in section["postActions"]:
                charging_duration += post_action.get("duration", 0)
    return charging_duration / 60  # Convert seconds to minutes

def count_charging_stops(sections):
    charging_stops = 0
    for section in sections:
        if "postActions" in section:
            charging_stops += 1
    return charging_stops

if __name__=='__main__':    
    origin_name = 'Visakhapatnam' 
    destination_name = 'Vijayawada' 
    origin = '17.7231276,83.3012842' #Visakhapatnam
    destination =  '16.5087573,80.6185089' #Vijayawada
    initial_charge = 50  # Replace with the initial charge percentage

    loop = asyncio.get_event_loop()
    route_data = loop.run_until_complete(calculate_route(origin, destination, initial_charge))
    display_route_details(origin_name,destination_name,origin,destination,route_data)