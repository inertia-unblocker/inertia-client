import { htmlToText } from 'nodemailer-html-to-text';
import nodemailer from 'nodemailer';
import { OAuth2Client } from 'google-auth-library/build/src/auth/oauth2client';
import validator from 'validator';

export default class Email {
	transporter: any;
	body: string;
	title: string;
	recipient: string;

	private async createTransporter() {
		const oauth2Client = new OAuth2Client(
			process.env.CLIENT_ID,
			process.env.CLIENT_SECRET,
			'https://developers.google.com/oauthplayground'
		);

		oauth2Client.setCredentials({
			refresh_token: process.env.REFRESH_TOKEN,
		});

		const accessToken = await new Promise((resolve, reject) => {
			oauth2Client.getAccessToken((err, token) => {
				if (err) {
					reject(err);
				}
				resolve(token);
			});
		});

		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				type: 'OAuth2',
				user: process.env.EMAIL,
				clientId: process.env.CLIENT_ID,
				clientSecret: process.env.CLIENT_SECRET,
				refreshToken: process.env.REFRESH_TOKEN,
			},
		});

		transporter.use('compile', htmlToText());

		this.transporter = transporter;
	}

	setBody(body: string) {
		this.body = body;

		return this;
	}

	setTitle(title: string) {
		this.title = title;

		return this;
	}

	setRecipient(recipient: string) {
		if (!validator.isEmail(recipient)) {
			throw new Error('BAD_EMAIL');
		}

		this.recipient = recipient;
		return this;
	}

	async send(html: boolean = true) {
		if (!this.transporter) {
			await this.createTransporter();
		}

		const mailOptions: {
			from: string;
			to: string;
			subject: string;
			html?: string;
			text?: string;
		} = {
			from: process.env.EMAIL,
			to: this.recipient,
			subject: this.title,
		};

		html ? (mailOptions['html'] = this.body) : (mailOptions['text'] = this.body);
		await this.transporter.sendMail(mailOptions);
	}
}