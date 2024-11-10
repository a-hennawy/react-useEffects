import { useEffect, useState } from "react";
import Card from "./Card";
import Button from "./Button";
import "./CardDeck.css";
import axios from "axios";

function CardDeck() {
  const [deckId, setDeckId] = useState(null);
  const [alerted, setAlerted] = useState(false);
  const [currentCard, setCurrentCard] = useState(null);
  const [fullyDrawn, setFullyDrawn] = useState(false);
  const [drawCount, setDrawCount] = useState(0);
  const [shuffled, setShuffled] = useState(false);

  const [err, setErr] = useState("ERR: Cannot draw anymore cards");

  const initDeck = async () => {
    const response = await axios.get(
      "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
    );

    //storing the deck id in state
    setDeckId(response.data.deck_id);
    setDrawCount(0);
    setFullyDrawn(false);
  };

  useEffect(() => {
    function fetchData() {
      initDeck();
    }
    fetchData();
  }, []);

  useEffect(() => {
    function fetchData() {
      initDeck();
    }
    if (alerted) {
      fetchData();
      setAlerted(false);
      setCurrentCard(null);
    }
  }, [alerted]);

  useEffect(() => {
    function fetchData() {
      initDeck();
    }
    if (shuffled) {
      fetchData();
      setShuffled(false);
      setCurrentCard(null);
    }
  }, [shuffled]);

  useEffect(() => {
    if (drawCount === 53) {
      setDrawCount(0);
      setFullyDrawn(true);
      alert(err);
      setAlerted(true);
      // setFullyDrawn(false);
    }
  }, [drawCount]);

  const drawCard = async function drawCard() {
    const drawnCardRes = await axios.get(
      `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
    );
    const cardImage = drawnCardRes.data.cards[0].image;
    const remainingCards = drawnCardRes.data.remaining;
    console.log(remainingCards);
    console.log(drawCount);
    return { cardImage, remainingCards };
  };

  const handleDrawing = async () => {
    console.log("CARD DRAWN");

    const cardInfo = await drawCard();

    setCurrentCard(cardInfo.cardImage);
    setDrawCount((prevCount) => prevCount + 1);
  };

  const handleShuffle = async () => {
    console.log("Deck shuffled");
    setShuffled(true);
  };
  // const isDeckEmpty = drawCount === 52 ? true : false;
  // console.log(currentCard);

  // useEffect(() => {}, [shuffled]); //for when the user shuffles

  return (
    <div>
      <Card image={currentCard} />
      <Button clickFunc={handleDrawing} name="Draw a Card" />
      <Button clickFunc={handleShuffle} name="Start a new deck" />
    </div>
  );
}

export default CardDeck;
