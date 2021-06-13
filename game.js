class Battle {
  constructor() {
    this.turn = 1;
    this.currentPlayer;
    this.targetPlayer;
  }
}

class Player {
  constructor(no) {
    this.no = no;
    this.pokemon;
  }
}

class AudioPlayer {
  constructor(audio) {
    this.audio = audio;
    this.audio.volume = 0.1;
    this.battleThemes = ["audio/battle1.mp3"];
    this.victoryThemes = ["audio/victory1.mp3"];
    this.introThemes = ["audio/intro1.mp3"];
    this.chooseThemes = [""]
  }

  playIntroTheme() {
    this.audio.src = this.introThemes[0];
    this.audio.play();
  }

  playBattleTheme() {
    this.audio.src = this.battleThemes[0];
    this.audio.play();
  }

  playVictoryTheme() {
    this.audio.src = this.victoryThemes[0];
    this.audio.play();
  }

  stop() {
    this.audio.pause();
  }
}

// Define game state, this state is mapped to div id
const gamestate = {
  INTRO: "intro",
  CHOOSE: "choose",
  BATTLE: "battle",
  GAMEOVER: "gameover"
};

// Intro animation
let introAnimationGif = new Image();
introAnimationGif.src = "img/intro-no-loop-compressed.gif";

let audioPlayer;

// Game variable
let currentGamestate;
let player1;
let player2;
let battle;

function showPrelude() {
  audioPlayer = new AudioPlayer(document.getElementById("audio"));
}

// Game-flow functions
// Initialize the game, set gamestate to intro
function showIntro() {
  document.getElementById("prelude").style.display = "none";
  audioPlayer.stop();
  audioPlayer.playIntroTheme();
  initGame();
  setActiveView(currentGamestate);
}

// Start the game and set gamestate to choose
function showChoose() {
  initChoose();
  setActiveView(currentGamestate);
}

// Start the battle
function showBattle() {
  initBattle();
  updateBattle();
  setActiveView(currentGamestate);
}

// function to set the view based on gamestate
function setActiveView(currentGamestate) {
  for (let state in gamestate) {
    if (gamestate[state] === currentGamestate) {
      document.getElementById(gamestate[state]).style.display = "block";
    } else {
      document.getElementById(gamestate[state]).style.display = "none";
    }
  }
  console.log("Set active view: " + currentGamestate);

  // add random number, so that the image will always be reloaded
  document.getElementById("intro").style.backgroundImage = `url(${introAnimationGif.src+"?"+Math.random()})`;
}

// Initialize game state
function initGame() {
  currentGamestate = gamestate.INTRO;
  player1 = new Player(1);
  player2 = new Player(2);
  document.getElementById("choose-player-name").innerHTML = "Player 1";
  document.getElementById("choose-pokemon-container").classList.remove("player2-offset");
  document.getElementById("battle-log").innerHTML = "Pokemons!!! have a fair fight. 3...2...1...go";
}

// Initializing choose screen
function initChoose() {
  currentPlayerToChoosePokemon = player1;

  document.getElementById("choose-pokemon-list").innerHTML = "";
  let pokemonHtmlButton = "";
  pokemons.forEach(pokemon => {
    pokemonHtmlButton += `<button type="button" class="nes-btn" style="padding:0;" data-pokemon="${pokemon.pokemonName}" onclick="choosed(this)"><img
  src="img/pokemon/${pokemon.pokemonName}.png"></button>`;
  })
  document.getElementById("choose-pokemon-list").innerHTML = pokemonHtmlButton;

  currentGamestate = gamestate.CHOOSE;
}

// Initializing battle screen
function initBattle() {
  battle = new Battle();
  battle.currentPlayer = player1;
  battle.targetPlayer = player2;
  currentGamestate = gamestate.BATTLE;
  showBattleMenu(false);
}

// Function for choosing pokemon for p1 & p2
function choosed(event) {
  if (currentPlayerToChoosePokemon === player1) {
    player1.pokemon = clonePokemon(pokemons.find(x => x.pokemonName === event.dataset.pokemon));
    currentPlayerToChoosePokemon = player2;
    document.getElementById("choose-player-name").innerHTML = "Player " + player2.no;
    document.getElementById("choose-pokemon-container").classList.add("player2-offset");
  } else if (currentPlayerToChoosePokemon === player2) {
    player2.pokemon = clonePokemon(pokemons.find(x => x.pokemonName === event.dataset.pokemon));
    showBattle();
  }
}

