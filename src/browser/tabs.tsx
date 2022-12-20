/* eslint-disable @next/next/no-img-element */
import EventEmitter from 'events';

import { Card, Text } from '@nextui-org/react';
import { Dispatch, SetStateAction, useState } from 'react';

import { Button } from '@components/button';
import styles from '@css/browser.module.css';


class State<T> {
	private value: T = new Object() as T;

	constructor(initialValue?: T) {
		if (initialValue) this.value = initialValue;
	}

	get = (): T => this.value;
	set = (value: T) => this.value = value;
}

interface Snapshot {
	id: number;
	url: string;
}

export interface TabType {
	id: number;
	url: string;
	history: Snapshot[];
	isActive: boolean;
	title: string,
	icon: string,
	loading: boolean
}

export interface TabTypeUpdate {
	url?: string;
	title?: string;
	icon?: string;
	loading?: boolean;
}

export class TabManager extends EventEmitter {
	private tabs: {
		get: TabType[],
		set: Dispatch<SetStateAction<TabType[]>>
	};

	constructor(tabs: TabType[], setTabs: Dispatch<SetStateAction<TabType[]>>) {
		super();

		this.tabs = {
			get: tabs,
			set: setTabs
		};

		this.emit('ready', this);
	}

	get = (id: number) => this.tabs.get.find((tab) => tab.id === id);

	add = (url: string) => {
		const id = Date.now() + Math.random();

		const tab = {
			id,
			url,
			history: [{ id: 0, url }],
			isActive: true,
			title: 'Loading...',
			icon: '/default-fav.svg',
			loading: true
		};

		const newTabs = [...this.tabs.get, tab].map((tab) => ({ ...tab, isActive: tab.id === id }));
		this.tabs.set(newTabs);

		this.emit('added', tab);

		return tab;
	};

	remove = (id: number) => {
		const newTabs = this.tabs.get.filter((tab) => tab.id !== id);
		const activeTab = Math.floor(Math.random() * newTabs.length);
		const newActiveTabs = newTabs.map((tab, i) => ({ ...tab, isActive: i === activeTab }));

		this.tabs.set(newActiveTabs);

		this.emit('removed', id);
	};

	update = (id: number, update: TabTypeUpdate) => {
		const snapshot = this.snapshot(id);
		const tab = this.get(id);

		if (!tab || !snapshot) return;

		const newTab = { ...tab, ...update, history: [...tab.history, snapshot] };
		this.rewrite(id, newTab);

		this.emit('updated', newTab);

		return newTab;
	};

	show = (id: number) => {
		const newTabs = this.tabs.get.map((tab) => ({ ...tab, isActive: tab.id === id }));
		this.tabs.set(newTabs);

		this.emit('shown', id);
	};

	get shown() {
		return this.tabs.get.find((tab) => tab.isActive)?.id;
	}

	rollback = (id: number) => {
		const tab = this.get(id);
		const snapshot = tab?.history[tab.history.length - 2];

		if (!tab || !snapshot) return;

		const newTab = {
			...tab, history: tab.history.filter((snapshot) =>
				snapshot.id >= tab.history.length - 1
			), url: snapshot.url
		};

		this.rewrite(id, newTab);

		this.emit('backed', newTab);

		return newTab;
	};

	get all() {
		return this.tabs.get;
	}

	private snapshot = (id: number): Snapshot | void => {
		const tab = this.get(id);
		if (!tab) return;
		const snapshot = { id: tab.history.length, url: tab.url };

		return snapshot;
	};

	private rewrite = (id: number, newTab: TabType) => {
		const oldTab = this.tabs.get.find((tab) => tab.id === id);
		const newTabs = this.tabs.get.map((tab) => (tab.id === id ? newTab : tab));
		this.tabs.set(newTabs);

		this.emit('tabReplaced', newTab, oldTab);
	};
}

export function Tab({ tab, manager }: { tab: TabType, manager: TabManager }) {
	return (
		<Card css={{
			background: tab.isActive ? '$primary' : 'transparent',
			height: tab.isActive ? '2.01rem' : '2rem',
			maxWidth: tab.isActive ? '15.1rem' : '15rem',
			width: `${100 / manager.all.length}%`,
			borderRadius: '.25rem',
			border: tab.isActive ? 'none' : '1px solid $border',
			transitionDuration: '0.2s',
			marginRight: '.5rem',
		}} onPress={() => manager.show(tab.id)} isPressable>
			<Card.Body css={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: 0, justifyContent: 'space-between' }}>
				<div style={{ display: 'flex', overflow: 'hidden' }}>
					<img alt='favicon' className={styles.tabImage} height={16} src={tab.icon} width={16} />
					<Text className={styles.tabTitle} size='$sm'>{tab.title}</Text>
				</div>
				<Button onClick={
					() => manager.remove(tab.id)
				} style={{
					width: '1.25rem',
					height: '1.25rem',
					marginRight: '.5rem',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}} type='transparent'>
					<Text size='$md'>&times;</Text>
				</Button>
			</Card.Body>
		</Card>
	);
}