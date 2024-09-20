import {ArrowButton} from 'components/arrow-button';
import {Button} from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import {FormEvent, useEffect, useRef, useState} from "react";
import {clsx} from "clsx";
import {Select} from "components/select";
import {Text} from "components/text";
import {RadioGroup} from "components/radio-group";
import {Separator} from "components/separator";
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType
} from "src/constants/articleProps";

export type ArticleParamsFormProps = {
	setAppState: (value: ArticleStateType) => void;
};

export const ArticleParamsForm = ({setAppState}: ArticleParamsFormProps) => {
	const [opened, setOpened] = useState(false)

	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);

	const aside = useRef<HTMLElement | null>(null);

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [opened, formState]);

	const handleClickOutside = (event: MouseEvent) => {
		if (opened && aside.current && !aside.current.contains(event.target as Node)) {
			setOpened(false)
		}
	};

	const handleKeyDown = (event: KeyboardEvent) => {
		if (opened && event.key === 'Escape') {
			setOpened(false)
		}
		if (opened && event.key === 'Enter') {
			handleSubmit()
		}
	};

	const handleChange = (fieldName: string) => {
		return (value: OptionType) => {
			setFormState((currentFormState) => ({
				...currentFormState,
				[fieldName]: value,
			}));
		};
	}

	const handleSubmit = (event: FormEvent<HTMLFormElement>|null = null) => {
		if (event) {
			event.preventDefault();
		}
		setAppState(formState);
	};

	const handleReset = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		setFormState(defaultArticleState);
		setAppState(defaultArticleState);
	};

	return (
		<>
			<ArrowButton opened={opened} onClick={() => setOpened(oldOpened => {
				return !oldOpened
			})}/>
			<aside className={clsx(styles.container, opened && styles.container_open)} ref={aside}>
				<form className={styles.form}
					  onSubmit={handleSubmit}
					  onReset={handleReset}>
					<Text uppercase={true} weight={800} size={31}>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleChange('fontFamilyOption')}
					/>
					<RadioGroup
						title='Размер шрифта'
						name='fontSizeOption'
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						onChange={handleChange('fontSizeOption')}
					/>
					<Select
						title='Цвет шрифта'
						selected={formState.fontColor}
						options={fontColors}
						onChange={handleChange('fontColor')}
					/>
					<Separator/>
					<Select
						title='Цвет фона'
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={handleChange('backgroundColor')}
					/>
					<Select
						title='Ширина контента'
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={handleChange('contentWidth')}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
