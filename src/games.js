const games = {
    0: {
      name: "Dragon Charmer's Island",
      gameId: 0,
      gameImage: '/images/dragongame.webp',
      characters: [
        {
            name: "Raft Man",
            url: "/images/raft-man.png",
            found: false,
            marker: { x: 5, y: 42 },
        },
        {
            name: "Wizard",
            url: "/images/wizard.png",
            found: false,
            marker: { x: 75, y: 65 },
        },
        {
            name: "Dragon",
            url: "/images/dragon.png",
            found: false,
            marker: { x: 66, y: 42 },
        },
    ],
    },
    1: {
        name: "Super Mario Bros",
        gameId: 1,
        gameImage: '/images/super-mario-bros.webp',
        characters: [
            {
                name: "Fire Mario",
                url: "/images/fire-mario.webp",
                found: false,
                marker: { x: 5, y: 42 },
            },
            {
                name: "King Boo",
                url: "/images/king-boo.webp",
                found: false,
                marker: { x: 75, y: 65 },
            },
            {
                name: "Waluigi",
                url: "/images/waluigi.webp",
                found: false,
                marker: { x: 66, y: 42 },
            },
        ],
    },
    2: {
        name: "Aquatic Aquarium",
        gameId: 2,
        gameImage: '/images/aquatic-aquarium.webp',
        characters: [
            {
                name: "Feebas",
                url: "/images/feebas.webp",
                found: false,
                marker: { x: 5, y: 42 },
            },
            {
                name: "Starmie",
                url: "/images/starmie.webp",
                found: false,
                marker: { x: 75, y: 65 },
            },
            {
                name: "Mantyke",
                url: "/images/mantyke.webp",
                found: false,
                marker: { x: 66, y: 42 },
            },
        ],
    },
  };
  
  export default games;