export interface Task {
  id: number;
  title: string;
}

// Category.ts
export interface Category {
    id: number;
    title: string;
    color: string;
    // icon: string;
    tasks: Task[];
  }
  