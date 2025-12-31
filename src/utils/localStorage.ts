import { BoardData } from "../types/types";

const STORAGE_KEY = "kanban-board";

export const saveBoard = (board: BoardData) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(board));
};

export const loadBoard = (): BoardData | null => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : null;
};