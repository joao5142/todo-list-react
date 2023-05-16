import styles from "./Checkbox.module.scss";
import { InputHTMLAttributes } from "react";

export function Checkbox({ ...props }: InputHTMLAttributes<HTMLInputElement>) {
	return <input className={styles.checkbox} type="checkbox" name="checkbox" {...props} />;
}
