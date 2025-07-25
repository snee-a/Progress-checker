// App.jsx
import React, { useEffect, useState } from 'react';
import './App.css';

const getDateKey = (date) => {
  return 'progress-' + date.toISOString().split('T')[0];
};

function App() {
  const today = new Date();
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [historyDate, setHistoryDate] = useState('');
  const [historyTasks, setHistoryTasks] = useState([]);

  const loadTodayTasks = () => {
    const key = getDateKey(today);
    const saved = localStorage.getItem(key);
    if (saved) setTasks(JSON.parse(saved));
  };

  useEffect(() => {
    loadTodayTasks();
  }, []);

  useEffect(() => {
    const key = getDateKey(today);
    localStorage.setItem(key, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() === '') return;
    setTasks([...tasks, { text: newTask, done: false }]);
    setNewTask('');
  };

  const toggleTask = (index) => {
    const updated = [...tasks];
    updated[index].done = !updated[index].done;
    setTasks(updated);
  };

  const viewHistory = () => {
    if (!historyDate) return;
    const key = 'progress-' + historyDate;
    const saved = localStorage.getItem(key);
    if (saved) setHistoryTasks(JSON.parse(saved));
    else setHistoryTasks([]);
  };

  return (
    <div className="app-container">
      <h1>🌟 Daily Progress Tracker</h1>
      <p className="quote">“One small progress each day adds up to big results.”</p>

      <div className="section">
        <h2>📅 Today's Tasks</h2>
        <div className="task-input">
          <input
            type="text"
            placeholder="Add a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button onClick={addTask}>➕ Add</button>
        </div>

        <ul className="task-list">
          {tasks.map((task, index) => (
            <li
              key={index}
              className={task.done ? 'done' : ''}
              onClick={() => toggleTask(index)}
            >
              {task.done ? '✅' : '⬜'} {task.text}
            </li>
          ))}
        </ul>
      </div>

      <div className="section">
        <h2>🕰️ View Progress History</h2>
        <input
          type="date"
          value={historyDate}
          onChange={(e) => setHistoryDate(e.target.value)}
        />
        <button onClick={viewHistory}>📂 Load History</button>

        {historyDate && (
          <div className="history">
            <h3>Progress on {historyDate}</h3>
            {historyTasks.length === 0 ? (
              <p>No data found.</p>
            ) : (
              <ul>
                {historyTasks.map((task, i) => (
                  <li key={i} className={task.done ? 'done' : ''}>
                    {task.done ? '✅' : '❌'} {task.text}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
