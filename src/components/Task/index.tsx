import { ChangeEvent, useState } from "react";

import { TrashSimple } from "phosphor-react";

import { useEffect } from "react";

import { Checkbox } from "../Checkbox";

import classNames from "classnames";

import styles from "./Task.module.scss";

export interface TaskProps {
	id: string;
	description: string;
	complete: boolean;
}
interface TaskPropsI {
	onCompleteChange: (id: string) => void;
	onDeleteTask: (id: string) => void;
	task: TaskProps;
}

export function Task({ task, onCompleteChange, onDeleteTask }: TaskPropsI) {
	function handleChangeCheckbox(event: ChangeEvent<HTMLInputElement>) {
		onCompleteChange(task.id);
	}
	function handleDeleteTask() {
		onDeleteTask(task.id);
	}

	return (
		<div className={classNames(styles.task, { [styles["task--complete"]]: task.complete })}>
			<Checkbox onChange={handleChangeCheckbox} />
			<p>{task.description}</p>
			<TrashSimple className={styles["task__delete-icon"]} size={20} onClick={handleDeleteTask} />
		</div>
	);
}
