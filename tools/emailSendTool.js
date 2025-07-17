const nodemailer = require('nodemailer');

const emailSendTool = new Tool({
	name: 'sendEmail',
	description: 'Send an email with the given PDF path',
	func: async (filePath) => {
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASS,
			},
		});

		const mailOptions = {
			from: process.env.EMAIL_USER,
			to: 'receiver@example.com',
			subject: 'Weather Report',
			text: "Attached is tomorrow's weather report.",
			attachments: [{ filename: 'weather_report.pdf', path: filePath }],
		};

		await transporter.sendMail(mailOptions);
		return 'Email sent with weather report.';
	},
});

module.exports = {
	emailSendTool,
};
