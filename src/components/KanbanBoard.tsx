import React from "react";
import type { BoardData } from "../types/types";
import Column from "./Column";
import styles from "./KanbanBoard.module.css";

interface Props {
  board: BoardData;
  setBoard: (board: BoardData) => void;
}

const KanbanBoard: React.FC<Props> = ({ board, setBoard }) => (
  <div className={styles.wrapper}>
    <div className={styles.board}>
      {board.map((col) => (
        <Column
          key={col.id}
          column={col}
          board={board}
          setBoard={setBoard}
        />
      ))}
    </div>
  </div>
);

export default KanbanBoard;
