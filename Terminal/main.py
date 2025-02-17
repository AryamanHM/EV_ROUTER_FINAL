import argparse
import webbrowser
import csv
from geopy.geocoders import Nominatim
from geopy.distance import geodesic
from geopy.distance import great_circle
import subprocess
def geolocateaddresscoordinates(location):
    geolocator = Nominatim(user_agent="EV_ROUTER_FINAL")
    location = geolocator.geocode(location)
    print(location.address)
    print((location.latitude, location.longitude))
    #print(location.raw)
    return location
#geolocateaddresscoordinates("Lucknow")
def geolocatecoordinatesaddress(coordinates):
    geolocator = Nominatim(user_agent="EV_ROUTER_FINAL")
    location = geolocator.reverse(coordinates)
    print(location.address)
    print((location.latitude, location.longitude))
    #print(location.raw)
#geolocateaddresscoordinates("52.509669, 13.376294") 
def distance_great_circle():
       location1=input("Enter name of origin:")
       location2=input("Enter name of destination:")
       l1=geolocateaddresscoordinates(location1)
       l2=geolocateaddresscoordinates(location2)
       lat1=l1.latitude
       lat2=l2.latitude
       long1=l1.longitude
       long2=l2.longitude
       loc1=(lat1,long1)
       loc2=(lat2,long2)
       print('{:.2f}'.format(great_circle(loc1,loc2).kilometers)+" kilometres")

#distance_great_circle()  
def distance_geodesic():
       location1=input("Enter name of origin:")
       location2=input("Enter name of destination:")
       l1=geolocateaddresscoordinates(location1)
       l2=geolocateaddresscoordinates(location2)
       lat1=l1.latitude
       lat2=l2.latitude
       long1=l1.longitude
       long2=l2.longitude
       loc1=(lat1,long1)
       loc2=(lat2,long2)
       print('{:.2f}'.format(geodesic(loc1,loc2).kilometers)+" kilometres")  
#distance_geodesic()
def configure_server(): 
       location1=input("Enter name of origin:")
       location2=input("Enter name of destination:")
       l1=geolocateaddresscoordinates(location1)
       l2=geolocateaddresscoordinates(location2)
       lat1=l1.latitude
       lat2=l2.latitude
       long1=l1.longitude
       long2=l2.longitude  
       with open('server.js','r') as f: 
        lines = f.readlines()
        """
        print(lines[13])
        print(lines[15])
        print(lines[384])
        print(lines[385])
        """
        lines[13]="     'origin':'{lat1},{long1}', //{location1}\n".format(lat1=lat1,long1=long1,location1=location1)
        lines[15]="     'destination': '{lat2},{long2}', //{location2}\n".format(lat2=lat2,long2=long2,location2=location2)
        lines[384]="      lat: {lat1},\n".format(lat1=lat1)
        lines[385]="      lng: {long1}".format(long1=long1)+'},\n'
        f.close()
        open('server.js', 'w').close()
        f=open("server.js", "w")
        f.writelines(lines)
        f.close()
        new = 2
        url = "index.html"
        webbrowser.open(url)
       #with open('server.js','w') as f:

#configure_server()
def read_server():
       command = ["python", "server.py"]
       with open('ev_route_final.csv', 'r') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            location1 = row['origin']
            location2 = row['destination']
            
            l1 = geolocateaddresscoordinates(location1)
            l2 = geolocateaddresscoordinates(location2)
            lat1 = l1.latitude
            lat2 = l2.latitude
            long1 = l1.longitude
            long2 = l2.longitude

            with open('server.py', 'r') as f:
                lines = f.readlines()
                
            '''
            lines[13] = "     'origin': '{lat1},{long1}', // {location1}\n".format(lat1=lat1, long1=long1, location1=location1)
            lines[15] = "     'destination': '{lat2},{long2}', // {location2}\n".format(lat2=lat2, long2=long2, location2=location2)
            lines[384] = "      lat: {lat1},\n".format(lat1=lat1)
            lines[385] = "      lng: {long1}".format(long1=long1) + '},\n'
            '''
            lines[86] = "    origin_name = '{location1}' \n".format(location1=location1)
            lines[87] = "    destination_name = '{location2}' \n".format(location2=location2)
            lines[88] = "    origin = '{lat1},{long1}' #{location1}\n".format(lat1=lat1, long1=long1, location1=location1)
            lines[89] = "    destination =  '{lat2},{long2}' #{location2}\n".format(lat2=lat2, long2=long2, location2=location2)
        #lines[384] = "      lat: {lat1},\n".format(lat1=lat1)
            #lines[385] = "      lng: {long1}".format(long1=long1) + '},\n'

            with open('server.py', 'w') as f:
                f.writelines(lines)
            process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE) 
            # Wait for the process to finish and get the output
            stdout, stderr = process.communicate()
            
def grab_server():
        command = ["python", "server.py"]
        location1=input("Enter name of origin:")
        location2=input("Enter name of destination:")
        l1=geolocateaddresscoordinates(location1)
        l2=geolocateaddresscoordinates(location2)
        lat1=l1.latitude
        lat2=l2.latitude
        long1=l1.longitude
        long2=l2.longitude 
        with open('server.py', 'r') as f:
            lines = f.readlines()
        lines[86] = "    origin_name = '{location1}' \n".format(location1=location1)
        lines[87] = "    destination_name = '{location2}' \n".format(location2=location2)
        lines[88] = "    origin = '{lat1},{long1}' #{location1}\n".format(lat1=lat1, long1=long1, location1=location1)
        lines[89] = "    destination =  '{lat2},{long2}' #{location2}\n".format(lat2=lat2, long2=long2, location2=location2)
        #lines[384] = "      lat: {lat1},\n".format(lat1=lat1)
        #lines[385] = "      lng: {long1}".format(long1=long1) + '},\n'

        with open('server.py', 'w') as f:
                f.writelines(lines)
        process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE) 
            # Wait for the process to finish and get the output
        stdout, stderr = process.communicate()

            # Print the output
        if process.returncode == 0:
                print("File executed successfully.")
                print("Output:")
                print(stdout.decode())
        else:
                print("File execution failed.")
                print("Error:")
                print(stderr.decode())    
                  
parser=argparse.ArgumentParser(description ='This program runs the EV Router.')
parser.add_argument("-a", "--generate1", help='Get latitude and longitude coordinates from location.')
parser.add_argument("-b", "--generate2", help='Get address coordinates from lattitude and longitude.')
parser.add_argument("-c", "--distance1", help='Calculate great circle distance.',action='store_true')
parser.add_argument("-d", "--distance2", help='Calculate geodesic distance.',action='store_true')
parser.add_argument("-e", "--execute", help='Run server.',action='store_true')
parser.add_argument("-f", "--flag", help='Run server but read from source ad destination.',action='store_true')
parser.add_argument("-g", "--grab", help='Run server but output in terminal.',action='store_true')
args=parser.parse_args()
if args.generate1:
	x=args.generate1
	geolocateaddresscoordinates(x)
if args.generate2:
	y=args.generate2
	geolocatecoordinatesaddress(y)
if args.distance1:
	distance_great_circle()
if args.distance2:
	distance_geodesic()
if args.execute:
	configure_server()
if args.flag:
       read_server()
if args.grab:
       grab_server()