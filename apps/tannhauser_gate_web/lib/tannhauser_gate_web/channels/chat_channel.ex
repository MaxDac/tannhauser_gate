defmodule TannhauserGateWeb.ChatChannel do
  use TannhauserGateWeb, :channel

  def join("chats:" <> chat_id, _params, socket) do
    :timer.send_interval(5_000, :ping)
    {:ok, assign(socket, :chat_id, String.to_integer(chat_id))}
  end

  @spec handle_info(:ping, Phoenix.Socket.t()) :: {:noreply, Phoenix.Socket.t()}
  def handle_info(:ping, socket) do
    count = socket.assigns[:count] || 1
    push(socket, "ping", %{count: count})
    {:noreply, assign(socket, :count, count + 1)}
  end
end
