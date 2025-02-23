#!/bin/zsh
http post localhost:3000/items category="food" name="greek yogurt" properties='{"calories": 130, "protein": 11, "carbs": 0, "fat": 2.5, "serving": "whole"}'
http post localhost:3000/items category="food" name="milk" properties='{"calories": 160, "protein": 13, "carbs": 6, "fat": 4, "serving": "8oz"}'
http post localhost:3000/items category="food" name="parboiled-rice" properties='{"calories": 170, "protein": 2.9, "carbs": 38, "fat": 0, "serving": "1/4"}'
http post localhost:3000/items category="food" name="ribeye" properties='{"calories": 259, "protein": 19, "carbs": 0, "fat": 22, "serving": "100g"}'
