// This file is auto generated, don't edit it manually.
export const ModuleMarkdown = {
  Activity: {
    'dynamic-voice': {
      txt: {
        'channel-names': {
          content:
            '🐜・Ant\n🐤・Baby Chick\n🐥・Baby Chick\n🦡・Badger\n🦇・Bat\n🐻・Bear\n🦫・Beaver\n🪲・Beetle\n🐦・Bird\n🦬・Bison\n🐈・Black Cat\n🐡・Blowfish\n🐗・Boar\n🐛・Bug\n🦋・Butterfly\n🐪・Camel\n🐱・Cat Face\n🐈・Cat\n🐔・Chicken\n🐿・Chipmunk\n🪳・Cockroach\n🪸・Coral\n🐮・Cow Face\n🐄・Cow\n🦗・Cricket\n🐊・Crocodile\n🦌・Deer\n🦤・Dodo\n🐶・Dog Face\n🐕・Dog\n🐬・Dolphin\n🕊・Dove\n🐲・Dragon Face\n🐉・Dragon\n🦆・Duck\n🦅・Eagle\n🐘・Elephant\n🐑・Ewe\n🐟・Fish\n🦩・Flamingo\n🪰・Fly\n🦊・Fox\n🐸・Frog\n🦒・Giraffe\n🐐・Goat\n🦍・Gorilla\n🦮・Guide Dog\n🐹・Hamster\n🐣・Hatching Chick\n🦔・Hedgehog\n🦛・Hippopotamus\n🐝・Honeybee\n🐴・Horse Face\n🐎・Horse\n🦘・Kangaroo\n🐨・Koala\n🐞・Lady Beetle\n🐆・Leopard\n🦁・Lion\n🦎・Lizard\n🦙・Llama\n🦣・Mammoth\n🦠・Microbe\n🐵・Monkey Face\n🐒・Monkey\n🦟・Mosquito\n🐭・Mouse Face\n🐁・Mouse\n🐙・Octopus\n🦧・Orangutan\n🦦・Otter\n🦉・Owl\n🐂・Ox\n🐼・Panda\n🦜・Parrot\n🐾・Paw Prints\n🦚・Peacock\n🐧・Penguin\n🐷・Pig Face\n🐽・Pig Nose\n🐖・Pig\n🐻・Polar Bear\n🐩・Poodle\n🐰・Rabbit Face\n🐇・Rabbit\n🦝・Raccoon\n🐏・Ram\n🐀・Rat\n🦏・Rhinoceros\n🐓・Rooster\n🦕・Sauropod\n🦂・Scorpion\n🦭・Seal\n🦈・Shark\n🦨・Skunk\n🦥・Sloth\n🐌・Snail\n🐍・Snake\n🕸・Spider Web\n🕷・Spider\n🐚・Spiral Shell\n🐳・Spouting Whale\n🦢・Swan\n🦖・T-Rex\n🐯・Tiger Face\n🐅・Tiger\n🐠・Tropical Fish\n🦃・Turkey\n🐢・Turtle\n🐫・Two-hump Camel\n🦄・Unicorn\n🐃・Water Buffalo\n🐋・Whale\n🐺・Wolf\n🪱・Worm\n🦓・Zebra',
          documentation: 'Timmah\nKillah\nLudahgh\nLiagg\nCedahh',
        },
      },
    },
    levels: {
      commands: {
        'get-levels': {
          other: {
            content:
              '{user} currently has **{levels} {levelsUnit}** or te be more exact, **{points}** experience {pointsUnit}.  🪙\n{prefix}They needs **{points} {pointsUnit}** more for level **{nextLevel}**!  📊\n{prefix}Leveling **difficulty** is **{timesHarder}** bigger than their first level ever...  📈',
            documentation: '',
          },
          others: {
            content:
              '{levelsUnit}: **{levels}**\n{prefix}{pointsUnit}: **{points}**\n{prefix}**{neededPointsNextLevel}** {pointsUnit} more for level **{nextLevel}**!\n{prefix}Leveling difficulty is **{timesHarder}** times bigger...\n\n{stateText}',
            documentation: '',
          },
          'others-ahead': {
            content:
              'Is {levels} {levelsUnit}\n{prefix}or {points} {pointsUnit} **ahead** 🏃',
            documentation: '',
          },
          'others-behind': {
            content:
              'Is {levels} {levelsUnit}\n{prefix}or {points} {pointsUnit} **behind** 🚶',
            documentation: '',
          },
          yourself: {
            content:
              'You currently have **{levels} {levelsUnit}** or to be more exact, **{points}** experience {pointsUnit}.  🪙\n{prefix}You need **{neededPointsNextLevel} {pointsUnit}** more for level **{nextLevel}**!  📊\n{prefix}Leveling **difficulty** is **{timesHarder}** times bigger than your first level ever...  📈',
            documentation: '',
          },
        },
      },
      event: {
        'level-up': {
          content: '{user} just advanced to {level} {unit}!',
          documentation: '',
        },
      },
      txt: {
        nickname: {
          content: '{name} • {recentLevels}{levels}',
          documentation: '',
        },
        'nickname-numbers': {
          levels: {
            content: 'superscript',
            documentation: '',
          },
          points: {
            content: 'subscript',
            documentation: '',
          },
          'recent-levels': {
            content: 'serif',
            documentation: '',
          },
          'recent-points': {
            content: 'round-full',
            documentation: '',
          },
        },
      },
      unit: {
        level: {
          content: 'level',
          documentation: '',
        },
        levels: {
          content: 'levels',
          documentation: '',
        },
        point: {
          content: 'point',
          documentation: '',
        },
        points: {
          content: 'points',
          documentation: '',
        },
      },
    },
  },
  Communication: {
    'voice-topic': {
      txt: {
        deleted: {
          content:
            'The channel was deleted due to inactivity!\n{prefix}If you still want to be on-topic, create a new one!',
          documentation: '',
        },
        'dialog-limit': {
          content: 'With how many people? (1-99)',
          documentation: '',
        },
        'dialog-title': {
          content: 'Create a voice topic channel',
          documentation: '',
        },
        'dialog-topic': {
          content: 'Whats the topic?',
          documentation: '',
        },
        joined: {
          content:
            'Channel has been created successfully!\n{prefix}Have fun talking! *(hopefully on-topic 😉!)*',
          documentation: '',
        },
        success: {
          content:
            "Channel has been created successfully!\n{prefix}We will delete this channel <t:{time}:R> if you don't go into it.",
          documentation: '',
        },
      },
    },
  },
  Global: {
    prefix: {
      content: '> ',
      documentation: '',
    },
    variables: {
      content: '',
      documentation: '',
    },
  },
};

export default ModuleMarkdown;
