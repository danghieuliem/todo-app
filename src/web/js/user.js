const token = localStorage.getItem("token");

var close = document.getElementsByClassName("close");

var list = document.querySelector('ul');

list.addEventListener('click', async(ev) => {
    if (ev.target.tagName === 'LI') {
        const _id = ev.target.classList[0];
        var completed = true;
        const title = $(ev.target)[0].children[0].innerText;
        const body = $(ev.target)[0].children[1].innerText;
        if (ev.target.classList[1])
            completed = false;
        const response = await fetch("/api/tasks", {
            method: "PATCH",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
                "x-token": token
            },
            redirect: "follow",
            referencePolicy: "no-referrer",
            body: JSON.stringify({ _id, completed, body, title })
        });
        if (response.status >= 400) {
            console.log(response.status);
            return;
        }
        ev.target.classList.toggle('checked');
    }
}, false);

/**
 * 
 * @param {String} title 
 * @param {String} body 
 * @param {boolean} done 
 */
const newElement = (title, body, done, id) => {
    var li = document.createElement("li");

    var _title = document.createElement("b");
    _title.innerText = title;
    var _body = document.createElement("span");
    _body.innerText = body;

    _body.style = "margin-left: 10px";

    var text = document.createTextNode(" : ");

    li.appendChild(_title);
    li.appendChild(text);
    li.appendChild(_body);

    li.classList.add(id);

    if (done) {
        li.classList.toggle('checked');
    }

    document.getElementById("myUL").appendChild(li);
    document.getElementById("title").value = "";
    document.getElementById("body").value = "";

    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");

    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    for (i = 0; i < close.length; i++) {
        close[i].onclick = function() {
            var li = this.parentElement;
            console.log(li);
            const _id = this.parentElement.classList[0];
            console.log(_id);
            const response = fetch("/api/tasks", {
                method: "DELETE",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                    "x-token": token
                },
                redirect: "follow",
                referencePolicy: "no-referrer",
                body: JSON.stringify({ _id })
            });
            if (response.status >= 400) {
                console.log(response.status);
                return;
            }
            li.style.display = "none";
        }
    }
}

const addonclick = async() => {
    const title = document.getElementById("title").value;
    const body = document.getElementById("body").value;

    var err = "";

    if (title.trim() === "")
        err += "Title is require !\n";
    if (body.trim() === "")
        err += "Body is require !\n";

    if (err.trim() !== "") {
        alert(err);
        return;
    }

    try {
        const response = await fetch("/api/tasks", {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
                "x-token": token
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify({ title, body })
        });
        if (response.status >= 400) {
            console.log(response.status);
            //console.log(token);
            return;
        }
        const newtask = await response.json();
        console.log(response);
        newElement(newtask.title, newtask.body, newtask.completed, newtask._id);

    } catch (err) {
        console.log(err);
    }
}

const getdotolist = async() => {
    try {
        const response = await fetch("/api/tasks", {
            method: "GET",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
                "x-token": token
            },
            redirect: "follow",
            referencePolicy: "no-referrer",
        });

        //console.log(token);
        if (response.status >= 400) {
            return;
        }
        return await response.json();

    } catch (err) {
        console.log(err);
    }
}

var user_id;
$(document).ready(async() => {
    console.log("Meow :3");
    user_id = await getUser();
    var todolist = await getdotolist();
    todolist.forEach(item => {
        newElement(item.title, item.body, item.completed, item._id);
    });
});

const getUser = async() => {
    const token = localStorage.getItem("token");
    try {
        const response = await fetch("/api/users/authentication", {
            method: "GET",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
                "x-token": token
            },
            redirect: "follow",
            referencePolicy: "no-referrer",
        });
        if (response.status >= 400) {
            location.href = "/SignIn.html";
        }
        const user = await response.json();
        console.log(user);
        document.getElementById("username").innerHTML = user.username;
        return user._id;
    } catch (err) {
        console.log(err);
    }
}