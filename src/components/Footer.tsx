import React from "react";
import type { BoardData } from "../types/types";

interface Props {
  board: BoardData;
}

const Footer: React.FC<Props> = ({ board }) => {
  const activeCount =
    board.find((c) => c.id === "backlog")?.issues.length || 0;
  const finishedCount =
    board.find((c) => c.id === "finished")?.issues.length || 0;

  return (
    <footer
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        background: "#0067A3",
        color: "white",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 20px",
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ marginRight: "36px" }}>
            Active tasks: <b style={{fontWeight: "400"}}>{activeCount}</b>
          </span>
          <span>
            Finished tasks: <b style={{fontWeight: "400"}}>{finishedCount}</b>
          </span>
        </div>

        <div>
          Kanban board by &lt;NAME&gt;, &lt;YEAR&gt;
        </div>
      </div>
    </footer>
  );
};

export default Footer;
