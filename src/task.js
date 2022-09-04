const task = (title, notes, dueDate = 'No date', priority = 'Low') => ({
  title,
  notes,
  dueDate,
  priority,
});

const createNewTask = () => {
  const newTask = task(
    document.getElementById('titleInput').value,
    document.getElementById('notesInput').value,
    document.getElementById('dateInput').value,
    document.getElementById('priorityInput').value
  );

  return newTask;
};

export default createNewTask;
