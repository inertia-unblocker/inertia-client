export function pagesFS() {
	const parenter = {
		set: function (target, prop, value) {
			if (typeof value === 'object') {
				let targetObjectMod;
				let folderData;
				let p;

				if (prop == 'subpages') {
					targetObjectMod = target.parent;
					folderData = { ...target };

					delete folderData.parent;
					delete folderData.subpages;
					delete folderData.folderData;

					p = new Proxy({ parent: targetObjectMod, folderData: folderData }, parenter);
				} else {
					targetObjectMod = target;
					p = new Proxy({ parent: targetObjectMod }, parenter);
				}

				for (let key in value) {
					p[key] = value[key];
				}

				return target[prop] = p;
			} else {
				target[prop] = value;
			}

			return true;
		}
	};

	let root = new Proxy({}, parenter);
	root = [
		{
			type: 'page',
			title: 'Guides',
			url: '/guides'
		},
		{
			type: 'page',
			title: 'Browser',
			url: '/browser'
		},
		{
			type: 'folder',
			title: 'Info',
			url: '/info',
			subpages: [
				{
					type: 'page',
					title: 'About',
					url: '/info/about'
				},
				{
					type: 'page',
					title: 'Changelog',
					url: '/info/changelog'
				},
				{
					type: 'page',
					title: 'Contact',
					url: '/info/contact'
				},
				{
					type: 'page',
					title: 'Credits',
					url: '/info/credits'
				},
				{
					type: 'page',
					title: 'License',
					url: '/info/license'
				}
			]
		},
	];

	return root;
}