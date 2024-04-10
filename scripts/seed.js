const { db } = require('@vercel/postgres');
const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const parse = require('csv-parser');
const fetchFullPageHTML = require("./crawler");

async function seedHeroes(client) {
  try {
    const heroesImg = await fetchFullPageHTML();
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Read data from Excel file
    const filePath = path.resolve(__dirname, '../scripts/mlbb_hero.xlsx');
    const workbook = xlsx.readFile(filePath);
    const sheet = workbook.Sheets['dataset'];
    const heroes = xlsx.utils.sheet_to_json(sheet);
    // Create the "heroes" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS heroes (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        img_url VARCHAR(255),
        role VARCHAR(255) NOT NULL,
        defense FLOAT NOT NULL,
        offense FLOAT NOT NULL,
        skill_effect FLOAT NOT NULL,
        difficulty FLOAT NOT NULL,
        movement_speed INT NOT NULL,
        magic_defense INT NOT NULL,
        mana INT NOT NULL,
        hp_regen INT NOT NULL,
        physical_attack INT NOT NULL,
        physical_defense INT NOT NULL,
        hp INT NOT NULL,
        attack_speed FLOAT NOT NULL,
        mana_regen FLOAT NOT NULL,
        win_rate FLOAT NOT NULL,
        pick_rate FLOAT NOT NULL,
        ban_rate FLOAT NOT NULL,
        release_year INT NOT NULL
      );
    `;

    // Insert heroes into the table
    const insertedHeroes = await Promise.all(
      heroes.map(
          (hero) => {
            const heroData = heroesImg?.find((heroData) => heroData?.name === hero.hero_name);
            const imgUrl = heroData?.url;
            return client.sql`
            INSERT INTO heroes (name, img_url, role, defense, offense, skill_effect, difficulty, movement_speed, magic_defense, mana, hp_regen, physical_attack, physical_defense, hp, attack_speed, mana_regen, win_rate, pick_rate, ban_rate, release_year)
            VALUES (${hero.hero_name}, ${imgUrl}, ${hero.role}, ${hero.defense_overall}, ${hero.offense_overall}, ${hero.skill_effect_overall}, ${hero.difficulty_overall}, ${hero.movement_spd}, ${hero.magic_defense}, ${hero.mana}, ${hero.hp_regen}, ${hero.physical_atk}, ${hero.physical_defense}, ${hero.hp}, ${hero.attack_speed}, ${hero.mana_regen}, ${hero.win_rate}, ${hero.pick_rate}, ${hero.ban_rate}, ${hero.release_year})
            ON CONFLICT (id) DO NOTHING;
          `
          }
      ),
      );

    // console.log(`Seeded ${insertedHeroes.length} heroes`);
  } catch (error) {
    console.error('Error seeding heroes:', error);
    throw error;
  }
}

async function readCSV(filePath) {
  return new Promise((resolve, reject) => {
      const rows = [];
      fs.createReadStream(filePath)
          .pipe(parse({ delimiter: ',' }))
          .on('data', (row) => {
              rows.push(row);
          })
          .on('end', () => {
              resolve(rows);
          })
          .on('error', (error) => {
              reject(error);
          });
  });
}

async function seedMplTen(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    const result = await client.sql`
      SELECT * FROM heroes
    `;
    const heroes = result.rows;

    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS mpl10 (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        hero_id UUID NOT NULL,
        pick VARCHAR(255) NOT NULL,
        wins VARCHAR(255) NOT NULL,
        lose VARCHAR(255) NOT NULL,
        win_rate VARCHAR(255) NOT NULL,
        pick_percentage VARCHAR(255) NOT NULL,
        blue_pick VARCHAR(255) NOT NULL,
        blue_won VARCHAR(255) NOT NULL,
        blue_lost VARCHAR(255) NOT NULL,
        blue_winrate VARCHAR(255) NOT NULL,
        red_pick VARCHAR(255) NOT NULL,
        red_won VARCHAR(255) NOT NULL,
        red_lose VARCHAR(255) NOT NULL,
        red_winrate VARCHAR(255) NOT NULL,
        banned VARCHAR(255) NOT NULL,
        ban_percentage VARCHAR(255) NOT NULL,
        pick_or_ban VARCHAR(255) NOT NULL,
        pick_or_ban_percentage VARCHAR(255) NOT NULL
      );
    `;
    const filePath = path.resolve(__dirname, '../scripts/MPL_ID_S10.csv');
    const mplTen = await readCSV(filePath);
    const insertedHeroes = await Promise.all(
      mplTen.map(
        (rowData) => {
          let hero = heroes.find((hero) => hero.name === rowData.Hero);
          const heroId = hero ? hero.id : heroes[0]?.id;
          return client.sql`
                  INSERT INTO mpl10 (hero_id, pick, wins, lose, win_rate, pick_percentage, blue_pick, blue_won, blue_lost, blue_winrate, red_pick, red_won, red_lose, red_winrate, banned, ban_percentage, pick_or_ban, pick_or_ban_percentage)
                  VALUES (${heroId}, ${rowData.Hero_picked}, ${rowData.T_wins}, ${rowData.T_lose}, ${rowData.T_winrate}, ${rowData.T_pickpercentage}, ${rowData.Bs_picked}, ${rowData.Bs_won}, ${rowData.Bs_lost}, ${rowData.Bs_winrate}, ${rowData.Rs_picked}, ${rowData.Rs_won}, ${rowData.Rs_lost}, ${rowData.Rs_winrate}, ${rowData.Hero_banned}, ${rowData.Ban_percentage}, ${rowData['Pick&Ban']}, ${rowData['Pick&Ban percentage']})
                  ON CONFLICT (id) DO NOTHING;
              `
        }
      ),
    );
  } catch (error) {
    console.error('Error seeding mpl10:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedHeroes(client);
  // await seedMplTen(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
