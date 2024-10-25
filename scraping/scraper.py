import requests
from bs4 import BeautifulSoup
import random
import time

# List of User-Agents to rotate
USER_AGENTS = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Gecko/20100101 Firefox/89.0',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.1 Safari/605.1.15',
]

def scrape_amazon(product_name, query):
    """Scrape product prices from Amazon based on the query."""
    results = []
    amazon_url = f"https://www.amazon.com/s?k={product_name}+{query}"
    print(f"Scraping Amazon URL: {amazon_url}")
    
    headers = {
        'User-Agent': random.choice(USER_AGENTS),
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive'
    }

    try:
        response = requests.get(amazon_url, headers=headers)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.text, 'html.parser')

        if 'captcha' in response.text.lower():
            print("Amazon CAPTCHA encountered. Scraping failed.")
            return []

        for item in soup.select('.s-main-slot .s-result-item'):
            title = item.select_one('h2 a span').get_text() if item.select_one('h2 a span') else None
            price = item.select_one('.a-price .a-offscreen').get_text() if item.select_one('.a-price .a-offscreen') else None
            link = 'https://www.amazon.com' + item.select_one('h2 a')['href'] if item.select_one('h2 a') else None

            if title and price:
                results.append({'name': title, 'price': price, 'link': link})

    except requests.exceptions.HTTPError as http_err:
        print(f"HTTP error occurred: {http_err}")
        return []
    except Exception as e:
        print(f"Error fetching data from Amazon: {e}")
        return []

    if not results:
        print("No products found on Amazon for the given query.")

    return results

def scrape_ebay(product_name, query):
    """Scrape product prices from eBay based on the query."""
    results = []
    ebay_url = f"https://www.ebay.com/sch/i.html?_nkw={product_name}+{query}"
    print(f"Scraping eBay URL: {ebay_url}")
    
    headers = {
        'User-Agent': random.choice(USER_AGENTS),
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive'
    }

    try:
        response = requests.get(ebay_url, headers=headers)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.text, 'html.parser')

        for item in soup.select('.s-item'):
            title = item.select_one('.s-item__title').get_text() if item.select_one('.s-item__title') else None
            price = item.select_one('.s-item__price').get_text() if item.select_one('.s-item__price') else None
            link = item.select_one('.s-item__link')['href'] if item.select_one('.s-item__link') else None

            if title and price:
                results.append({'name': title, 'price': price, 'link': link})

    except requests.exceptions.HTTPError as http_err:
        print(f"HTTP error occurred: {http_err}")
        return []
    except Exception as e:
        print(f"Error fetching data from eBay: {e}")
        return []

    if not results:
        print("No products found on eBay for the given query.")

    return results

def scrape_product_prices_by_make_model(product_name, make, model):
    """Scrape product prices from both Amazon and eBay using product make and model."""
    query = f"{make}+{model}"
    
    amazon_results = scrape_amazon(product_name, query)
    ebay_results = scrape_ebay(product_name, query)

    return {
        'amazon': amazon_results,
        'ebay': ebay_results
    }

def scrape_product_prices_by_specs(product_name, specifications):
    """Scrape product prices from both Amazon and eBay using product specifications."""
    amazon_results = scrape_amazon(product_name, specifications)
    ebay_results = scrape_ebay(product_name, specifications)

    return {
        'amazon': amazon_results,
        'ebay': ebay_results
    }
