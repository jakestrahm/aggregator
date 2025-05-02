#!/bin/zsh

http POST localhost:3000/items \
  name="milk" \
  item_type="food" \
  properties:='[{"property_name": "calories", "property_value": "160"}, {"property_name": "protein", "property_value": "13"}]'
