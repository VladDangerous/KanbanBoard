import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BoardData } from "./types/types";
import { loadBoard, saveBoard } from "./utils/localStorage";
import KanbanBoard from "./components/KanbanBoard";
import TaskDetailPage from "./components/TaskDetailPage";
import Footer from "./components/Footer";
import UserMenu from "./components/UserMenu";
import "./App.css";

const initialData: BoardData = [
  { id: "backlog", title: "Backlog", issues: [],},
  { id: "ready", title: "Ready", issues: [] },
  { id: "in-progress", title: "In Progress", issues: [] },
  { id: "finished", title: "Finished", issues: [] },
];

const App: React.FC = () => {
  const [board, setBoard] = useState<BoardData>(() => loadBoard() || initialData);

  useEffect(() => {
    saveBoard(board);
  }, [board]);

  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <span
            style={{
              margin: "5px 0 5px 14px",
              padding: "6px 0 13px 6px",
              color: "white",
              fontSize: "28px",
            }}
          >
            Awesome Kanban Board
          </span>

          <div style={{ margin: "7px 16px 8px 0",}}>
            <UserMenu />
          </div>
        </header>
        <div className="board-layout">
          <div className="board-container">
            <Routes>
              <Route
                path="/"
                element={<KanbanBoard board={board} setBoard={setBoard} />}
              />
              <Route
                path="/tasks/:id"
                element={<TaskDetailPage board={board} setBoard={setBoard} />}
              />
            </Routes>
          </div>
        </div>
        <Footer board={board} />
      </div>
    </BrowserRouter>
  );
};

export default App;
