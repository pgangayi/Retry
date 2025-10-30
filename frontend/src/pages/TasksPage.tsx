import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';

interface Task {
  id: string;
  farm_id: string;
  title: string;
  description?: string;
  status: 'pending' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  due_date?: string;
  created_at: string;
}

export function TasksPage() {
  const { data: tasks, isLoading, error } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Task[];
    }
  });

  if (isLoading) return <div>Loading tasks...</div>;
  if (error) return <div>Error loading tasks: {error.message}</div>;

  return (
    <div className="tasks-page">
      <h1>Tasks</h1>
      <div className="tasks-list">
        {tasks?.map((task) => (
          <div key={task.id} className="task-card">
            <h2>{task.title}</h2>
            {task.description && <p>{task.description}</p>}
            <p>Status: {task.status}</p>
            <p>Priority: {task.priority}</p>
            {task.due_date && <p>Due: {new Date(task.due_date).toLocaleDateString()}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TasksPage;