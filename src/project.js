const project = (name) => {
  let tasks = [];
  const proto = {
    addTask: (task) => {
      tasks.push(task);
    },
    deleteTask: (taskTitle) => {
      tasks = tasks.filter((task) => task.title != taskTitle);
    },
    getTasks: () => {
      return tasks;
    },
  };
  return Object.assign(Object.create(proto), { name });
};

const createNewProject = () => {
  const newProject = project(document.getElementById("projectInput").value);

  return newProject;
};

export { project, createNewProject };
