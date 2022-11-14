import * as nextUI from '@nextui-org/react'; 
 
import { Inertia, Premium } from '@icons'; 
import { InternalLink, InternalNavbarLink } from '@elem/internalLink'; 
import { useEffect, useState } from 'react'; 
import { useCookies } from 'react-cookie'; 
import { useRouter } from 'next/router'; 
 
import config from '@cfg'; 
import LoginModal from '../account/login'; 
import navbarStyles from '@css/navbar.module.css'; 
import request from '@lib/request'; 
import SignupModal from '../account/signup'; 
 
export interface NavbarProps extends nextUI.NavbarProps { 
	href?: string; 
	mobile?: boolean; 
} 
 
export function Navbar({ ...props }: NavbarProps) { 
	const [loginModalVisible, setLoginModalVisible] = useState(false); 
	const [signupModalVisible, setSignupModalVisible] = useState(false); 
 
	const openLoginModal = () => setLoginModalVisible(true); 
	const openSignupModal = () => setSignupModalVisible(true); 
 
	const closeLoginModal = () => setLoginModalVisible(false); 
	const closeSignupModal = () => setSignupModalVisible(false); 
 
	const [cookies, setCookie] = useCookies(['loggedIn', 'uid', 'token']); 
 
	const [pfp, setPfp] = useState(`${process.env.HOST}/defaultUser.svg`); 
	const [username, setUsername] = useState('Loading'); 
	const [email, setEmail] = useState('Loading'); 
 
	const router = useRouter(); 
 
	const getUsername = async () => (await request('GET', `/api/user/${cookies.uid}/read/username`, { 
		'Authorization': `Bearer ${cookies.token}`, 
	})).username; 
 
	const getEmail = async () => (await request('GET', `/api/user/${cookies.uid}/read/email`, { 
		'Authorization': `Bearer ${cookies.token}`, 
	})).email; 
 
	const getPfp = async () => { 
		const { icon: pfp } = (await request('GET', `/api/user/${cookies.uid}/read/icon`, { 
			'Authorization': `Bearer ${cookies.token}`, 
		})); 
 
		 
 
		return pfp == 'defaultIcon' ? `${process.env.HOST}/defaultUser.svg` : pfp; 
	}; 
 
	const logout = () => { 
		setCookie('loggedIn', false); 
		setCookie('uid', ''); 
		setCookie('token', ''); 
 
		router.reload(); 
	}; 
 
	useEffect(() => { 
		if (cookies.loggedIn == 'true') { 
			getEmail().then((email: string) => setEmail(email)); 
			getUsername().then((username: string) => setUsername(username)); 
			getPfp().then((pfp: string) => setPfp(pfp)); 
		} 
	}); 
 
	return ( 
		<> 
			{ 
				props.mobile ? ( 
					<> 
					</> 
				) : ( 
					<> 
						<nextUI.Navbar variant={'floating'} isBordered {...props}> 
							<nextUI.Navbar.Brand> 
								<InternalLink href={`${config.prefix}${props.href || '/'}`} underline={false}> 
									<div style={{ marginRight: '1rem' }}> 
										<Inertia /> 
									</div> 
									<nextUI.Text css={{ textGradient: '$gradient', margin: '0' }} h3> 
										Inertia 
									</nextUI.Text> 
								</InternalLink> 
							</nextUI.Navbar.Brand> 
							<nextUI.Navbar.Content variant={'underline-rounded'}> 
								<InternalNavbarLink color={'text'} href='/browser' underline>Browser</InternalNavbarLink> 
								<InternalNavbarLink color={'text'} href='/vpn' underline>VPN&nbsp;<Premium /></InternalNavbarLink> 
								<InternalNavbarLink color={'text'} href='/changelog' underline>Changelog</InternalNavbarLink> 
								<InternalNavbarLink color={'text'} href='/settings' underline>Settings</InternalNavbarLink> 
							</nextUI.Navbar.Content> 
							<nextUI.Navbar.Content> 
								{cookies.loggedIn == 'true' ? 
									( 
										<nextUI.Navbar.Item> 
											<nextUI.Dropdown placement='bottom-right'> 
												<nextUI.Dropdown.Trigger> 
													<nextUI.User 
														as='button' 
														description={email} 
														name={username} 
														src={pfp} 
														bordered 
													/> 
												</nextUI.Dropdown.Trigger> 
												<nextUI.Dropdown.Menu color='primary' onAction={(key) => { 
													if (key == 'logout') { 
														logout(); 
													} 
												}}> 
													<nextUI.Dropdown.Item key='profile' css={{ height: '$18' }}> 
														<nextUI.Text color='inherit' css={{ d: 'flex' }} b> 
															Signed in as 
														</nextUI.Text> 
														<nextUI.Text color='inherit' css={{ d: 'flex' }} b> 
															{username} 
														</nextUI.Text> 
													</nextUI.Dropdown.Item> 
													<nextUI.Dropdown.Item key='settings' withDivider> 
														Settings 
													</nextUI.Dropdown.Item> 
													<nextUI.Dropdown.Item key='logout' color='error' withDivider> 
														Log Out 
													</nextUI.Dropdown.Item> 
												</nextUI.Dropdown.Menu> 
											</nextUI.Dropdown> 
										</nextUI.Navbar.Item> 
									) : ( 
										<> 
											<nextUI.Navbar.Item> 
												<nextUI.Button className={navbarStyles.hoverableBtn} onClick={openLoginModal} auto> 
													Login 
												</nextUI.Button> 
											</nextUI.Navbar.Item> 
											<nextUI.Navbar.Item> 
												<nextUI.Button onClick={openSignupModal} auto bordered> 
													Sign Up 
												</nextUI.Button> 
											</nextUI.Navbar.Item> 
										</> 
									) 
								} 
							</nextUI.Navbar.Content> 
						</nextUI.Navbar> 
 
						<LoginModal closeHandler={closeLoginModal} visible={loginModalVisible} /> 
						<SignupModal closeHandler={closeSignupModal} visible={signupModalVisible} /> 
					</> 
				) 
			} 
		</> 
	); 
}