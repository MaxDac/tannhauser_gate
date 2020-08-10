secret_key=$(mix phx.gen.secret)
export SECRET_KEY_BASE=secret_key
export DATABASE_URL="ecto://$1:$2@$3/$4"

mix deps.get # --only prod
mix deps.compile

npm --prefix ./apps/tannhauser_gate_web/assets ci --progress=false --no-audit --loglevel=error
npm run --prefix ./apps/tannhauser_gate_web/assets build

echo "Copying files"
cp -R ./apps/tannhauser_gate_web/assets/build ./apps/tannhauser_gate_web/priv/static

echo "Digesting"
mix phx.digest

echo "Compiling elixir project"
#MIX_ENV=prod mix compile
MIX_ENV=prod mix release

#echo "Copying files"
#rm -rf ../app && mkdir ../app && mkdir ../app/lib
#cp mix.exs mix.lock ../app/
#cp -R config ../app/config
#cp -R _build/prod/.mix ../app
#cp -R _build/prod/consolidated ../app
#cp -R _build/prod/lib ../app
#cp -R _build/prod/rel ../app
