# BookStore
docker run --name redis_book -p 6379:6379 -d redis
docker run --name mysql -e MYSQL_ROOT_PASSWORD=1234 -d -p 3306:3306 mysql