#!/bin/sh
secret=$(mix phx.gen.secret)
db_connection="ecto://$1:$2@$3/$4"

echo "Secret: $secret"
echo "DB: $db_connection"

# Creating the erlang cookie
# kubectl create secret generic app-config --from-literal=erlang-cookie=DCRVBIZHJWHNZXYVSFPG --namespace=haypoll

cd ../

docker build --build-arg SECRET_KEY="$secret" --build-arg DB_CONN="$db_connection" -t "$5:$6" .
