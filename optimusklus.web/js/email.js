const mForm = document.getElementById("mForm");

let arr = [mForm];

for (let form of arr) {
    form.addEventListener("click", onClick());
}

function onClick() {
    function collectData() {
        sendEmail(
            {
                name: document.getElementById("mName").value,
                email: document.getElementById("mEmail").value,
                tel: document.getElementById("mTel").value,
                topic: document.getElementById("mTopic").value,
                message: document.getElementById("mMessage").value
            }
        );
    }

    return ev => {
        ev.preventDefault();

        switch (ev.target.id) {
            case "mSubmit":
                collectData(false);
                break;
        }
    };
}

function sendEmail(form) {
    // info@optimumklus.be
    Email.send({
        SecureToken : "9011f96c-263b-47bb-9918-5ac5b3f88e7a",
        To : 'optklus.clients@gmail.com',
        From : "optklus.clients@gmail.com",
        Subject : `WEBSITE MESSAGE ${Math.floor(Math.random() * 5000)}`,
        Body :
            `<body style=\"background-color:#FFFFFF\"><br><p align=\"left\" style=\"font-family: Consolas,sans-serif; font-size: 16px;\">` +
            `Hello my name is: <b>${form.name.toUpperCase()}</b>.</p><p align=\"left\" style=\"font-family: Consolas,sans-serif; font-size: 16px;\">` +
            `I need help with <b>${form.topic.toUpperCase()}</b></br><b>${form.message.toLowerCase()}.</b></p><p align=\"left\" style=\"font-family: Consolas,sans-serif; font-size: 16px;\">` +
            `Please take a look and call me back with a price on <b>${form.tel}</b>. Thank you.</p><br><hr style=\"margin: -1em\"><br><p align=\"left\" style=\"font-family: Consolas,sans-serif; font-size: 16px;\">Generated in Optimus Klus Website</p></body>`,
    }).then(
        message => alert(message)
    );
}