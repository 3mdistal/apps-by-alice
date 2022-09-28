export const actions = {
    default: async (event) => {
        Email.send({
            Host : "smtp.gmail.com",
            Username : process.env.GMAIL_EMAIL,
            Password : process.env.GMAIL_PASSWORD,
            To : process.env.GMAIL_EMAIL,
            From : "mail@gmail.com",
            Subject : "This is the subject",
            Body : "And this is the body"
        }).then(
          message => alert(message)
        );
    }
}