// We need to clone pokemon before sending it to battle
// In case it died, we wont be sorry ^^ wink wink
function clonePokemon(pokemon) {
  // clone object using lodash
  let clonePokemon = _.cloneDeep(pokemon);

  // recover health and magic
  clonePokemon.currentHealth = pokemon.totalHealth;
  clonePokemon.currentMagic = pokemon.totalMagic;

  return clonePokemon;
}

function startBattle() {
  audioPlayer.playBattleTheme();
  showBattleMenu(true);
  enableCommandButton(true);
}

// This function update the pokemon status on the html based on the object state
function updateBattle() {
  // update current player pokemon image
  document.getElementById("current-player-pokemon").src = `img/pokemon/back/${battle.currentPlayer.pokemon.pokemonName}.png`;

  // update current player status
  document.getElementById("current-player-no").innerHTML = "Player " + battle.currentPlayer.no;
  document.getElementById("current-player-pokemon-name").innerHTML = battle.currentPlayer.pokemon.pokemonName;
  document.getElementById("current-player-pokemon-current-health").innerHTML = battle.currentPlayer.pokemon.currentHealth;
  document.getElementById("current-player-pokemon-total-health").innerHTML = battle.currentPlayer.pokemon.totalHealth;
  document.getElementById("current-player-pokemon-healthbar").value = battle.currentPlayer.pokemon.currentHealth;
  document.getElementById("current-player-pokemon-healthbar").max = battle.currentPlayer.pokemon.totalHealth;
  document.getElementById("current-player-pokemon-current-magic").innerHTML = battle.currentPlayer.pokemon.currentMagic;
  document.getElementById("current-player-pokemon-total-magic").innerHTML = battle.currentPlayer.pokemon.totalMagic;
  document.getElementById("current-player-pokemon-magicbar").value = battle.currentPlayer.pokemon.currentMagic;
  document.getElementById("current-player-pokemon-magicbar").max = battle.currentPlayer.pokemon.totalMagic;


  // update target player pokemon image
  document.getElementById("target-player-pokemon").src = `img/pokemon/${battle.targetPlayer.pokemon.pokemonName}.png`;
  document.getElementById("target-player-no").innerHTML = "Player " + battle.targetPlayer.no;
  document.getElementById("target-player-pokemon-name").innerHTML = battle.targetPlayer.pokemon.pokemonName;
  document.getElementById("target-player-pokemon-current-health").innerHTML = battle.targetPlayer.pokemon.currentHealth;
  document.getElementById("target-player-pokemon-total-health").innerHTML = battle.targetPlayer.pokemon.totalHealth;
  document.getElementById("target-player-pokemon-healthbar").value = battle.targetPlayer.pokemon.currentHealth;
  document.getElementById("target-player-pokemon-healthbar").max = battle.targetPlayer.pokemon.totalHealth;
  document.getElementById("target-player-pokemon-current-magic").innerHTML = battle.targetPlayer.pokemon.currentMagic;
  document.getElementById("target-player-pokemon-total-magic").innerHTML = battle.targetPlayer.pokemon.totalMagic;
  document.getElementById("target-player-pokemon-magicbar").value = battle.targetPlayer.pokemon.currentMagic;
  document.getElementById("target-player-pokemon-magicbar").max = battle.targetPlayer.pokemon.totalMagic;
}

