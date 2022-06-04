const wForm = document.getElementById("wForm");
const mForm = document.getElementById("mForm");

let arr = [wForm, mForm];

for (let form of arr) {
    form.addEventListener("click", onClick());
}

function onClick() {
    function collectData(wm) {
        wm = wm ? "w" : "m";


        sendEmail(
            {
                name: document.getElementById(wm + "Name").value,
                email: document.getElementById(wm + "Email").value,
                tel: document.getElementById(wm + "Tel").value,
                topic: document.getElementById(wm + "Topic").value,
                message: document.getElementById(wm + "Message").value
            }
        );
    }

    return ev => {
        ev.preventDefault();

        switch (ev.target.id) {
            case "wSubmit":
                collectData(true);
                break;
            case "mSubmit":
                collectData(false);
                break;
        }
    };
}

function sendEmail(form) {

    // Email.send({
    //     Host: "smtp.gmail.com",
    //     Username: "optklus.clients@gmail.com",
    //     Password:"brjajnommsrfentc",
    //     To: "optklus.clients@gmail.com",
    //     From: "sender",
    //     Subject: "Check Email Sending",
    //     Body: "content",
    // }).then(function (message) {
    //     alert(message)
    // });
    //
    Email.send({
        SecureToken : "fd79168c-fda7-4b47-854d-3583ad69ba0f",
        To : 'optklus.clients@gmail.com',
        From : "optklus.clients@gmail.com",
        UseDefaultCredentials: false,
        Subject : "1",
        Body : "1"
    }).then(
        message => alert(message)
    );

    // Email.send({
    //     Host: "smtp.gmail.com",
    //     Username: "optklus.clients@gmail.com",
    //     Password: "brjajnommsrfentc",
    //     To: "optklus.clients@gmail.com",
    //     From: "optklus.clients@gmail.com",
    //     Subject: `WEB ORDER ${form.topic} ${Math.floor(Math.random() * 5)}`,
    //     Body: `
    //             Hello my name is: ${form.name},\n
    //             \n
    //             I need help with ${form.topic}, ${form.message},\n
    //             \n
    //             Please take a look and call me back with a price on ${form.tel}. Thank you.`,
    // }).then(
    //     message => {
    //         alert("mail sent successfully");
    //         console.log(form.name);
    //     }
    // );
}