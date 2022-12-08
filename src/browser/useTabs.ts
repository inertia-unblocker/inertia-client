import { useState } from 'react';

interface Snapshot {
	id: number;
	url: string;
}

interface Tab {
	id: number;
	url: string;
	history: Snapshot[];
	isActive: boolean;
}

export function useTabs() {
	const [tabs, setTabs] = useState<Tab[]>([]);

	const getTab = (id: number) => tabs.find((tab) => tab.id === id);

	const addTab = (url: string) => {
		const id = tabs.length;
		const tab = { id, url, history: [{ id: 0, url }], isActive: true };
		setTabs([...tabs, tab]);
	};

	const removeTab = (id: number) => {
		const newTabs = tabs.filter((tab) => tab.id !== id);
		setTabs(newTabs);
	};

	const takeSnapshot = (id: number) => {
		const tab = getTab(id);
		if (!tab) return;
		const snapshot = { id: tab.history.length, url: tab.url };
		return snapshot;
	};

	const replaceTab = (id: number, newTab: Tab) => {
		const newTabs = tabs.map((tab) => (tab.id === id ? newTab : tab));
		setTabs(newTabs);
	};

	const setTab = (id: number, url: string) => {
		const snapshot = takeSnapshot(id);
		const tab = getTab(id);

		if (!tab || !snapshot) return;

		const newTab = { ...tab, url, history: [...tab.history, snapshot], isActive: true };
		replaceTab(id, newTab);
	};

	const goBack = (id: number) => {
		const tab = getTab(id);
		const snapshot = tab?.history[tab.history.length - 2];

		if (!tab || !snapshot) return;

		const newTab = {
			...tab, history: tab.history.filter((snapshot) =>
				snapshot.id >= tab.history.length - 1
			), url: snapshot.url
		};

		replaceTab(id, newTab);
	};

	const setActive = (id: number) => {
		const newTabs = tabs.map((tab) => ({ ...tab, isActive: tab.id === id }));
		setTabs(newTabs);
	};

	return {
		getTab,
		addTab,
		removeTab,
		setTab,
		goBack,
		setActive,
		tabs
	};
}