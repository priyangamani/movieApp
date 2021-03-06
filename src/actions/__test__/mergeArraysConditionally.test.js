
const pick = require("lodash.pick")
const map = require("lodash.map")
const partialRight = require("lodash.partialright")
import { minsToHHMM } from "../../commonUtils/utils"

const IMAGE_HOST = `https://image.tmdb.org/t/p/w500`

const listOfUpComingMovies = [
  {
    id: 454626,
    poster_path: "/aQvJ5WPzZgYVDrxLX4R6cLJCEaQ.jpg",
    title: "Sonic the Hedgehog",
    overview:
      "Based on the global blockbuster videogame franchise from Sega, Sonic the Hedgehog tells the story of the world’s speediest hedgehog as he embraces his new home on Earth. In this live-action adventure comedy, Sonic and his new best friend team up to defend the planet from the evil genius Dr. Robotnik and his plans for world domination.",
    vote_average: 7.1,
    release_date: "2020-02-12",
  },
  {
    id: 449924,
    poster_path: "/yJdeWaVXa2se9agI6B4mQunVYkB.jpg",
    title: "Ip Man 4: The Finale",
    overview:
      "Following the death of his wife, Ip Man travels to San Francisco to ease tensions between the local kung fu masters and his star student, Bruce Lee, while searching for a better future for his son.",
    vote_average: 5.9,
    release_date: "2019-12-20",
  },
  {
    id: 448119,
    poster_path: "/5eNiYMu2GXCtNlDwMcJqKGVwyoX.jpg",
    title: "Dolittle",
    overview:
      "After losing his wife seven years earlier, the eccentric Dr. John Dolittle, famed doctor and veterinarian of Queen Victoria’s England, hermits himself away behind the high walls of Dolittle Manor with only his menagerie of exotic animals for company. But when the young queen falls gravely ill, a reluctant Dolittle is forced to set sail on an epic adventure to a mythical island in search of a cure, regaining his wit and courage as he crosses old adversaries and discovers wondrous creatures.",
    vote_average: 6.4,
    release_date: "2020-01-01",
  },
  {
    id: 552178,
    poster_path: "/hJ6YEbrjFvToa5c7IiUqILoB6Je.jpg",
    title: "Dark Waters",
    overview:
      "A tenacious attorney uncovers a dark secret that connects a growing number of unexplained deaths due to one of the world's largest corporations. In the process, he risks everything — his future, his family, and his own life — to expose the truth.",
    vote_average: 7.5,
    release_date: "2019-11-22",
  },
  {
    id: 458897,
    poster_path: "/1DPUFG6QnGqzpvEaDEv7TaepycM.jpg",
    title: "Charlie's Angels",
    overview:
      "When a systems engineer blows the whistle on a dangerous technology, Charlie's Angels from across the globe are called into action, putting their lives on the line to protect society.",
    vote_average: 6.4,
    release_date: "2019-11-14",
  },
  {
    id: 555974,
    poster_path: "/tIpGQ9uuII7QVFF0GHCFTJFfXve.jpg",
    title: "Brahms: The Boy II",
    overview:
      "After a family moves into the Heelshire Mansion, their young son soon makes friends with a life-like doll called Brahms.",
    vote_average: 6.1,
    release_date: "2020-02-20",
  },
  {
    id: 338762,
    poster_path: "/8WUVHemHFH2ZIP6NWkwlHWsyrEL.jpg",
    title: "Bloodshot",
    overview:
      "After he and his wife are murdered, marine Ray Garrison is resurrected by a team of scientists. Enhanced with nanotechnology, he becomes a superhuman, biotech killing machine - Bloodshot. As Ray first trains with fellow super-soldiers, he cannot recall anything from his former life. But when his memories flood back and he remembers the man that killed both him and his wife, he breaks out of the facility to get revenge, only to discover that there's more to the conspiracy than he thought.",
    vote_average: 7.3,
    release_date: "2020-02-20",
  },
  {
    id: 539537,
    poster_path: "/yqZdRSC6wfX6AGtBPfGbpvmNKag.jpg",
    title: "Fantasy Island",
    overview:
      "A group of contest winners arrive at an island hotel to live out their dreams, only to find themselves trapped in nightmare scenarios.",
    vote_average: 4.7,
    release_date: "2020-02-12",
  },
  {
    id: 536743,
    poster_path: "/ksHdHK17wRKMLkpMH4UslMT1V0p.jpg",
    title: "Queen & Slim",
    overview:
      "While on a forgettable first date together in Ohio, a black man and a black woman are pulled over for a minor traffic infraction. The situation escalates, with sudden and tragic results, when the man kills the police officer in self-defense. Terrified and in fear for their lives, the man, a retail employee, and the woman, a criminal defense lawyer, are forced to go on the run. But the incident is captured on video and goes viral, and the couple unwittingly become a symbol of trauma, terror, grief and pain for people across the country.",
    vote_average: 7.5,
    release_date: "2019-11-27",
  },
  {
    id: 556678,
    poster_path: "/sm8iVzA7kRp0d4BSIsgXjsSBMKV.jpg",
    title: "Emma.",
    overview:
      "In 1800s England, a well-meaning but selfish young woman meddles in the love lives of her friends.",
    vote_average: 7.5,
    release_date: "2020-02-14",
  },
  {
    id: 501907,
    poster_path: "/p9vCAVhDK375XyobVcKqzqzsUHE.jpg",
    title: "A Beautiful Day in the Neighborhood",
    overview:
      "An award-winning cynical journalist, Lloyd Vogel, begrudgingly accepts an assignment to write an Esquire profile piece on the beloved television icon Fred Rogers. After his encounter with Rogers, Vogel's perspective on life is transformed.",
    vote_average: 7.3,
    release_date: "2019-11-22",
  },
  {
    id: 570670,
    poster_path: "/4U7hpTK0XTQBKT5X60bKmJd05ha.jpg",
    title: "The Invisible Man",
    overview:
      "When Cecilia's abusive ex takes his own life and leaves her his fortune, she suspects his death was a hoax. As a series of coincidences turn lethal, Cecilia works to prove that she is being hunted by someone nobody can see.",
    vote_average: 0,
    release_date: "2020-02-26",
  },
  {
    id: 531428,
    poster_path: "/3NTEMlG5mQdIAlKDl3AJG0rX29Z.jpg",
    title: "Portrait of a Lady on Fire",
    overview:
      "On an isolated island in Brittany at the end of the eighteenth century, a female painter is obliged to paint a wedding portrait of a young woman.",
    vote_average: 8.3,
    release_date: "2019-06-17",
  },
  {
    id: 548473,
    poster_path: "/xssWHNrOhAeq0EUzHbHqn1SRb5s.jpg",
    title: "Color Out of Space",
    overview:
      "The Gardner family moves to a remote farmstead in rural New England to escape the hustle of the 21st century. They are busy adapting to their new life when a meteorite crashes into their front yard, melts into the earth, and infects both the land and the properties of space-time with a strange, otherworldly colour. To their horror, the family discovers this alien force is gradually mutating every life form that it touches—including them.",
    vote_average: 6.6,
    release_date: "2019-09-24",
  },
  {
    id: 589049,
    poster_path: "/cdqZqIcWt0Ne2Io2OA9iWqqMuCA.jpg",
    title: "The Photograph",
    overview:
      "When famed photographer Christina Eames dies unexpectedly, she leaves her estranged daughter, Mae, hurt, angry and full of questions. When Mae finds a photograph tucked away in a safe-deposit box, she soon finds herself delving into her mother's early life -- an investigation that leads to an unexpected romance with a rising journalist.",
    vote_average: 8.3,
    release_date: "2020-02-14",
  },
  {
    id: 508439,
    poster_path: "/3VqDLgKLfNYSQYEGC5sjGhcPhn7.jpg",
    title: "Onward",
    overview:
      "In a suburban fantasy world, two teenage elf brothers embark on an extraordinary quest to discover if there is still a little magic left out there.",
    vote_average: 0,
    release_date: "2020-03-04",
  },
  {
    id: 491283,
    poster_path: "/iqJhHjD6k6T07waELjMKDpQJUP.jpg",
    title: "Judy",
    overview:
      "Winter 1968 and showbiz legend Judy Garland arrives in Swinging London to perform a five-week sold-out run at The Talk of the Town. It is 30 years since she shot to global stardom in The Wizard of Oz, but if her voice has weakened, its dramatic intensity has only grown. As she prepares for the show, battles with management, charms musicians and reminisces with friends and adoring fans, her wit and warmth shine through. Even her dreams of love seem undimmed as she embarks on a whirlwind romance with Mickey Deans, her soon-to-be fifth husband.",
    vote_average: 6.9,
    release_date: "2019-09-27",
  },
  {
    id: 522212,
    poster_path: "/zQGzAoYF6lXDN3L9hxBecQRZIwB.jpg",
    title: "Just Mercy",
    overview:
      "The powerful true story of Harvard-educated lawyer Bryan Stevenson, who goes to Alabama to defend the disenfranchised and wrongly condemned — including Walter McMillian, a man sentenced to death despite evidence proving his innocence. Bryan fights tirelessly for Walter with the system stacked against them.",
    vote_average: 8.2,
    release_date: "2019-12-25",
  },
  {
    id: 484468,
    poster_path: "/8bxIzp9w9l9ZzGVwNaIKOaem05A.jpg",
    title: "The Wolf's Call",
    overview:
      "With nuclear war looming, a military expert in underwater acoustics strives to prove things aren't as they seem—or sound—using only his ears.",
    vote_average: 7.7,
    release_date: "2019-02-20",
  },
  {
    id: 292011,
    poster_path: "/8t00sQPe2IgPNLnKmG1EnPUu7Ua.jpg",
    title: "Richard Jewell",
    overview:
      'Directed by Clint Eastwood and based on true events, "Richard Jewell" is a story of what happens when what is reported as fact obscures the truth. "There is a bomb in Centennial Park. You have thirty minutes." The world is first introduced to Richard Jewell as the security guard who reports finding the device at the 1996 Atlanta bombing-his report making him a hero whose swift actions save countless lives. But within days, the law enforcement wannabe becomes the FBI\'s number one suspect, vilified by press and public alike, his life ripped apart.  Richard Jewell thinks quick, works fast, and saves hundreds, perhaps thousands, of lives after a domestic terrorist plants several pipe bombs and they explode during a concert, only to be falsely suspected of the crime by sloppy FBI work and sensational media coverage.',
    vote_average: 7.4,
    release_date: "2019-12-13",
  },
]
// //////////////////////////////////////////
const eachMovieDetails = [
  {
    id: 454626,
    imdb_id: "tt3794354",
    genres: [
      {
        id: 28,
        name: "Action",
      },
      {
        id: 878,
        name: "Science Fiction",
      },
      {
        id: 35,
        name: "Comedy",
      },
      {
        id: 10751,
        name: "Family",
      },
    ],
    runtime: 99,
    casts: {
      cast: [
        {
          cast_id: 16,
          character: "Sonic the Hedgehog (voice)",
          credit_id: "5b6bfd830e0a267ef8130eba",
          gender: 2,
          id: 222121,
          name: "Ben Schwartz",
          order: 0,
          profile_path: "/ty2N3LuUiXO1uKyRg74DUN82xQe.jpg",
        },
        {
          cast_id: 6,
          character: "Tom Wachowski",
          credit_id: "5b0f7123c3a36862150030ab",
          gender: 2,
          id: 11006,
          name: "James Marsden",
          order: 1,
          profile_path: "/tJK1PbhcJj5cBNqnuFKHtAFPQKz.jpg",
        },
        {
          cast_id: 8,
          character: "Dr. Ivo Robotnik / Eggman",
          credit_id: "5b374b150e0a26400403651f",
          gender: 2,
          id: 206,
          name: "Jim Carrey",
          order: 2,
          profile_path: "/iKm46FMIhvmPUI0BeUkDzK0560s.jpg",
        },
        {
          cast_id: 7,
          character: "Maddie Wachowski",
          credit_id: "5b1a29df9251414bc6012129",
          gender: 1,
          id: 110742,
          name: "Tika Sumpter",
          order: 3,
          profile_path: "/Ag3YMvWtDbFITxZdc1lk1bPsR6K.jpg",
        },
        {
          cast_id: 17,
          character: "Agent Stone",
          credit_id: "5c4567720e0a26494dc6960f",
          gender: 2,
          id: 208677,
          name: "Lee Majdoub",
          order: 4,
          profile_path: "/vpF3R2YRCGHseGevmDAhftmOPkO.jpg",
        },
        {
          cast_id: 18,
          character: "Crazy Carl",
          credit_id: "5c4567849251410e0a4dd93d",
          gender: 2,
          id: 61167,
          name: "Frank C. Turner",
          order: 5,
          profile_path: "/jSp2SxsNrhZw4JRBBxdwuGJdhyV.jpg",
        },
        {
          cast_id: 19,
          character: "Billy Robb",
          credit_id: "5c45678fc3a3684777829db2",
          gender: 2,
          id: 115974,
          name: "Adam Pally",
          order: 6,
          profile_path: "/txrFlUJuKu6vz5mQmpknVwnnnk8.jpg",
        },
        {
          cast_id: 20,
          character: "Rachel",
          credit_id: "5c45679ac3a3684e968200f9",
          gender: 1,
          id: 1546282,
          name: "Natasha Rothwell",
          order: 7,
          profile_path: "/x5KdL3QoS4YuozVpfuPsu3MLwwf.jpg",
        },
        {
          cast_id: 21,
          character: "Major Bennington",
          credit_id: "5c4567a2c3a3684782829f6a",
          gender: 2,
          id: 2203,
          name: "Neal McDonough",
          order: 8,
          profile_path: "/8Vg7WKE4QEGz18at8mQHP9aqEbB.jpg",
        },
        {
          cast_id: 22,
          character: "New Girlfriend",
          credit_id: "5c4567aac3a36847938285f6",
          gender: 1,
          id: 1615066,
          name: "Debs Howard",
          order: 9,
          profile_path: "/h3FM5cJw0TatuT56PBKUZSkAv21.jpg",
        },
        {
          cast_id: 31,
          character: "Minivan Kid #1",
          credit_id: "5d0f9cb30e0a2602a1ce39e5",
          gender: 1,
          id: 1529002,
          name: "Bailey Skodje",
          order: 11,
          profile_path: "/a0YjGIjlTduDHqAjvmT8GkJoMvv.jpg",
        },
        {
          cast_id: 32,
          character: "Minivan Mom",
          credit_id: "5ded66badaf57c0019ec718b",
          gender: 1,
          id: 1075842,
          name: "Lisa Chandler",
          order: 12,
          profile_path: "/y7mQIO2R9ufOtCZFuzSd4Vn78z1.jpg",
        },
        {
          cast_id: 33,
          character: "Secretary of Homeland Security",
          credit_id: "5ded66cd158c850013827ec7",
          gender: 1,
          id: 203639,
          name: "Elfina Luk",
          order: 13,
          profile_path: "/mvS5UzayidDnim2soiKfZo9lTI8.jpg",
        },
        {
          cast_id: 40,
          character: "Air Force Chief of Staff",
          credit_id: "5e25b1671bf2660016fd6354",
          gender: 2,
          id: 164114,
          name: "Michael Hogan",
          order: 14,
          profile_path: "/c14qQjStwZEs7caQCArYNbdOK2i.jpg",
        },
        {
          cast_id: 41,
          character: "Roundhouse Waitress",
          credit_id: "5e25b1735ed8e9001762b1e8",
          gender: 0,
          id: 221843,
          name: "Shannon Chan-Kent",
          order: 15,
          profile_path: "/8IlXko1VTY1C7IX5U38tweXJQjJ.jpg",
        },
        {
          cast_id: 42,
          character: "Parisian Little Girl",
          credit_id: "5e25b19f21c4ca0013f8bff0",
          gender: 0,
          id: 2511338,
          name: "Emma Oliver",
          order: 16,
          profile_path: null,
        },
        {
          cast_id: 43,
          character: "Minivan Kid #2",
          credit_id: "5e25b1bb1bf2660012fd5069",
          gender: 0,
          id: 1619320,
          name: "Dean Petriw",
          order: 17,
          profile_path: null,
        },
        {
          cast_id: 44,
          character: "Tough Bar Patron",
          credit_id: "5e25b1c75ed8e9001762b226",
          gender: 0,
          id: 2382046,
          name: "Nicholas Dohy",
          order: 18,
          profile_path: null,
        },
        {
          cast_id: 45,
          character: "JoJo (as Melody Niemann)",
          credit_id: "5e25b1dc8f26bc00117beeb4",
          gender: 0,
          id: 2515638,
          name: "Melody Nosipho Niemann",
          order: 19,
          profile_path: null,
        },
        {
          cast_id: 47,
          character: "Business Woman",
          credit_id: "5e25b1f421c4ca0015f8c533",
          gender: 1,
          id: 2103024,
          name: "Jeanie Cloutier",
          order: 21,
          profile_path: null,
        },
        {
          cast_id: 48,
          character: "Minivan Dad",
          credit_id: "5e25b1ff5ed8e90013628ee2",
          gender: 2,
          id: 113206,
          name: "Jeff Sanca",
          order: 22,
          profile_path: null,
        },
        {
          cast_id: 49,
          character: "Driver",
          credit_id: "5e25b20a5ed8e9001762b29f",
          gender: 2,
          id: 1875486,
          name: "Steve Warky Nunez",
          order: 23,
          profile_path: "/fek0NwRFdDFZwXNZiCFrR85qVme.jpg",
        },
        {
          cast_id: 50,
          character: "Military Soldier",
          credit_id: "5e25b2ebbfeb8b0015d6d0cf",
          gender: 0,
          id: 1565168,
          name: "John Flanagan",
          order: 24,
          profile_path: "/zLSndZShO8dkHiNMhcs9fF6iNVQ.jpg",
        },
        {
          cast_id: 51,
          character: "Receptionist",
          credit_id: "5e25b2f68f26bc00157b54a4",
          gender: 0,
          id: 2515639,
          name: "Bethel Lee",
          order: 25,
          profile_path: null,
        },
        {
          cast_id: 52,
          character: "Line Dancer",
          credit_id: "5e25b304a894d600123c7df6",
          gender: 0,
          id: 2515640,
          name: "Breanna Watkins",
          order: 26,
          profile_path: null,
        },
        {
          cast_id: 53,
          character: "Mrs. Porter",
          credit_id: "5e25b310a894d6000f3c6f30",
          gender: 0,
          id: 2515641,
          name: "Eleanor Whibley",
          order: 27,
          profile_path: null,
        },
        {
          cast_id: 54,
          character: "Business Man",
          credit_id: "5e25b32621c4ca0015f8c931",
          gender: 0,
          id: 1804264,
          name: "Jeremy Arnold",
          order: 28,
          profile_path: null,
        },
        {
          cast_id: 55,
          character: "Military Soldier (uncredited)",
          credit_id: "5e25b3358f26bc00157b5507",
          gender: 0,
          id: 2515642,
          name: "Richard David Lecoin",
          order: 29,
          profile_path: null,
        },
        {
          cast_id: 56,
          character: "Rowdy Bar Folk Member (uncredited)",
          credit_id: "5e25b34521c4ca0015f8c9c3",
          gender: 0,
          id: 2058116,
          name: "John Specogna",
          order: 30,
          profile_path: null,
        },
        {
          cast_id: 57,
          character: "Miles 'Tails' Prower (voice) (uncredited)",
          credit_id: "5e4732372d93750013a4ddfe",
          gender: 1,
          id: 1212864,
          name: "Colleen O'Shaughnessey",
          order: 31,
          profile_path: "/y3Kl5tCX1XD6uyL9wefTRbEXTwj.jpg",
        },
        {
          cast_id: 58,
          character: "Jack Traven (archive footage) (uncredited)",
          credit_id: "5e474665134d5800182e6899",
          gender: 2,
          id: 6384,
          name: "Keanu Reeves",
          order: 32,
          profile_path: "/bOlYWhVuOiU6azC4Bw6zlXZ5QTC.jpg",
        },
        {
          cast_id: 59,
          character: "Howard Payne (archive footage) (uncredited)",
          credit_id: "5e4746831e9225001abf0ac3",
          gender: 2,
          id: 2778,
          name: "Dennis Hopper",
          order: 33,
          profile_path: "/56nj2DfMVU3F9qUagZWMePLbrKF.jpg",
        },
        {
          cast_id: 60,
          character: "Frank Drebin (archive footage) (uncredited)",
          credit_id: "5e4746be676ce20015fc8b5c",
          gender: 2,
          id: 7633,
          name: "Leslie Nielsen",
          order: 34,
          profile_path: "/u06yDkcwgd5qEDJXckV7T3aRby0.jpg",
        },
        {
          cast_id: 61,
          character: "Navy Chief of Staff",
          credit_id: "5e477b99676ce20015fcd4c7",
          gender: 2,
          id: 26089,
          name: "Garry Chalk",
          order: 35,
          profile_path: "/1estlif6pDM9uV7sgOsTU3WQeYw.jpg",
        },
        {
          cast_id: 62,
          character: "On-Set Sonic",
          credit_id: "5e477bf2676ce20013fd112c",
          gender: 0,
          id: 134612,
          name: "Scott Patey",
          order: 36,
          profile_path: "/mZ7mtsEI1B4NcECU4n2KXAEh44N.jpg",
        },
      ],
      crew: [
        {
          credit_id: "5c45688f9251410e0c4df8b6",
          department: "Production",
          gender: 2,
          id: 11874,
          job: "Producer",
          name: "Neal H. Moritz",
          profile_path: "/cNcsEYmoS4niCz3UkVAA09dUIob.jpg",
        },
        {
          credit_id: "5b3a97e992514131ba0077cb",
          department: "Art",
          gender: 0,
          id: 17831,
          job: "Art Direction",
          name: "Grant Van Der Slagt",
          profile_path: null,
        },
        {
          credit_id: "5ded67490257640016533a4e",
          department: "Crew",
          gender: 2,
          id: 53593,
          job: "Stunts",
          name: "Pete Antico",
          profile_path: "/eG7VI6yLvSfPxTGKsv3vRaNCCHl.jpg",
        },
        {
          credit_id: "5c456884c3a368477a829e51",
          department: "Production",
          gender: 2,
          id: 55252,
          job: "Executive Producer",
          name: "Tim Miller",
          profile_path: "/dCyBYwhO76j5wA96HPb6k5xk2Le.jpg",
        },
        {
          credit_id: "5b3a97da0e0a266ff00144f5",
          department: "Sound",
          gender: 2,
          id: 56827,
          job: "Original Music Composer",
          name: "Junkie XL",
          profile_path: "/A4ppyrEpx4t96BALthouYItfFEH.jpg",
        },
        {
          credit_id: "5b0e443b92514153a800171f",
          department: "Camera",
          gender: 2,
          id: 58192,
          job: "Director of Photography",
          name: "Stephen F. Windon",
          profile_path: null,
        },
        {
          credit_id: "5ded678a32489b0012c21c66",
          department: "Crew",
          gender: 0,
          id: 58911,
          job: "Stunt Driver",
          name: "Krista Bell",
          profile_path: "/jIF67I0hjhpUVHboc761n2XNwI2.jpg",
        },
        {
          credit_id: "5b3a97a5c3a368483b00e43b",
          department: "Writing",
          gender: 2,
          id: 63449,
          job: "Screenplay",
          name: "Josh Miller",
          profile_path: null,
        },
        {
          credit_id: "5b3a97cfc3a36845b80115ad",
          department: "Writing",
          gender: 2,
          id: 63453,
          job: "Screenplay",
          name: "Patrick Casey",
          profile_path: null,
        },
        {
          credit_id: "5a8dba6a9251416c810011b9",
          department: "Directing",
          gender: 2,
          id: 93364,
          job: "Director",
          name: "Jeff Fowler",
          profile_path: "/wExdubFgeBkEUP8MojKPKoOcgdZ.jpg",
        },
        {
          credit_id: "5b3a984b925141342f008a88",
          department: "Production",
          gender: 2,
          id: 93364,
          job: "Executive Producer",
          name: "Jeff Fowler",
          profile_path: "/wExdubFgeBkEUP8MojKPKoOcgdZ.jpg",
        },
        {
          credit_id: "5b3a978b0e0a2664d7008f92",
          department: "Writing",
          gender: 0,
          id: 1090787,
          job: "Screenplay",
          name: "Oren Uziel",
          profile_path: "/1ipKuag8BcCNCcWLp2GgSK7INNq.jpg",
        },
        {
          credit_id: "5ded675bdaf57c0013ec7f81",
          department: "Crew",
          gender: 2,
          id: 1463656,
          job: "Stunt Driver",
          name: "Dean Bailey",
          profile_path: "/xocAhU173kVnHnnC3cM8DaQKncT.jpg",
        },
        {
          credit_id: "5c4568a09251410e0a4dda05",
          department: "Production",
          gender: 0,
          id: 1475719,
          job: "Producer",
          name: "Takeshi Itō",
          profile_path: null,
        },
        {
          credit_id: "5c45683d0e0a26495ac69a65",
          department: "Writing",
          gender: 2,
          id: 1480594,
          job: "Story",
          name: "Van Robichaux",
          profile_path: null,
        },
        {
          credit_id: "5c4568479251410e1b4de1d7",
          department: "Writing",
          gender: 0,
          id: 1480595,
          job: "Story",
          name: "Evan Susser",
          profile_path: null,
        },
        {
          credit_id: "5ded67c1daf57c0013ec7ff0",
          department: "Crew",
          gender: 0,
          id: 1558276,
          job: "Stunts",
          name: "Kory Grim",
          profile_path: null,
        },
        {
          credit_id: "5ded67af158c850015827630",
          department: "Crew",
          gender: 2,
          id: 1814884,
          job: "Stunts",
          name: "Tommy Clarke",
          profile_path: "/fUGeKtPB2tNQO4B6pC10GqdZlIm.jpg",
        },
        {
          credit_id: "5b3a97fd9251416a4500795d",
          department: "Directing",
          gender: 0,
          id: 2045537,
          job: "First Assistant Director",
          name: "Justin Muller",
          profile_path: null,
        },
        {
          credit_id: "5c4568adc3a3684789828639",
          department: "Production",
          gender: 0,
          id: 2222899,
          job: "Producer",
          name: "Mie Onishi",
          profile_path: null,
        },
        {
          credit_id: "5c4568bdc3a368478982865f",
          department: "Production",
          gender: 0,
          id: 2222900,
          job: "Producer",
          name: "Toru Nakahara",
          profile_path: null,
        },
        {
          credit_id: "5ded67dbdc86470011c3bc77",
          department: "Crew",
          gender: 0,
          id: 2478192,
          job: "Stunts",
          name: "Kia Stuart",
          profile_path: null,
        },
      ],
    },
  },
  {
    id: 449924,
    imdb_id: "tt2076298",
    genres: [
      {
        id: 28,
        name: "Action",
      },
      {
        id: 18,
        name: "Drama",
      },
      {
        id: 36,
        name: "History",
      },
    ],
    runtime: 105,
    casts: {
      cast: [
        {
          cast_id: 0,
          character: "叶问",
          credit_id: "58de54489251411ba600baa5",
          gender: 2,
          id: 1341,
          name: "Donnie Yen",
          order: 0,
          profile_path: "/eSuunsATXBaYTnr7IC4LGBrJ5yY.jpg",
        },
        {
          cast_id: 8,
          character: "万宗华",
          credit_id: "5d4bd971c68b694baf0e9f56",
          gender: 2,
          id: 1800792,
          name: "Wu Yue",
          order: 1,
          profile_path: "/hRePA3mh9mfAqX7SJ4rGxrNrxT7.jpg",
        },
        {
          cast_id: 3,
          character: "",
          credit_id: "5b4da4f09251417d0f0489d8",
          gender: 2,
          id: 83633,
          name: "Vanness Wu",
          order: 2,
          profile_path: "/pFlm7iHEhXpzJ2QKbtk9EApqtnN.jpg",
        },
        {
          cast_id: 4,
          character: "美国海军陆战队军官",
          credit_id: "5b4da509c3a36823e60582f6",
          gender: 2,
          id: 78110,
          name: "Scott Adkins",
          order: 3,
          profile_path: "/n1L8652hJAKi5l2sdrZ07oZJmos.jpg",
        },
        {
          cast_id: 5,
          character: "Bruce Lee",
          credit_id: "5c26696d925141064f15ea08",
          gender: 2,
          id: 1173223,
          name: "Danny Chan Kwok-Kwan",
          order: 4,
          profile_path: "/hkHu1Z4EtN47bPwh6PlBIE3Jz76.jpg",
        },
        {
          cast_id: 12,
          character: "",
          credit_id: "5dfe9db665686e001593419f",
          gender: 1,
          id: 2487703,
          name: "Vanda Lee",
          order: 5,
          profile_path: "/jRdDoFoHq36hg4kYxxiLa5DRYUW.jpg",
        },
        {
          cast_id: 15,
          character: "",
          credit_id: "5dfe9defd1a8930014882508",
          gender: 1,
          id: 932680,
          name: "Karena Ng",
          order: 6,
          profile_path: "/Adyj9p2Dwu8gch0lNvC7KOuDWaP.jpg",
        },
        {
          cast_id: 9,
          character: "肥波",
          credit_id: "5dfdb41265686e001891e64a",
          gender: 2,
          id: 65966,
          name: "Kent Cheng",
          order: 7,
          profile_path: "/rQRr8QvdkUsQVhchdUtiTznVVff.jpg",
        },
        {
          cast_id: 13,
          character: "",
          credit_id: "5dfe9dc826dac1001260200e",
          gender: 2,
          id: 1240871,
          name: "Ngo Ka-nin",
          order: 8,
          profile_path: "/cvFz4MA8jN7GXbfaIgjho1XYPCJ.jpg",
        },
        {
          cast_id: 14,
          character: "",
          credit_id: "5dfe9de3d236e600108d45f9",
          gender: 1,
          id: 117760,
          name: "Lynn Hung",
          order: 9,
          profile_path: "/fcpvkrle1JA944eylXERw3gqgus.jpg",
        },
        {
          cast_id: 16,
          character: "",
          credit_id: "5e1054d85907de0017da20a4",
          gender: 2,
          id: 240155,
          name: "Lo Meng",
          order: 10,
          profile_path: "/gNedk2BfzTARZcP15y2w4alXyUs.jpg",
        },
        {
          cast_id: 17,
          character: "Karate Champion",
          credit_id: "5e105514663b8700138160c2",
          gender: 2,
          id: 81671,
          name: "Mark Strange",
          order: 11,
          profile_path: null,
        },
        {
          cast_id: 18,
          character: "Colin Frater",
          credit_id: "5e10554dd64ac20018608d94",
          gender: 0,
          id: 1957064,
          name: "Chris Collins",
          order: 12,
          profile_path: null,
        },
      ],
      crew: [
        {
          credit_id: "5d4bd950c68b694baf0e9eed",
          department: "Directing",
          gender: 2,
          id: 18899,
          job: "Action Director",
          name: "Yuen Woo-ping",
          profile_path: "/7gr04tWDnsBHHmo18aYLWXZHAvC.jpg",
        },
        {
          credit_id: "5dfdb4b965686e001591bd91",
          department: "Sound",
          gender: 2,
          id: 57304,
          job: "Original Music Composer",
          name: "Kenji Kawai",
          profile_path: "/jIhpBTVJ4JmPFUbTlXROgL6GMCT.jpg",
        },
        {
          credit_id: "58de548bc3a3687c6700bda9",
          department: "Directing",
          gender: 2,
          id: 63571,
          job: "Director",
          name: "Wilson Yip",
          profile_path: "/wJHHLPt6oVvurN9Sk4ff1MFh7z6.jpg",
        },
        {
          credit_id: "5dfdb491d1a89300198723d6",
          department: "Editing",
          gender: 2,
          id: 63574,
          job: "Editor",
          name: "Nick Cheung",
          profile_path: null,
        },
        {
          credit_id: "58de59b7c3a3687c4d00c75c",
          department: "Writing",
          gender: 2,
          id: 77703,
          job: "Writer",
          name: "Edmond Wong",
          profile_path: null,
        },
        {
          credit_id: "5d4bd84d002134001227903b",
          department: "Production",
          gender: 2,
          id: 240177,
          job: "Executive Producer",
          name: "Raymond Wong",
          profile_path: "/1dbpTU3WKRaV0dBcAGxTsZ0zmIR.jpg",
        },
      ],
    },
  },
]

