import Todo from "./views/todo";

const routesConfig = [
    {
        path:"/",
        component:Todo,
        exact:true
    },
    {
        path:"/todo-list",
        component:Todo,
        exact:true
    },
]

export default routesConfig