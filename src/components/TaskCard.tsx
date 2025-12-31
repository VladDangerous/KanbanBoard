import React from "react";
import type { Issue } from "../types/types";

interface TaskCardProps {
  task: Issue;
  onClick: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        background: "white",
        padding: "8px",
        marginBottom: "8px",
        borderRadius: "6px",
        cursor: "pointer",
        border: "1px solid #ddd",
      }}
    >
      {task.name}
    </div>
  );
};

export default TaskCard;
