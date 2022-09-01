// import todoList from "./todolist";

// const Storage = () => {
//   const proto = {
//     saveData: (data) => {
//       localStorage.setItem("todolist", JSON.stringify(data));
//     },

//     getTodoList: () => {
//       const todolist = Object.assign(
//         todoList(),
//         JSON.parse(localStorage.getItem("todolist"))
//       );

//       console.log(todolist.getProjects());
//       console.log(localStorage.getItem("todolist"));

//       todolist
//         .getProjects()
//         .map((projecto) => Object.assign(project(), projecto));

//       return todolist;
//     },
//   };

//   return Object.assign(Object.create(proto));
// };

// export default Storage;
