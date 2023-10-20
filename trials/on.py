import requests
from bs4 import BeautifulSoup

# Replace 'your_url_here' with the actual URL you want to scrape
url = 'http://127.0.0.1:5500/index.html'

# Send an HTTP request to the URL
response = requests.get(url)

# Check if the request was successful
if response.status_code == 200:
    # Parse the page content with BeautifulSoup
    soup = BeautifulSoup(response.text, 'html.parser')

    # Find the div element with the name "directionPanel"
    direction_panel = soup.find('div', {'id': 'directionPanel'})

    if direction_panel:
        # Find the nested div element with the specified style
        specific_div = direction_panel.find('div', {'id': 'myinfo'})

        if specific_div:
            # Extract the contents of the specific div
            contents = specific_div.get_text()
            print(contents)
        else:
            print("No div element with the specified style found within 'directionPanel'.")
    else:
        print("No div element with the name 'directionPanel' found.")

else:
    print(f"Failed to retrieve the page. Status code: {response.status_code}")
