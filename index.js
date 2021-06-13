class Pokemon {
  skillsVariety = [];
  constructor(pokemonName, totalHealth, totalMagic) {
    this.pokemonName = pokemonName;
    this.totalHealth = totalHealth;
    this.totalMagic = totalMagic;
    this.currentHealth = this.totalHealth;
    this.currentMagic = this.totalMagic;
  }

  learnAttackSkill(skill) {
    this.skillsVariety.push(skill)
  }

  attack(index, attackedPokemon) {
    attackedPokemon.currentHealth -= this.skillsVariety[index].attackPower;
    this.currentMagic -= this.skillsVariety[index].magicConsume;
    console.log(`${this.pokemonName} launched skill ${this.skillsVariety[index].skillName} successfully!`);
    console.log(`${attackedPokemon.pokemonName} got ${this.skillsVariety[index].attackPower} damage.`);
  }

  showStatus() {
    console.log(`${this.pokemonName} status: 
     \t - health: ${this.currentHealth} / ${this.totalHealth}
     \t - magic: ${this.currentMagic} / ${this.totalMagic}`);
  }

  getMagic() {
    let gainedMagic = Math.floor(Math.random() * 50) + 10;
    this.currentMagic += gainedMagic;
    console.log(`${this.pokemonName} gained ${gainedMagic} magic!`)
    return gainedMagic;
  }

}

class AttackSkill {
  constructor(skillName, attackPower, magicConsume) {
    this.skillName = skillName;
    this.attackPower = attackPower;
    this.magicConsume = magicConsume;
  }
}


let pikachu = new Pokemon("Pikachu", 99, 111);
let lightning = new AttackSkill("Lightning", 20, 25);
let thunderShock = new AttackSkill("Thunder Shock", 45, 48);
let thunderbolt = new AttackSkill("Thunderbolt", 80, 95);
pikachu.learnAttackSkill(lightning);
pikachu.learnAttackSkill(thunderShock);
pikachu.learnAttackSkill(thunderbolt);
// console.log(pikachu);

let chikorita = new Pokemon("Chikorita", 113, 128);
let vineWhip = new AttackSkill("Vine Whip", 16, 24);
let grassKnot = new AttackSkill("Grass Knot", 30, 47);
let energyBall = new AttackSkill("Energy Ball", 90, 107);
chikorita.learnAttackSkill(vineWhip);
chikorita.learnAttackSkill(grassKnot);
chikorita.learnAttackSkill(energyBall);
// console.log(chikorita);

let cyndaquil = new Pokemon("Cyndaquil", 105, 118);
let flame = new AttackSkill("Flame", 15, 23);
let flameBurst = new AttackSkill("Flame Burst", 40, 55);
let flamethrower = new AttackSkill("Flamethrower", 70, 95);
cyndaquil.learnAttackSkill(flame);
cyndaquil.learnAttackSkill(flameBurst);
cyndaquil.learnAttackSkill(flamethrower);
// console.log(cyndaquil);

let totodile = new Pokemon("Totodile", 120, 137);
let aqua = new AttackSkill("Aqua", 14, 22);
let aquaJet = new AttackSkill("Aqua Jet", 40, 50);
let aquaPulse = new AttackSkill("Aqua Pulse", 70, 90);
totodile.learnAttackSkill(aqua);
totodile.learnAttackSkill(aquaJet);
totodile.learnAttackSkill(aquaPulse);
// console.log(totodile);

let slowpoke = new Pokemon("Slowpoke", 125, 137);
let confusion = new AttackSkill("Confusion", 17, 25);
let frustration = new AttackSkill("Frustration", 45, 55);
let psychic = new AttackSkill("Psychic", 90, 110);
slowpoke.learnAttackSkill(confusion);
slowpoke.learnAttackSkill(frustration);
slowpoke.learnAttackSkill(psychic);
// console.log(slowpoke);

let eevee = new Pokemon("Eevee", 117, 126);
let tackle = new AttackSkill("Tackle", 12, 20);
let swift = new AttackSkill("Swift", 50, 48);
let lastResort = new AttackSkill("Last Resort", 90, 105);
eevee.learnAttackSkill(tackle);
eevee.learnAttackSkill(swift);
eevee.learnAttackSkill(lastResort);
// console.log(eevee);

let meowth = new Pokemon("Meowth", 106, 120);
let scratch = new AttackSkill("Scratch", 20, 25);
let bite = new AttackSkill("Bite", 48, 55);
let darkPulse = new AttackSkill("Dark Pulse", 80, 95);
meowth.learnAttackSkill(scratch);
meowth.learnAttackSkill(bite);
meowth.learnAttackSkill(darkPulse);
// console.log(meowth);

let psyduck = new Pokemon("Psyduck", 120, 127);
let waterGun = new AttackSkill("Water Gun", 13, 12);
let zenHeadbutt = new AttackSkill("Zen Headbutt", 40, 25);
let psybeam = new AttackSkill("Psybeam", 70, 85);
psyduck.learnAttackSkill(waterGun);
psyduck.learnAttackSkill(zenHeadbutt);
psyduck.learnAttackSkill(psybeam);
// console.log(psyduck)

let vulpix = new Pokemon("Vulpix", 103, 116);
let ember = new AttackSkill("Ember", 18, 14);
let flameBall = new AttackSkill("Flame Ball", 50, 55);
let flameCharge = new AttackSkill("Flame Charge", 70, 90);
vulpix.learnAttackSkill(ember);
vulpix.learnAttackSkill(flameBall);
vulpix.learnAttackSkill(flameCharge);
// console.log(vulpix);

let cubone = new Pokemon("Cubone", 103, 116);
let mudSlap = new AttackSkill("Mud Slap", 20, 15);
let boneClub = new AttackSkill("Bone Club", 40, 55);
let bulldoze = new AttackSkill("Bulldoze", 80, 100);
cubone.learnAttackSkill(mudSlap);
cubone.learnAttackSkill(boneClub);
cubone.learnAttackSkill(bulldoze);
// console.log(cubone);

// Add all pokemon to array
const pokemons = [];
pokemons.push(pikachu);
pokemons.push(chikorita);
pokemons.push(cyndaquil);
pokemons.push(totodile);
pokemons.push(slowpoke);
pokemons.push(eevee);
pokemons.push(meowth);
pokemons.push(psyduck);
pokemons.push(vulpix);
pokemons.push(cubone);

// pikachu.showStatus();
// vulpix.showStatus();
// pikachu.attack(1, vulpix);
// vulpix.attack(1, pikachu);
// pikachu.showStatus();
// vulpix.showStatus();
// pikachu.attack(0, vulpix);
// vulpix.attack(0, pikachu);
// pikachu.showStatus();
// vulpix.showStatus();
// pikachu.getMagic();
// vulpix.getMagic();
// pikachu.showStatus();
// vulpix.showStatus();
// pikachu.attack(0, vulpix);
// vulpix.attack(0, pikachu);
// pikachu.showStatus();
// vulpix.showStatus();
