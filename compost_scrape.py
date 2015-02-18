from bs4 import BeautifulSoup

import requests

soup = BeautifulSoup(open("http://www.nyc.gov/html/nycwasteless/html/compost/operations_community_MAN.shtml"))

soup = BeautifulSoup("<html>data</html>")

soup = BeautifulSoup(markup)
print(soup.prettify())

