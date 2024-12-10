const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

export default function GameBoard({ onSelectSquare, turns }) {
    let board = initialGameBoard;

    for (const turn of turns) {
        const { square, player } = turn;
        board[square.row][square.col] = player;
    }

    return (
        <ol id="game-board">
            {board.map((row, rowIndex) => <li key={rowIndex}>
                <ol>
                    {
                        row.map((col, colIndex) => {
                            return (<li key={colIndex}>
                                <button 
                                 onClick={() => onSelectSquare(rowIndex, colIndex)}>
                                    {col}
                                </button>
                            </li>)})
                    }
                </ol>
            </li>)}
        </ol>
    )
}