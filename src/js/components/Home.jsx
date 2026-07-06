import React, { useState, useEffect } from "react";

const USERNAME = "Doomish_Dev";

const Home = () => {
	const [task, setTask] = useState("");
	const [tasks, setTasks] = useState([]);

	const createUser = async () => {
		const response = await fetch(
			`https://playground.4geeks.com/todo/users/${USERNAME}`,
			{
				method: "POST",
			}
		);

		await response.json();
	};

	const getTasks = async () => {
		const response = await fetch(
			`https://playground.4geeks.com/todo/users/${USERNAME}`
		);

		const data = await response.json();

		setTasks(data.todos);
	};

	const deleteTask = async (taskId) => {
		await fetch(
			`https://playground.4geeks.com/todo/todos/${taskId}`,
			{
				method: "DELETE",
			}
		);

		await getTasks();
	};

	const clearAllTasks = async () => {
		await fetch(
			`https://playground.4geeks.com/todo/users/${USERNAME}`,
			{
				method: "DELETE",
			}
		);

		await createUser();
		await getTasks();
	};

	const addTask = async () => {
		if (task.trim() !== "") {
			const newTask = {
				label: task,
				is_done: false,
			};

			await fetch(
				`https://playground.4geeks.com/todo/todos/${USERNAME}`,
				{
					method: "POST",
					body: JSON.stringify(newTask),
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			await getTasks();
			setTask("");
		}
	};

	useEffect(() => {
		const initialize = async () => {
			const response = await fetch(
				`https://playground.4geeks.com/todo/users/${USERNAME}`
			);

			if (response.status === 404) {
				await createUser();
			}

			await getTasks();
		};

		initialize();
	}, []);

	return (
		<div className="container">
			<h1>Lista de Tareas</h1>
			<div className="todo-box">
				<input
					type="text"
					placeholder="¿Qué tareas tienes pendientes?"
					value={task}
					onChange={(event) => setTask(event.target.value)}
					onKeyDown={(event) => {
						if (event.key === "Enter") {
							addTask();
						}
					}}
				/>

				<ul>
					{tasks.length === 0 ? (
						<li className="task-item">
							No hay tareas pendientes, añadir tareas.
						</li>
					) : (
						tasks.map((task) => (
							<li key={task.id} className="task-item">
								{task.label}
								<i
									className="fa-regular fa-circle-xmark delete-btn"
									onClick={() => deleteTask(task.id)}
								></i>
							</li>
						))
					)}
				</ul>
				<div className="todo-footer">
					<p>
						{tasks.length} {tasks.length === 1 ? "tarea pendiente" : "tareas pendientes"}
					</p>

					{tasks.length > 0 && (
						<button className="clear-btn" onClick={clearAllTasks}>
							Borrar Todas
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default Home;