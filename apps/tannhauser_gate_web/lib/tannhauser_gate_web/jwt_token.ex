defmodule TannhauserGateWeb.JwtToken do
  @moduledoc false

  use Joken.Config

  @signer Joken.Signer.create("HS256", "site-secret")

  @spec get_jwt_token(any) :: {:error, atom | keyword} | {:ok, binary}
  def get_jwt_token(username) do
    extra_claims = %{
      "username" => username
    }

    case generate_and_sign(extra_claims, @signer) do
      {:ok, token, claims} ->
        IO.puts "Token generated: #{inspect token}"
        IO.puts "Second response: #{inspect claims}"
        {:ok, token
      }
      {:error, reason} = r ->
        IO.puts("Error while generating token: #{inspect reason}")
        r
    end
  end

  @spec validate_jwt_token(binary) :: {:error, atom | keyword} | {:ok, any}
  def validate_jwt_token(token) do
    case verify_and_validate(token, @signer) do
      {:ok, claims} ->
        %{"username" => username} = claims
        {:ok, username}
      r ->
        r
    end
  end

end
