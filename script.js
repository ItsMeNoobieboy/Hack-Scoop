var game = new WizardOrpheus('PFNR7TO0NDI7PDIN6YHCVH1KKEO26U3HS4DDWK52ZBNOQ025LA3MA3RWU0VR8COF', `You are a starving mosquito and there's a bloody, fleshy human in front of you. Obviously, they do not want you to bite them. You must get your way to let them let you take a bite.`);
game.variable("distanceFromHuman", "The distance (in mm) you are from the human. When you are at 0 mm, you are biting the human. The distance goes from 0-100 mm", 20);

game.createUserAction({ name: 'message', parameters: ["The user's  message to you"], howBotShouldHandle: "Reply back" });

// game.message("Don't bite me");

game.botAction("reply", "Replies to the user by sending them a message. You should always reply to the user.", {message: "You, the mosquito's response to the human."}, data => {
  document.getElementById('conversation').innerHTML += '<p><b>' + data.message + '</b></p>';

  updateDist(data)
})

game.botAction("innerDemonSpeak", "The inner demons of the human tries to convince them to let you bite. This happens now and then to plant doubt into the human.", {message: "What the inner demons say to the human."}, data => {
  document.getElementById('conversation').innerHTML += '<p><i>Inner Demons:</i> ' + data.message + '</p>';
  
  updateDist(data)
})

game.botAction("motherSpeak", "The mother of the human speaks to the human, reminding them to not get bitten.", {message: "What the mother says to the human."}, data => {
  document.getElementById('conversation').innerHTML += '<p><i>Your Mother:</i> ' + data.message + '</p>';

  updateDist(data)
})

document.getElementById('input').addEventListener('keyup', function(e) {
  if (e.key === "Enter") {
    let userInput = document.getElementById('input').value;

    game.message(userInput);

    document.getElementById('conversation').innerHTML += `<p>${userInput}</p>`;
    document.getElementById('input').value = '';
  }
})

function updateDist(data) {
  const dist = data.currentVariables.distanceFromHuman.value;
  document.getElementById("distanceFromHuman").innerHTML = dist;

  let percentage = 100 - dist;
  if (dist < 0) percentage = 100;
  if (dist > 100) percentage = 0;

  const color = `hsl(0, 100%, ${100 - percentage/2}%)`;

  document.body.style.backgroundColor = color;
}