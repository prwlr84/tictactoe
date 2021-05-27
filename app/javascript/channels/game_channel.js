import consumer from "./consumer";

const initGameCable = () => {
  const movesContainer = document.getElementById('moves');
  if (movesContainer) {
    const id = movesContainer.dataset.gameId;

    consumer.subscriptions.create({ channel: "GameChannel", id: id }, {
      received(data) {
        movesContainer.insertAdjacentHTML('beforeend', data);
      },
    });
  }
}

export { initGameCable };
