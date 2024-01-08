import requests
from bs4 import BeautifulSoup
import time

def scrape_spans(url):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }

    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')

        # Introduce a delay to allow content to load
        time.sleep(5)

        spans = soup.find_all('span')

        for span in spans:
            # Check if the span has text content
            if span.text.strip():
                print(span.text)
    else:
        print(f"Failed to retrieve the webpage. Status code: {response.status_code}")

# Example usage:
scrape_spans('https://www.amazon.in/Samsung-Waterfall-sAMOLED-Display-Security/dp/B0C7C28GKF')
