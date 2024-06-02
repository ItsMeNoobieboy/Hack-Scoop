var game = new WizardOrpheus('PFNR7TO0NDI7PDIN6YHCVH1KKEO26U3HS4DDWK52ZBNOQ025LA3MA3RWU0VR8COF', `You are a starving mosquito and there's a bloody, fleshy human in front of you. Obviously, they do not want you to bite them. You must get your way to let them let you take a bite.`);
game.variable("distanceFromHuman", "The distance (in mm) you are from the human. When you are at 0 mm, you are biting the human. The distance goes from 0-100 mm", 20);

game.createUserAction({ name: 'message', parameters: ["The user's  message to you"], howBotShouldHandle: "Reply back" });

// game.message("Don't bite me");

game.botAction("reply", "Replies to the user by sending them a message. You should always do this.", {message: "You, the mosquito's response to the human."}, data => {
  document.getElementById('conversation').innerHTML += '<p>' + data.message + '</p>';
  document.getElementById("distanceFromHuman").innerHTML = data.currentVariables.distanceFromHuman.value;
})

game.botAction("innerDemons", "The inner demons of the human tries to convince them to let you bite.", {message: "What the inner demons say to the human."}, data => {
  document.getElementById('conversation').innerHTML += '<p><i>Inner Demons:</i> ' + data.message + '</p>';
  document.getElementById("distanceFromHuman").innerHTML = data.currentVariables.distanceFromHuman.value;
})

document.getElementById('input').addEventListener('keyup', function(e) {
  if (e.key === "Enter") {
    let userInput = document.getElementById('input').value;

    game.message(userInput);

    document.getElementById('conversation').innerHTML += `<p>${userInput}</p>`;
    document.getElementById('input').value = '';
  }
})

