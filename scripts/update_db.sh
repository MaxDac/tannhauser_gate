#!/bin/sh
cd /app
mix ecto.create
mix ecto.migrate
