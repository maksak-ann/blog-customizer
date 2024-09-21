import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';
import {clsx} from "clsx";

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

type ArrowButtonProps = {
	opened: boolean;
	onClick: OnClick;
};

export const ArrowButton = (props: ArrowButtonProps) => {
	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			onClick={props.onClick}
			className={clsx(styles.container, props.opened && styles.container_open)}>
			<img src={arrow} alt='иконка стрелочки' className={clsx(styles.arrow, props.opened &&  styles.arrow_open)} />
		</div>
	);
};