const mergeArraysConditionally = (listOfUpComingMovies, eachMovieDetails) => {
  let merged = []

  // First return the first array with only elements whose id matches with an element's id from the second array
  listOfUpComingMovies.every(i =>
    eachMovieDetails.map(j => j.id).includes(i.id) ? merged.push(i) : null,
  )

  // Now that I have got two separate arrays of matched and the original array, simply merge the matched array (on the basis of ID) with the original array containing the data.
  merged = merged.map(i =>
    Object.assign(
      i,
      eachMovieDetails.find(j => j.id === i.id),
    ),
  )
  // Get some of the nested values
  let modArr = merged.map(i => {
    return {
      ...i,
      castsArr: i.casts.cast.map(j => j.name),
      genreArr: i.genres.map(j => j.name),
      formattedRuntime: minsToHHMM(i.runtime),
      poster_path: `${IMAGE_HOST}${i.poster_path}`,
    }
  })
  let arrToReturn = map(
    modArr,
    partialRight(pick, [
      "imdb_id",
      "id",
      "poster_path",
      "title",
      "title",
      "overview",
      "vote_average",
      "release_date",
      "genreArr",
      "castsArr",
      "formattedRuntime",
    ]),
  )

  return arrToReturn
}

const expectedResult = [
  {
    imdb_id: "tt3794354",
    id: 454626,
    poster_path:
      "https://image.tmdb.org/t/p/w500/aQvJ5WPzZgYVDrxLX4R6cLJCEaQ.jpg",
    title: "Sonic the Hedgehog",
    overview:
      "Based on the global blockbuster videogame franchise from Sega, Sonic the Hedgehog tells the story of the world’s speediest hedgehog as he embraces his new home on Earth. In this live-action adventure comedy, Sonic and his new best friend team up to defend the planet from the evil genius Dr. Robotnik and his plans for world domination.",
    vote_average: 7.1,
    release_date: "2020-02-12",
    genreArr: ["Action", "Science Fiction", "Comedy", "Family"],
    castsArr: [
      "Ben Schwartz",
      "James Marsden",
      "Jim Carrey",
      "Tika Sumpter",
      "Lee Majdoub",
      "Frank C. Turner",
      "Adam Pally",
      "Natasha Rothwell",
      "Neal McDonough",
      "Debs Howard",
      "Bailey Skodje",
      "Lisa Chandler",
      "Elfina Luk",
      "Michael Hogan",
      "Shannon Chan-Kent",
      "Emma Oliver",
      "Dean Petriw",
      "Nicholas Dohy",
      "Melody Nosipho Niemann",
      "Jeanie Cloutier",
      "Jeff Sanca",
      "Steve Warky Nunez",
      "John Flanagan",
      "Bethel Lee",
      "Breanna Watkins",
      "Eleanor Whibley",
      "Jeremy Arnold",
      "Richard David Lecoin",
      "John Specogna",
      "Colleen O'Shaughnessey",
      "Keanu Reeves",
      "Dennis Hopper",
      "Leslie Nielsen",
      "Garry Chalk",
      "Scott Patey",
    ],
    formattedRuntime: "01:39",
  },
  {
    imdb_id: "tt2076298",
    id: 449924,
    poster_path:
      "https://image.tmdb.org/t/p/w500/yJdeWaVXa2se9agI6B4mQunVYkB.jpg",
    title: "Ip Man 4: The Finale",
    overview:
      "Following the death of his wife, Ip Man travels to San Francisco to ease tensions between the local kung fu masters and his star student, Bruce Lee, while searching for a better future for his son.",
    vote_average: 5.9,
    release_date: "2019-12-20",
    genreArr: ["Action", "Drama", "History"],
    castsArr: [
      "Donnie Yen",
      "Wu Yue",
      "Vanness Wu",
      "Scott Adkins",
      "Danny Chan Kwok-Kwan",
      "Vanda Lee",
      "Karena Ng",
      "Kent Cheng",
      "Ngo Ka-nin",
      "Lynn Hung",
      "Lo Meng",
      "Mark Strange",
      "Chris Collins",
    ],
    formattedRuntime: "01:45",
  },
]

test("mergeArraysConditionally() function should merger two array as expected", () => {
  expect(
    mergeArraysConditionally(listOfUpComingMovies, eachMovieDetails),
  ).toEqual(expectedResult)
})
