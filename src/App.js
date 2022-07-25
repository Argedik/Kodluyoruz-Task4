import React, { useEffect, useState } from "react";
import "./App.css";
import randomNumbers from "./utils/RandomNumbers";

const App = () => {
  let arrColumn = Array(11).fill(0);
  let arrRow = Array(20).fill(0);
  let squaresList = {};
  let squaresClassList = {};
  let winnerSquaresList = {};
  const [newSquares, setNewSquares] = useState(squaresList);
  // const [squares, setSquares] = useState(Array(9).fill(null));
  const [btnClass, setBtnClass] = useState(squaresClassList);
  const [newWinnerSquaresList, setNewWinnerSquaresList] =
    useState(winnerSquaresList);
  useEffect(() => {
    for (let indexRow = 0; indexRow < arrRow.length; indexRow++) {
      for (let indexColumn = 0; indexColumn < arrColumn.length; indexColumn++) {
        squaresList[indexRow + "/" + indexColumn] = "";
        squaresClassList[indexRow + "/" + indexColumn] = "btn-space";
        winnerSquaresList[indexRow + "/" + indexColumn] = {
          vertical: false,
          horizontal: false,
          rightCross: false,
          leftCross: false,
        };
        setNewSquares({ ...squaresList });
        setBtnClass({ ...squaresClassList });
        setNewWinnerSquaresList({ ...winnerSquaresList });
      }
    }
  }, []);
  const createArr = (row, column) => {
    return [
      //dikey
      [row + "/" + column, row - 1 + "/" + column, row + 1 + "/" + column],
      //tıklananın 2 üstü
      [row + "/" + column, row - 2 + "/" + column, row - 1 + "/" + column],
      //tıklananın 2 altı
      [row + "/" + column, row + 1 + "/" + column, row + 2 + "/" + column],
      //yatay
      [row + "/" + column, row + "/" + (column - 1), row + "/" + (column + 1)],
      //tıklananın 2 solu
      [row + "/" + column, row + "/" + (column - 2), row + "/" + (column - 1)],
      //tıklananın 2 sağı
      [row + "/" + column, row + "/" + (column + 2), row + "/" + (column + 1)],
      //sağ çapraz
      [
        row + "/" + column,
        row - 1 + "/" + (column + 1),
        row + 1 + "/" + (column - 1),
      ],
      //tıklananın sağ çapraz 2 üstü
      [
        row + "/" + column,
        row - 1 + "/" + (column + 1),
        row - 2 + "/" + (column + 2),
      ],
      //tıklananın sol çapraz 2 altı
      [
        row + "/" + column,
        row + 1 + "/" + (column - 1),
        row + 2 + "/" + (column - 2),
      ],
      //sol çapraz
      [
        row + "/" + column,
        row - 1 + "/" + (column - 1),
        row + 1 + "/" + (column + 1),
      ],
      //tıklananın sağ çapraz 2 altı
      [
        row + "/" + column,
        row + 1 + "/" + (column + 1),
        row + 2 + "/" + (column + 2),
      ],
      //tıklananın sol çapraz 2 üstü
      [
        row + "/" + column,
        row - 1 + "/" + (column - 1),
        row - 2 + "/" + (column - 2),
      ],
    ];
  };
  const test = (index) => {
    if (newSquares[index] === "") {
      //Tıklanan hücreye "X" koy
      newSquares[index] = "X";
      //Boş hücreleri bul
      const blanks = [];
      for (let blank in newSquares) {
        // blanks.push = newSquares[blank] === "" ? blanks : null;
        if (newSquares[blank] === "") {
          blanks.push(blank);
        }
      }
      //Boş hücrelerden rastgele birine "O" koy
      const tourOfBot = blanks[randomNumbers(0, blanks.length)];
      // console.log(tourOfBot);
      // console.log(blanks);
      newSquares[tourOfBot] = "O";
      const selectedRowForBot =
        parseInt(tourOfBot.slice(0, 2)) <= 9
          ? parseInt(tourOfBot.slice(0, 1))
          : parseInt(tourOfBot.slice(0, 2));
      const selectedColumnForBot =
        parseInt(tourOfBot.slice(-2).replace("/", "")) <= 9
          ? parseInt(tourOfBot.slice(-1))
          : parseInt(tourOfBot.slice(-2));

      //Kazançları hesaplama
      const selectedRow =
        parseInt(index.slice(0, 2)) <= 9
          ? parseInt(index.slice(0, 1))
          : parseInt(index.slice(0, 2));
      const selectedColumn =
        parseInt(index.slice(-2).replace("/", "")) <= 9
          ? parseInt(index.slice(-1))
          : parseInt(index.slice(-2));

      const userArr = createArr(selectedRow, selectedColumn);
      const botArr = createArr(selectedRowForBot, selectedColumnForBot);
      for (let i = 0; i < userArr.length; i++) {
        const [a, b, c] = botArr[i];
        const [x, y, z] = userArr[i];
        // const [botSquares, botNewSquares] = useState(botSquaresList);
        // // const [squares, setSquares] = useState(Array(9).fill(null));
        // const [botBtnClass, setBotBtnClass] = useState(botClassList);
        // const [botWinnerSquares, setBotNewWinnerSquares] =
        //   useState(botWinnerSquaresList);
        if (
          newSquares[x] &&
          newSquares[x] === newSquares[y] &&
          newSquares[x] === newSquares[z]
        ) {
          //Eğer dikeyde kazandıysa
          console.log("X---->>", i);
          // console.log(
          //   "X İÇİN",
          //   newWinnerSquaresList[x],
          //   newWinnerSquaresList[y],
          //   newWinnerSquaresList[z]
          // );

          if (i === 0 || i === 1 || i === 2) {
            if (
              !newWinnerSquaresList[x].vertical &&
              !newWinnerSquaresList[y].vertical &&
              !newWinnerSquaresList[z].vertical
            ) {
              btnClass[x] = "btn-win-blue";
              btnClass[y] = "btn-win-blue";
              btnClass[z] = "btn-win-blue";
              newWinnerSquaresList[x].vertical = true;
              newWinnerSquaresList[y].vertical = true;
              newWinnerSquaresList[z].vertical = true;
            }
          }
          if (i === 3 || i === 4 || i === 5) {
            if (
              !newWinnerSquaresList[x].horizontal &&
              !newWinnerSquaresList[y].horizontal &&
              !newWinnerSquaresList[z].horizontal
            ) {
              btnClass[x] = "btn-win-blue";
              btnClass[y] = "btn-win-blue";
              btnClass[z] = "btn-win-blue";
              newWinnerSquaresList[x].horizontal = true;
              newWinnerSquaresList[y].horizontal = true;
              newWinnerSquaresList[z].horizontal = true;
            }
          }
          if (i === 6 || i === 7 || i === 8) {
            if (
              !newWinnerSquaresList[x].rightCross &&
              !newWinnerSquaresList[y].rightCross &&
              !newWinnerSquaresList[z].rightCross
            ) {
              btnClass[x] = "btn-win-blue";
              btnClass[y] = "btn-win-blue";
              btnClass[z] = "btn-win-blue";
              newWinnerSquaresList[x].rightCross = true;
              newWinnerSquaresList[y].rightCross = true;
              newWinnerSquaresList[z].rightCross = true;
            }
          }
          if (i === 9 || i === 10 || i === 11) {
            if (
              !newWinnerSquaresList[x].leftCross &&
              !newWinnerSquaresList[y].leftCross &&
              !newWinnerSquaresList[z].leftCross
            ) {
              btnClass[x] = "btn-win-blue";
              btnClass[y] = "btn-win-blue";
              btnClass[z] = "btn-win-blue";
              newWinnerSquaresList[x].leftCross = true;
              newWinnerSquaresList[y].leftCross = true;
              newWinnerSquaresList[z].leftCross = true;
            }
          }
        }

        //Bot kazandıysa
        console.log(newSquares[a], newSquares[b], newSquares[c]);
        if (
          newSquares[a] &&
          newSquares[a] === newSquares[b] &&
          newSquares[a] === newSquares[c]
        ) {
          //Eğer dikeyde kazandıysa
          console.log("O*******>", i);
          if (i === 0 || i === 1 || i === 2) {
            if (
              !newWinnerSquaresList[a].vertical &&
              !newWinnerSquaresList[b].vertical &&
              !newWinnerSquaresList[c].vertical
            ) {
              console.log("i ye girdi dikey");
              btnClass[a] = "btn-win-red";
              btnClass[b] = "btn-win-red";
              btnClass[c] = "btn-win-red";
              newWinnerSquaresList[a].vertical = true;
              newWinnerSquaresList[b].vertical = true;
              newWinnerSquaresList[c].vertical = true;
            }
          }
          if (i === 3 || i === 4 || i === 5) {
            if (
              !newWinnerSquaresList[a].horizontal &&
              !newWinnerSquaresList[b].horizontal &&
              !newWinnerSquaresList[c].horizontal
            ) {
              console.log("i ye girdi yatay");
              btnClass[a] = "btn-win-red";
              btnClass[b] = "btn-win-red";
              btnClass[c] = "btn-win-red";
              newWinnerSquaresList[a].horizontal = true;
              newWinnerSquaresList[b].horizontal = true;
              newWinnerSquaresList[c].horizontal = true;
            }
          }
          if (i === 6 || i === 7 || i === 8) {
            if (
              !newWinnerSquaresList[a].rightCross &&
              !newWinnerSquaresList[b].rightCross &&
              !newWinnerSquaresList[c].rightCross
            ) {
              console.log("i ye girdi sağ çağraz");
              btnClass[a] = "btn-win-red";
              btnClass[b] = "btn-win-red";
              btnClass[c] = "btn-win-red";
              newWinnerSquaresList[a].rightCross = true;
              newWinnerSquaresList[b].rightCross = true;
              newWinnerSquaresList[c].rightCross = true;
            }
          }
          if (i === 9 || i === 10 || i === 11) {
            if (
              !newWinnerSquaresList[a].leftCross &&
              !newWinnerSquaresList[b].leftCross &&
              !newWinnerSquaresList[c].leftCross
            ) {
              console.log("i ye girdi sol çağraz");
              btnClass[a] = "btn-win-red";
              btnClass[b] = "btn-win-red";
              btnClass[c] = "btn-win-red";
              newWinnerSquaresList[a].leftCross = true;
              newWinnerSquaresList[b].leftCross = true;
              newWinnerSquaresList[c].leftCross = true;
            }
          }
        }
      }
    }

    setNewSquares({ ...newSquares });
  };
  return (
    <div className="container">
      {arrRow.map(function (each, indexRow) {
        return (
          <div className="board-row" key={indexRow}>
            {arrColumn.map(function (each, indexColumn) {
              return (
                <div
                  className={btnClass[indexRow + "/" + indexColumn]}
                  // onClick={() =>
                  onClick={() => test(indexRow + "/" + indexColumn)}
                  key={indexColumn}
                >
                  {newSquares[indexRow + "/" + indexColumn]}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default App;
