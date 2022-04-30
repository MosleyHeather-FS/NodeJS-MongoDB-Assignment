# NodeJS MongoDB Assignment
## April 23, 2022
#### Set up assignment folder and github, and connected them.
#### Created app, collection, models, and routes folders with their respective files. Currently researching how to do post. The rest are mostly finished. Just some final editing and testing needed to finish the others. Post needs the most attention currently.
#### Re-read instructions. Post is set up how it's supposed to be. All code is working as it's supposed to be. Just have to test it now.

# Second Collections Assignment
## April 27, 2022
#### Created composer.js model and routes. Ran into errors with composers post. Won't create any posts stating that the compositions don't match.
#### With the help of a classmate, we determined it's the model causing the issues. Removing the populate collections setup in the model fixes it.

## April 28, 2022
#### Continuing to look into fixes for populate, but so far nothing fixes it.

## April 30, 2022
#### Fixed POST, DELETE, and GET BY ID, not giving the error messages if you try looking for someone in the cataloge that doesn't exist or if you try to post someone that does.
#### Fixed populate to where it shows both title and composer together, but it still doesn't connect to the other collection.