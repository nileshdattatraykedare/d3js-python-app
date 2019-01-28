

# Simple Frontend that produces stacked bar chart using D3 (d3js.org) and jquery (jquery.com)

# backend is developed using Python3 and Flask


# Datasource is sample.json

# API to fetch chart data


curl -X GET \
  http://localhost:5000/get_chart_data \
  -H 'Content-Type: application/json' \
  -H 'cache-control: no-cache'


# Chart loads at following page:

http://localhost:5000/


## command

python app.py

##

![alt text](screenshot_stacked_bar_chart.png)

