# todo
- [ ] sync properties?
    whenever i update/insert, ensure that all items of that property, have the
    same properties?

# getting things up and running
1. docker-compose --env-file .env up --build
    docker-compose build wasn't reading env right.


    - it will create the user with the data in the .env the first time to spawn
      the container

from before i had "up" in above command:
2. docker-compose up


# running sql scripts
docker exec -i server-db-1 psql -U exuser -d exdb < src/db/migrate_up.sql

# seeing tables
docker exec -i server-db-1 psql -U exuser -d exdb -c "\dt+"

# model/handler terminology
select -> list
select by -> find
insert -> create
update -> edit
delete -> remove