// Battle command function which is binded to attack and boost button
function battleCommand(command) {
  // do nothing if the button has is-disabled class
  if (document.getElementById("attack-btn").classList.contains("is-disabled") || document.getElementById("boost-btn").classList.contains("is-disabled")) {
    return false;
  }

  enableCommandButton(false);
  if (battle.currentPlayer.pokemon.skillsVariety.length > 0) {
    if (command === 'attack') {
      const success = attackCommand(battle.currentPlayer, battle.targetPlayer);
      if (success) {
        document.getElementById("current-player-pokemon").classList.add("animation-attack");
        document.getElementById("target-player-pokemon").classList.add("animation-damage");
      }
    } else if (command === 'boost') {
      getMagicCommand(battle.currentPlayer);
    }

    // set delay for battle animation
    setTimeout(() => {
      // check winning condition
      // if target pokemon health is less than 0 or equal 0 then gameover
      if (battle.targetPlayer.pokemon.currentHealth <= 0) {
        audioPlayer.stop();
        audioPlayer.playVictoryTheme();
        const pokemonDeadMessage = `${battle.targetPlayer.pokemon.pokemonName} is defeated`;
        document.getElementById("battle-log").innerHTML = pokemonDeadMessage;
        const winningMessage = `Player ${battle.currentPlayer.no} ${battle.currentPlayer.pokemon.pokemonName} win`;
        document.getElementById("game-over-player-win").innerHTML = winningMessage;

        // set delay to switch screen to gameover
        setTimeout(() => {
          currentGamestate = gamestate.GAMEOVER;
          setActiveView(currentGamestate);
        }, 3000);
        enableCommandButton(false);
      } else {
        const temp = battle.currentPlayer;
        battle.currentPlayer = battle.targetPlayer;
        battle.targetPlayer = temp;
        enableCommandButton(true);
      }

      document.getElementById("current-player-pokemon").classList.remove("animation-attack");
      document.getElementById("target-player-pokemon").classList.remove("animation-damage");
      updateBattle();
    }, 1000);
  } else {
    let errorMessage = `current player pokemon:${battle.currentPlayer.pokemon.pokemonName} doesnt have any skill, please initialize the pokemon correctly`;
    alert(errorMessage);
    console.error(`current player pokemon:${battle.currentPlayer.pokemon.pokemonName} doesnt have any skill, please initialize the pokemon correctly`);
  }

  battle.turn++;
}

function enableCommandButton(enable) {
  if (enable) {
    document.getElementById("attack-btn").classList.remove("is-disabled");
    document.getElementById("boost-btn").classList.remove("is-disabled");
  } else {
    document.getElementById("attack-btn").classList.add("is-disabled");;
    document.getElementById("boost-btn").classList.add("is-disabled");
  }
}

function showBattleMenu(show) {
  if (show) {
    document.getElementById("current-player-pokemon-status").style.display = "block";
    document.getElementById("target-player-pokemon-status").style.display = "block";
    document.getElementById("attack-btn").style.display = "block";
    document.getElementById("boost-btn").style.display = "block";
    document.getElementById("fight-btn").style.display = "none";
  } else {
    document.getElementById("current-player-pokemon-status").style.display = "none";
    document.getElementById("target-player-pokemon-status").style.display = "none";
    document.getElementById("attack-btn").style.display = "none";
    document.getElementById("boost-btn").style.display = "none";
    document.getElementById("fight-btn").style.display = "block";
  }
}

function attackCommand(currentPlayer, targetPlayer) {
  // Init pokemon
  const currentPokemon = currentPlayer.pokemon;
  const targetPokemon = targetPlayer.pokemon;

  // generate skill index randomly
  const skillIndex = Math.floor(Math.random() * (battle.currentPlayer.pokemon.skillsVariety.length)) + 0;

  let success = false;

  // check if the current pokemon has enough magic point
  if (currentPokemon.currentMagic - currentPokemon.skillsVariety[skillIndex].magicConsume >= 0) {
    currentPokemon.attack(skillIndex, targetPokemon);
    let succesAttackMessage = `${currentPokemon.pokemonName} attack with ${currentPokemon.skillsVariety[skillIndex].skillName} and dealt ${currentPokemon.skillsVariety[skillIndex].attackPower} damage`;
    document.getElementById("battle-log").innerHTML = succesAttackMessage;
    success = true;
  } else {
    let failAttackMessage = `${currentPokemon.pokemonName} attack with ${currentPokemon.skillsVariety[skillIndex].skillName} failed, not enough magic.`;
    document.getElementById("battle-log").innerHTML = failAttackMessage;
    success = false;
  }
  return success;
}

function getMagicCommand(currentPlayer) {
  const currentPokemon = currentPlayer.pokemon;
  const magicBeforeGaining = currentPlayer.pokemon.currentMagic;
  const gainedMagic = currentPokemon.getMagic();

  let tooManyMagicMessage = "";

  // check magic overflow
  if (currentPokemon.currentMagic > currentPokemon.totalMagic) {
    // add message in case currentMagic is overflowing the total magic
    tooManyMagicMessage = ` Magic overflow ${magicBeforeGaining+gainedMagic-currentPokemon.totalMagic}.`;

    // set currentMagic to totalMagic, currentMagic shouldnt be more than total magic
    currentPokemon.currentMagic = currentPokemon.totalMagic;
  }

  let gainMagicMessage = `${currentPokemon.pokemonName} gain ${gainedMagic} magic.`;

  if (tooManyMagicMessage) {
    gainMagicMessage += tooManyMagicMessage;
  }

  document.getElementById("battle-log").innerHTML = gainMagicMessage;
}