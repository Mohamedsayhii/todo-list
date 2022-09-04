import { project } from './project';

const todoList = () => {
  let projects = [];
  projects.push(project('Home'));
  projects.push(project('Today'));
  projects.push(project('Week'));
  const proto = {
    getProjects: () => projects,

    addProject: (project) => {
      projects.push(project);
    },
    deleteProject: (projectName) => {
      projects = projects.filter((project) => project.name !== projectName);
    },
  };

  return Object.assign(Object.create(proto));
};

export default todoList;
