FROM elixir:1.9.0-alpine AS build

RUN apk add elixir
RUN mix local.hex

# install build dependencies
RUN apk add --no-cache build-base npm git python

# prepare build dir
WORKDIR /app

# install hex + rebar
RUN mix local.hex --force && \
    mix local.rebar --force && \
    mix archive.install hex phx_new 1.5.4 --force

ARG SECRET_KEY
ARG DB_CONN

# set build ENV
ENV MIX_ENV=prod \
    DATABASE_URL=$DB_CONN \
    SECRET_KEY_BASE=$SECRET_KEY

# install mix dependencies
COPY mix.exs mix.lock ./
COPY config config
COPY apps apps

RUN mix do deps.get, deps.compile

# build assets
RUN npm --prefix ./apps/tannhauser_gate_web/assets ci --progress=false --no-audit --loglevel=error

RUN npm run --prefix ./apps/tannhauser_gate_web/assets build && \
    cp -R ./apps/tannhauser_gate_web/assets/build ./apps/tannhauser_gate_web/priv/static

RUN cd apps/tannhauser_gate_web && mix phx.digest && cd ../../

# uncomment COPY if rel/ exists
# COPY rel rel
RUN mix do compile, release

# prepare release image
FROM alpine:3.9 AS app
RUN apk add --no-cache openssl ncurses-libs

WORKDIR /app

RUN chown nobody:nobody /app

USER nobody:nobody

COPY --from=build --chown=nobody:nobody /app/_build/prod/rel/tannhauser_gate ./

ENV HOME=/app

CMD ["bin/tannhauser_gate", "start"]

