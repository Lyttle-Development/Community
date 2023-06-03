// This file is auto generated, don't edit it manually.
export const ModuleMarkdown = {
  Activity: {
    'birth-day': {
      txt: {
        announcement: {
          content: 'Happy Birthday, {users}!',
          documentation: '',
        },
        'error-date': {
          content: 'The date we got was invalid, please try again!',
          documentation: '',
        },
        'error-set': {
          content:
            'You already have a birthday set!\nAsk a server administrator to reset it if that was incorrect.',
          documentation: '',
        },
        'error-timeout': {
          content:
            'Oops! It looks like your request has timed out. Please try again!',
          documentation: '',
        },
        'modal-question-day': {
          content: 'What day were you born? (1-31)',
          documentation: '',
        },
        'modal-question-month': {
          content: 'What month were you born? (1-12)',
          documentation: '',
        },
        'modal-title': {
          content: 'Save your birthday',
          documentation: '',
        },
        'question-button-correct': {
          content: 'Yes, now save it please!',
          documentation: '',
        },
        'question-button-incorrect': {
          content: "Nope, that's incorrect...",
          documentation: '',
        },
        'question-confirm': {
          content:
            'So if everything is correct...\nYou were born on {day} {month}.',
          documentation: '',
        },
        'question-confirm-image-url': {
          content:
            'https://media.tenor.com/z08o_-FUW18AAAAC/birthday-i-got-older.gif',
          documentation: '',
        },
        'result-closure': {
          content: 'This message can be closed!',
          documentation: '',
        },
        'result-faulty': {
          content: 'Nothing is saved, please run /setbday again!',
          documentation: '',
        },
        'result-success': {
          content: "You're all set. Thanks for submitting!",
          documentation: '',
        },
      },
    },
    levels: {
      commands: {
        'get-levels': {
          failed: {
            content:
              "**Oh no!**\nIt looks like we did not have the requirements for nice data!\nThe user(s) you gave me were not in our record or did not have that nice data we need...\nI'm so sorry, try with other users or say to your friend to be active xD!",
            documentation: '',
          },
          other: {
            content:
              '{user} currently has **{levels} {levelsUnit}** or te be more exact, **{points}** experience {pointsUnit}.  🪙\nThey needs **{points} {pointsUnit}** more for level **{nextLevel}**!  📊\nLeveling **difficulty** is **{timesHarder}** bigger than their first level ever...  📈',
            documentation: '',
          },
          others: {
            content:
              '{levelsUnit}: **{levels}**\n{pointsUnit}: **{points}**\n**{neededPointsNextLevel}** {pointsUnit} more for level **{nextLevel}**!\nLeveling difficulty is **{timesHarder}** times bigger...\n\n{stateText}',
            documentation: '',
          },
          'others-ahead': {
            content:
              'Is {levels} {levelsUnit} or {points} {pointsUnit} **ahead** 🏃',
            documentation: '',
          },
          'others-behind': {
            content:
              'Is {levels} {levelsUnit} or {points} {pointsUnit} **behind** 🚶',
            documentation: '',
          },
          yourself: {
            content:
              'You currently have **{levels} {levelsUnit}** or to be more exact, **{points}** experience {pointsUnit}.  🪙\nYou need **{neededPointsNextLevel} {pointsUnit}** more for level **{nextLevel}**!  📊\nLeveling **difficulty** is **{timesHarder}** times bigger than your first level ever...  📈',
            documentation: '',
          },
        },
      },
      event: {
        'level-up': {
          content: '{user} just advanced to {level} {unit}!',
          documentation:
            'Level up\nThe message send when leveling up.\nTriggered when a player levels up.',
        },
      },
      txt: {
        nickname: {
          content: '{name} • {recentLevels}{levels}',
          documentation:
            'Nicknames\nGive members a nickname when they level up.\nHappens when changing name or leveling up.',
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
    'dynamic-voice': {
      txt: {
        'channel-names': {
          content:
            '🐜・Ant\n🐤・Baby Chick\n🐥・Baby Chick\n🦡・Badger\n🦇・Bat\n🐻・Bear\n🦫・Beaver\n🪲・Beetle\n🐦・Bird\n🦬・Bison\n🐈・Black Cat\n🐡・Blowfish\n🐗・Boar\n🐛・Bug\n🦋・Butterfly\n🐪・Camel\n🐱・Cat Face\n🐈・Cat\n🐔・Chicken\n🐿・Chipmunk\n🪳・Cockroach\n🪸・Coral\n🐮・Cow Face\n🐄・Cow\n🦗・Cricket\n🐊・Crocodile\n🦌・Deer\n🦤・Dodo\n🐶・Dog Face\n🐕・Dog\n🐬・Dolphin\n🕊・Dove\n🐲・Dragon Face\n🐉・Dragon\n🦆・Duck\n🦅・Eagle\n🐘・Elephant\n🐑・Ewe\n🐟・Fish\n🦩・Flamingo\n🪰・Fly\n🦊・Fox\n🐸・Frog\n🦒・Giraffe\n🐐・Goat\n🦍・Gorilla\n🦮・Guide Dog\n🐹・Hamster\n🐣・Hatching Chick\n🦔・Hedgehog\n🦛・Hippopotamus\n🐝・Honeybee\n🐴・Horse Face\n🐎・Horse\n🦘・Kangaroo\n🐨・Koala\n🐞・Lady Beetle\n🐆・Leopard\n🦁・Lion\n🦎・Lizard\n🦙・Llama\n🦣・Mammoth\n🦠・Microbe\n🐵・Monkey Face\n🐒・Monkey\n🦟・Mosquito\n🐭・Mouse Face\n🐁・Mouse\n🐙・Octopus\n🦧・Orangutan\n🦦・Otter\n🦉・Owl\n🐂・Ox\n🐼・Panda\n🦜・Parrot\n🐾・Paw Prints\n🦚・Peacock\n🐧・Penguin\n🐷・Pig Face\n🐽・Pig Nose\n🐖・Pig\n🐻・Polar Bear\n🐩・Poodle\n🐰・Rabbit Face\n🐇・Rabbit\n🦝・Raccoon\n🐏・Ram\n🐀・Rat\n🦏・Rhinoceros\n🐓・Rooster\n🦕・Sauropod\n🦂・Scorpion\n🦭・Seal\n🦈・Shark\n🦨・Skunk\n🦥・Sloth\n🐌・Snail\n🐍・Snake\n🕸・Spider Web\n🕷・Spider\n🐚・Spiral Shell\n🐳・Spouting Whale\n🦢・Swan\n🦖・T-Rex\n🐯・Tiger Face\n🐅・Tiger\n🐠・Tropical Fish\n🦃・Turkey\n🐢・Turtle\n🐫・Two-hump Camel\n🦄・Unicorn\n🐃・Water Buffalo\n🐋・Whale\n🐺・Wolf\n🪱・Worm\n🦓・Zebra',
          documentation: 'Timmah\nKillah\nLudahgh\nLiagg\nCedahh',
        },
      },
    },
    'voice-topic': {
      txt: {
        deleted: {
          content:
            'The channel was deleted due to inactivity!\nIf you still want to be on-topic, create a new one!',
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
            'Channel has been created successfully!\nHave fun talking! *(hopefully on-topic 😉!)*',
          documentation: '',
        },
        success: {
          content:
            "Channel has been created successfully!\nWe will delete this channel <t:{time}:R> if you don't go into it.",
          documentation: '',
        },
      },
    },
  },
  Dashboard: {
    components: {
      'main-nav': {
        'label-dashboard': {
          content: 'Servers',
          documentation: '',
        },
        'label-home': {
          content: 'Home',
          documentation: '',
        },
        'label-logout': {
          content: 'Logout',
          documentation: '',
        },
        'label-modules': {
          content: 'Modules',
          documentation: '',
        },
        'label-overview': {
          content: 'Overview',
          documentation: '',
        },
        'label-profile': {
          content: 'Profile',
          documentation: '',
        },
      },
      'module-card': {
        'setup-button': {
          content: 'Setup',
          documentation: '',
        },
        'title-prefix': {
          content: 'Module: ',
          documentation: '',
        },
      },
      search: {
        'input-placeholder': {
          content: "I'm looking for ...",
          documentation: '',
        },
      },
      'server-card': {
        members: {
          content: 'members',
          documentation: '',
        },
        modules: {
          content: 'modules',
          documentation: '',
        },
        setup: {
          content: 'This server is not setup, yet!',
          documentation: '',
        },
        'setup-button': {
          content: 'Setup',
          documentation: '',
        },
        'staff-members': {
          content: 'staff members',
          documentation: '',
        },
      },
      snackbar: {
        changes: {
          reset: {
            content: 'Reset',
            documentation: '',
          },
          review: {
            content: 'Review and save',
            documentation: '',
          },
          title: {
            content: 'You have unsaved updates!',
            documentation: '',
          },
        },
        resetting: {
          cancel: {
            content: 'No, cancel please!',
            documentation: '',
          },
          reset: {
            content: 'Yes, Reset!',
            documentation: '',
          },
          title: {
            content: 'Are you sure you want to reset all changes?',
            documentation: '',
          },
        },
      },
    },
    pages: {
      dashboard: {
        title: {
          content: 'Servers',
          documentation: '',
        },
      },
      home: {
        'add-button': {
          content: 'Add To Server',
          documentation: '',
        },
        'join-button': {
          content: 'Join us on Discord',
          documentation: '',
        },
        'landing-description': {
          content:
            'Based on your community & everything that involves it. I try to keep my communities active, safe, and fun for everyone, and this without any product placement.',
          documentation: '',
        },
        'landing-title': {
          content: 'Your community, our duty!',
          documentation: '',
        },
        title: {
          content: 'Home',
          documentation: '',
        },
      },
      module: {
        birthdays: {
          announcement: {
            description: {
              content: "The channel to announce when its someone's birthday.",
              documentation: '',
            },
            title: {
              content: 'Announcement',
              documentation: '',
            },
          },
          description: {
            content:
              'The Birthday module is designed to enhance the celebration of birthdays within a community or organization. It provides features such as dedicated announcement channels, reminders, and personalized messages, ensuring that birthdays are acknowledged and celebrated in a meaningful way. With this module, users can foster a sense of connection and create a warm and inclusive atmosphere during special occasions.',
            documentation: '',
          },
          title: {
            content: 'Birthdays',
            documentation: '',
          },
        },
        'dynamic-voice': {
          card: {
            description: {
              content: 'This channel is configured to be dynamic master.',
              documentation: '',
            },
          },
          description: {
            content:
              'The Dynamic Voice Growth module enhances the scalability and flexibility of voice channels within a community. It automatically adjusts the number of available voice channels based on user activity, ensuring an optimal balance between demand and available resources. With this module, users can enjoy seamless voice communication without the need for manual channel creation or adjustment, making it easier to accommodate a growing community and fluctuating usage patterns.',
            documentation: '',
          },
          title: {
            content: 'Dynamic Voice Channels',
            documentation: '',
          },
        },
        levels: {
          announcement: {
            description: {
              content: 'The channel to announce when someone leveled up.',
              documentation: '',
            },
            title: {
              content: 'Announcement',
              documentation: '',
            },
          },
          description: {
            content:
              'The Leveling module adds a gamified element to the community experience, allowing users to progress and level up based on their participation and activity. It includes features such as automatic assignment of levels, leaderboards, and rewards, motivating users to engage more actively. With this module, users can track their progress, compete with others, and unlock new privileges or perks as they advance through different levels.',
            documentation: '',
          },
          leaderboard: {
            description: {
              content: 'The channel to send ones a week a leaderboard in.',
              documentation: '',
            },
            title: {
              content: 'Leaderboard',
              documentation: '',
            },
          },
          nickname: {
            description: {
              content: 'Enable nicknaming your users with their level.',
              documentation: '',
            },
            title: {
              content: 'Nicknames',
              documentation: '',
            },
          },
          title: {
            content: 'Leveling',
            documentation: '',
          },
        },
        'voice-topics': {
          card: {
            description: {
              content:
                'This channel is configured to accept button interactions, creating voice topics below it.',
              documentation: '',
            },
          },
          description: {
            content:
              'The Voice Topics module enriches the voice communication experience within a community or server. It enables users to create dedicated voice channels for specific topics or interests, promoting focused discussions and engagement. With this module, users can easily find and join voice channels that align with their interests, fostering meaningful conversations and building a stronger sense of community.',
            documentation: '',
          },
          title: {
            content: 'Voice Topics',
            documentation: '',
          },
        },
      },
      modules: {
        title: {
          content: 'Modules',
          documentation: '',
        },
      },
    },
  },
  Global: {
    months: {
      content:
        'January\nFebruary\nMarch\nApril\nMay\nJune\nJuly\nAugust\nSeptember\nOctober\nNovember\nDecember',
      documentation: '',
    },
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
