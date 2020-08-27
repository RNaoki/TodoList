import React, { Component } from 'react'
import Modal from '../components/modal.js'

class Todo extends Component {

    constructor(props) {
        super(props)
        this.state = {
            tasks: [
                { name: "Learn React", category: "todo", bgcolor: "pink" },
                { name: "Learn Redux", category: "todo", bgcolor: "skyblue" }
            ],
            name: "",
            category: "",
            bgcolor: "",
            show: false
        }
    }

    changeInput = (ev, value) => {
        ev.preventDefault();
        var functions = {
            'color': () => {
                this.setState({
                    ...this.state,
                    bgcolor: ev.target.value
                })
            },
            'name': () => {
                this.setState({
                    ...this.state,
                    name: ev.target.value
                })
            }
        }
        functions[value]();
    }

    showModal = () => {
        this.setState({
            ...this.state,
            show: true,
            sname: "",
            category: "",
            bgcolor: ""
        });
    }

    hideModal = () => {
        this.setState({
            ...this.state,
            show: false,
            sname: "",
            category: "",
            bgcolor: "",
        });
    }

    onDragStart = (ev, id) => {
        console.log('dragstart:', id);
        ev.dataTransfer.setData("id", id);
    }

    onDragOver = (ev) => {
        ev.preventDefault();
    }

    onDrop = (ev, cat) => {
        let id = ev.dataTransfer.getData("id");

        let tasks = this.state.tasks.filter((task) => {
            if (task.name === id) {
                task.category = cat;
            }
            return task;
        });

        this.setState({
            ...this.state,
            tasks
        });
    }

    addTask = (name, bgcolor) => {
        var brightness = this.checkColor(bgcolor)
        if(brightness >= 100){
            this.state.tasks.push({ name: name, category: 'todo', bgcolor: bgcolor, color: "rgb(26, 32, 41)" })
        }else{
            this.state.tasks.push({ name: name, category: 'todo', bgcolor: bgcolor, color: "hsl(0, 0%, 87%)" })
        }
        this.setState({
            ...this.state,
            sname: "",
            category: "",
            bgcolor: "",
            show: false
        });
    }

    checkColor = (bgcolor) => {
        var tinycolor = require("tinycolor2");
        var color = tinycolor(bgcolor);
        return color.getBrightness()
    }

    render() {

        var tasks = {
            todo: [],
            doing: [],
            complete: []
        }

        this.state.tasks.forEach((t) => {
            tasks[t.category].push(
                <div key={t.name}
                    onDragStart={(e) => this.onDragStart(e, t.name)}
                    draggable
                    className="draggable"
                    style={{ backgroundColor: t.bgcolor, color: t.color }}
                >
                    {t.name}
                </div>
            );
        });

        return (
            <div>
                <div className="split left">
                    <div className="centered">
                        <div className="title">
                            TODO-LIST
                            <button className="add-button" onClick={this.showModal}>+</button>
                        </div>
                        <div className="activities">
                            <div className="container-drag">
                                <div className="droppable"
                                    onDragOver={(e) => this.onDragOver(e)}
                                    onDrop={(e) => { this.onDrop(e, "todo") }}>
                                    {tasks.todo}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="split middle">
                        <div className="centered">
                            <div className="title">
                                DOING
                            </div>
                            <div className="container-drag">
                                <div className="droppable"
                                    onDragOver={(e) => this.onDragOver(e)}
                                    onDrop={(e) => { this.onDrop(e, "doing") }}>
                                    {tasks.doing}
                                </div>
                            </div>
                        </div>
                        <Modal show={this.state.show}>
                            <div>
                                <div>
                                    Name:
                            </div>
                                <input className="add-input" value={this.state.name} onChange={(e) => this.changeInput(e, 'name')} />
                            </div>
                            <div>
                                <div>
                                    Color:
                            </div>
                                <input name="Color Picker" type="color" value={this.state.color} onChange={(e) => this.changeInput(e, 'color')} />
                            </div>
                            <div className="buttons">
                                <button className="cancel" onClick={this.hideModal}>CLOSE</button>
                                <button className="save" onClick={() => this.addTask(this.state.name, this.state.bgcolor)}>SAVE</button>
                            </div>
                        </Modal>
                    </div>
                    <div className="split right">
                        <div className="centered">
                            <div className="title">
                                DONE
                            </div>
                            <div className="activities">
                                <div className="droppable"
                                    onDragOver={(e) => this.onDragOver(e)}
                                    onDrop={(e) => this.onDrop(e, "complete")}>
                                    {tasks.complete}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Todo;