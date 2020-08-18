docker run -d \
    --name postgres \
    -e POSTGRES_PASSWORD=tannhauser-db \
    -e PGDATA=/var/lib/postgresql/data/pgdata \
    -v /Users/massimilianodacunzo/Projects/data/tannhauser_db:/var/lib/postgresql/data \
    -p 5432:5432 \
    postgres