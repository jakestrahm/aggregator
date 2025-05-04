#!/bin/zsh

# http POST localhost:3000/items \
#   name="milk" \
#   item_type="food" \
#   properties:='[{"property_name": "calories", "property_value": "160"}, {"property_name": "protein", "property_value": "13"}]'
#

http POST localhost:3000/items \
  name="candy" \
  item_type="food" \
  properties:='[{"property_name": "calories", "property_value": "1000"}, {"property_name": "protein", "property_value": "0"}]'
