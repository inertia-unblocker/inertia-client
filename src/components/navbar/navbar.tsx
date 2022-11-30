import { useRouter } from 'next/router';

import { Button, Dropdown, Navbar as NextUINavbar, Text, User } from '@nextui-org/react';
import { signOut, useSession } from 'next-auth/react';
import { Key } from 'react';
import { Session } from 'next-auth';

import { Link, NavbarLink } from '@components/link';
import { Inertia as InertiaIcon } from '@components/icons';
import { NavbarProps } from '@props';
import { UseLoginModal } from '@components/modals';


export function Navbar({ ...props }: NavbarProps) {
	const [loginModalVisible, LoginModal] = UseLoginModal();

	const { pathname } = useRouter();
	const { data: session } = useSession() as { data: Session };

	const actionHandler = (key: Key) => {
		switch (key) {
			case 'logout':
				signOut();
				break;
		}
	};

	const loginHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		loginModalVisible(true);
	};

	return (
		<>
			<NextUINavbar css={{ marginBottom: '2rem' }} variant={'floating'} isBordered {...props}>
				<NextUINavbar.Brand>
					<Link href='/'>
						<div style={{ marginRight: '1rem' }}>
							<InertiaIcon />
						</div>
						<Text css={{ textGradient: '$gradient', margin: 0 }} h3>
							Inertia
						</Text>
					</Link>
				</NextUINavbar.Brand>

				<NextUINavbar.Content css={{ marginLeft: '-6.3rem' }} variant={'underline-rounded'}>
					<NavbarLink color={'text'} href='/browser' isActive={pathname == '/browser'} underline>Browser</NavbarLink>
					<NavbarLink color={'text'} href='/vpn' isActive={pathname == '/vpn'} underline>VPN</NavbarLink>
					<NavbarLink color={'text'} href='/about' isActive={pathname == '/about'} underline>About</NavbarLink>
					<NavbarLink color={'text'} href='/settings' isActive={pathname == '/settings'} underline>Settings</NavbarLink>
				</NextUINavbar.Content>

				<NextUINavbar.Content>
					{session ? (
						<NextUINavbar.Item>
							<Dropdown placement='bottom-right'>
								<Dropdown.Trigger>
									<User
										as='button'
										description={session.user?.email || ''}
										name={session.user?.name || 'User'}
										src={session.user?.image || ''}
										bordered
									/>
								</Dropdown.Trigger>
								<Dropdown.Menu color='primary' onAction={actionHandler}>
									<Dropdown.Item key='profile' css={{ height: '$18' }}>
										<Text css={{ d: 'flex' }} b>Signed in as</Text>
										<Text css={{ d: 'flex' }} >{session.user?.name || 'User'}</Text>
									</Dropdown.Item>
									<Dropdown.Item key='logout' color='error' withDivider>Log Out</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
						</NextUINavbar.Item>
					) : (
						<>
							<NextUINavbar.Item>
								<Button onClick={loginHandler} auto bordered>Sign In</Button>
							</NextUINavbar.Item>
						</>
					)}
				</NextUINavbar.Content>
			</NextUINavbar>

			<LoginModal />
		</>
	);
}