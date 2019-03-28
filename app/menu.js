/* eslint-disable import/no-extraneous-dependencies */
/* --------------------------------------------------------
 * Copyright Wata Solutions
 *
 * Author Trần Đức Tiến
 * Email tientran0019@gmail.com
 * Phone 0972970075
 *
 * Created: 2019-03-26 15:54:17
 *------------------------------------------------------- */

import { app, Menu, shell } from 'electron';

export default class MenuBuilder {
	constructor(mainWindow) {
		this.mainWindow = mainWindow;
	}

	buildMenu() {
		if (
			process.env.NODE_ENV === 'development' ||
			process.env.DEBUG_PROD === 'true'
		) {
			this.setupDevelopmentEnvironment();
		}

		const template =
			process.platform === 'darwin'
				? this.buildDarwinTemplate()
				: this.buildDefaultTemplate();

		const menu = Menu.buildFromTemplate(template);
		Menu.setApplicationMenu(menu);

		return menu;
	}

	setupDevelopmentEnvironment() {
		// this.mainWindow.openDevTools();
		this.mainWindow.webContents.on('context-menu', (e, props) => {
			const { x, y } = props;

			Menu.buildFromTemplate([
				{
					label: 'Inspect element',
					click: () => {
						this.mainWindow.inspectElement(x, y);
					},
				},
			]).popup(this.mainWindow);
		});
	}

	// eslint-disable-next-line class-methods-use-this
	buildDarwinTemplate() {
		const subMenuAbout = {
			label: app.getName(),
			role: 'appMenu',
			submenu: [
				{ role: 'about' },
				{ type: 'separator' },
				{ role: 'services' },
				{ type: 'separator' },
				{ role: 'hide' },
				{ role: 'hideothers' },
				{ role: 'unhide' },
				{ type: 'separator' },
				{ role: 'quit' },
			],
		};
		const subMenuEdit = {
			label: 'Edit',
			submenu: [
				{ role: 'undo' },
				{ role: 'redo' },
				{ type: 'separator' },
				{ role: 'cut' },
				{ role: 'copy' },
				{ role: 'paste' },
				{ role: 'pasteandmatchstyle' },
				{ role: 'delete' },
				{ role: 'selectall' },
			],
		};
		const subMenuViewDev = {
			label: 'View',
			submenu: [
				{ role: 'reload' },
				{ role: 'forcereload' },
				{ role: 'toggledevtools' },
				{ type: 'separator' },
				{ role: 'resetzoom' },
				{ role: 'zoomin' },
				{ role: 'zoomout' },
				{ type: 'separator' },
				{ role: 'togglefullscreen' },
			],
		};
		const subMenuViewProd = {
			label: 'View',
			submenu: [
				{ type: 'separator' },
				{ role: 'resetzoom' },
				{ role: 'zoomin' },
				{ role: 'zoomout' },
				{ type: 'separator' },
				{ role: 'togglefullscreen' },
			],
		};
		const subMenuWindow = {
			label: 'Window',
			submenu: [
				{ role: 'close' },
				{ role: 'minimize' },
				{ role: 'zoom' },
				{ type: 'separator' },
				{ role: 'front' },
			],
		};

		const subMenuView =
			process.env.NODE_ENV === 'development'
				? subMenuViewDev
				: subMenuViewProd;

		const subMenuHelp = {
			role: 'Help',
			submenu: [
				{
					label: 'Learn More',
					click() {
						shell.openExternal('https://creativeplanning.com/');
					},
				},
			],
		};

		return [
			subMenuAbout,
			subMenuEdit,
			subMenuView,
			subMenuWindow,
			subMenuHelp,
		];
	}

	buildDefaultTemplate() {
		const templateDefault = [
			{
				label: '&File',
				submenu: [
					{
						label: '&Open',
						accelerator: 'Ctrl+O',
					},
					{
						label: '&Close',
						accelerator: 'Ctrl+W',
						click: () => {
							this.mainWindow.close();
						},
					},
				],
			},
			{
				label: '&View',
				submenu:
					process.env.NODE_ENV === 'development'
						? [
							{
								label: '&Reload',
								accelerator: 'Ctrl+R',
								click: () => {
									this.mainWindow.webContents.reload();
								},
							},
							{
								label: 'Toggle &Full Screen',
								accelerator: 'F11',
								click: () => {
									this.mainWindow.setFullScreen(
										!this.mainWindow.isFullScreen(),
									);
								},
							},
							{
								label: 'Toggle &Developer Tools',
								accelerator: 'Alt+Ctrl+I',
								click: () => {
									this.mainWindow.toggleDevTools();
								},
							},
						  ]
						: [
							{
								label: 'Toggle &Full Screen',
								accelerator: 'F11',
								click: () => {
									// this.mainWindow.toggleDevTools();
									this.mainWindow.setFullScreen(
										!this.mainWindow.isFullScreen(),
									);
								},
							},
						  ],
			},
		];

		return templateDefault;
	}
}
