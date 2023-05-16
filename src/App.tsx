import { useState, useEffect } from "react";

import { Task, TaskProps } from "./components/Task";

import swal from "sweetalert";

import { v4 as uuidv4 } from "uuid";

import { PlusCircle } from "phosphor-react";

import styles from "./App.module.scss";

function App() {
	const [tasks, setTasks] = useState<TaskProps[]>([]);
	const [inputTaskText, setInputTaskText] = useState("");
	const [quantityCompletedTasks, setQuantityCompletedTasks] = useState(0);

	useEffect(() => {
		const quantityCompletedTasks = tasks.filter((task) => task.complete).length;

		setQuantityCompletedTasks(quantityCompletedTasks);
	}, [tasks]);

	async function confirmRemoveTask() {
		return swal({
			title: "Tem certeza que deseja remover?",
			text: "Uma vez removido não será possivel recuperar!",
			icon: "warning",
			buttons: [true, true],
			dangerMode: true,
		});
	}

	async function handleRemoveTask(id: string) {
		const isConfirmed = await confirmRemoveTask();

		if (isConfirmed) {
			const newArrFiltred = tasks.filter((todo) => todo.id !== id);
			setTasks(newArrFiltred);
		}
	}

	function handleChangeCompleteTask(id: string | number[]) {
		const newTasksArr = tasks.map((task) => {
			if (task.id === id) {
				return { ...task, complete: !task.complete };
			} else {
				return { ...task };
			}
		});

		setTasks(newTasksArr);
	}

	function isInputTextValid() {
		if (inputTaskText.length > 0) {
			return true;
		} else {
			swal({
				title: "Preencha o input",
				icon: "warning",
			});
		}
	}

	function handleAddNewTask() {
		const isUpToCreateANewTask = isInputTextValid();
		if (isUpToCreateANewTask) {
			const task = {
				id: uuidv4(),
				complete: false,
				description: inputTaskText,
			};

			setTasks([...tasks, task]);
			setInputTaskText("");
		}
	}

	return (
		<>
			<header className={styles.header}>
				<img src="/src/assets/images/logo.svg" alt="Logo" />
			</header>
			<main className={styles.main}>
				<form onSubmit={(e) => e.preventDefault()} className={styles.form}>
					<input
						value={inputTaskText}
						onChange={(e) => setInputTaskText(e.target.value)}
						name="task"
						placeholder="Adicione uma nova tarefa"
						type="text"
					/>
					<button onClick={handleAddNewTask}>
						Criar
						<PlusCircle size={20} />
					</button>
				</form>

				<div className={styles["content-info-tasks"]}>
					<div>
						<span className={styles["created-tasks"]}>Tarefas criadas</span>
						<button className={styles["button-info"]}>{tasks.length}</button>
					</div>
					<div>
						<span className={styles["completed-tasks"]}>Concluídas</span>
						<button className={styles["button-info"]}>{quantityCompletedTasks}</button>
					</div>
				</div>

				<div>
					{tasks.length ? (
						tasks.map((task) => {
							return (
								<Task
									onDeleteTask={handleRemoveTask}
									key={task.id}
									onCompleteChange={(id) => handleChangeCompleteTask(id)}
									task={task}
								/>
							);
						})
					) : (
						<div className={styles["empty-tasks"]}>
							<img src="/src/assets/images/tasks.svg" alt="Tasks" />
							<strong>Você ainda não tem tarefas cadastradas</strong>
							<span>Crie tarefas e organize seus itens a fazer</span>
						</div>
					)}
				</div>
			</main>
		</>
	);
}

export default App;
