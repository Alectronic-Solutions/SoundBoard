document.addEventListener('DOMContentLoaded', () => {
    const soundboard = document.querySelector('.button-grid');

    // Predefined list of sound names
    const soundNames = [
        "Bank Notes for Millionaires",
        "Bye Felicia",
        "Hello Future Millionaires",
        "I am a Millionaire - Trump",
        "Millionaire $$$5min",
        "Phone a Friend HOLD",
        "LOSE Millionaire Short",
        "LOSE Millionaire",
        "Weakest Link",
        "You're a Millionaire",
        "Add up those figures sir",
        "Airhorn Classic",
        "Airhorn Sad",
        "Airhorn Fast",
        "Airhorn Buildup",
        "Drums Bongos",
        "Drums Ting",
        "Drums Medium",
        "Drums 1min",
        "Drums Rim Shot",
        "Clapping Normal",
        "Clapping Cheering",
        "Clapping Large Audience",
        "Clapping Short",
        "Clapping Medium",
        "Clapping Sus",
        "Dun Dun Dunnnn",
        "Clapping Medium Audience",
        "Metal Gear Alert",
        "Inception",
        "Laughing One",
        "Laughing Two",
        "Laughing Tree",
        "Laughing Fo",
        "Laughing Clap",
        "Laughing Sitcom",
        "Crickets",
        "Crowd Aww Cute",
        "Crowd Aww Loss",
        "Crowd Aww Nooo",
        "Crowd Booo",
        "Suspense Short",
        "Suspense Medium",
        "Suspense Tuba",
        "Suspense Harp",
        "Price is right LOSE",
        "Gameshow Ending Wacky",
        "Cartoon Slipping",
        "Yahoo",
        "Pac Man Death",
        "Spongebob Fail",
        "All you can talk about is Money",
        "Baby I got your Money - Song",
        "Credits Received",
        "Did somebody say make Money Money",
        "Give us some Money",
        "I do not have any Money",
        "Im making a donation",
        "Just do it",
        "Kaching",
        "Mario Coin",
        "Mario Power Up",
        "Mario Thank You so Much",
        "Money Money I want more Money",
        "Moneyyy Song",
        "Show me the Money",
        "Spend your Money like Money ain't Song",
        "Thaaanks Sarcastic",
        "Thank You for the donation lady",
        "Thank You for your patronage",
        "Thank You Rick",
        "Thank You South Park",
        "Thank You Sweet",
        "The Most Important Thing is Money",
        "Tip for you in my pocket",
        "Tree Fiddy",
        "Its raining men hallelujah",
        "Orgasm",
        "Pornhub",
        "That means your gay",
        "Two and half men",
        "What are you a homo",
        "You sound like a gay",
        "Gay",
        "In the Navy",
        "Bottle Rocket",
        "Get er Done",
        "Sexy GF",
        "Thats a lot of Nuts",
        "Who is your daddy and what does he do",
        "Dogs",
        "Gun Lazers Reggae",
        "Gun Lazers Tie Fighter",
        "Angelic Holy Tone",
        "Hallelujah",
        "Another One",
        "Bad to the Bone",
        "Bike Horn",
        "Boing",
        "Boing Two",
        "Boing Tree",
        "Boxing Bell",
        "Brutal MK",
        "You Lose MK",
        "Flawless Victory MK",
        "Fatality",
        "Suicide",
        "Buzzer",
        "Camera Click",
        "Cat Angry",
        "Car Crash",
        "Cop Siren",
        "Come on man",
        "I got hairy legs",
        "Do not come",
        "Im gonna come",
        "Crying Baby",
        "Bad to the Bone",
        "Fart",
        "Fart Two",
        "Fart Large",
        "I Caramba Bart",
        "He He Jackson",
        "Ha Ha Nelson",
        "Hawk Tuah",
        "Hawk Tuah Short",
        "Hawk Tuah Arnold",
        "Gun Rapid Fire",
        "Gun Shot with Cock",
        "Gun Cock",
        "Gun Richochet Miss",
        "Gonna Smoke Some Weed",
        "WoHoo Homer",
        "Wooo",
        "Who's that Pokemon",
        "White Dude for Harris",
        "Whip",
        "What Lil Jon",
        "Ok Lil Jon",
        "Yeah Lil Jon",
        "Tim Allen Grunt Home Improvement",
        "The more you know",
        "Road Runner",
        "Mario Game Over",
        "Trombone High Pitch",
        "Sad Trombone",
        "Sad Violin",
        "I've Fallen and I can't get up",
        "You Wanna Get High",
        "You Have Smoked Yourself Retarded",
        "Smoke Weed Everyday",
        "How Dare You",
        "Especially on weed man",
        "Law and Order",
        "You Can Do It",
        "You Belong To Me",
        "Ya Science",
        "Yeah So What",
        "Wow Dude",
        "Wow",
        "Chewbaca",
        "Donkey",
        "Elephant",
        "Moo",
        "Enoch",
        "Vince Tammy",
        "Mexican",
        "Aye Yi Yi Yi",
        "Mexican Americans",
        "Bill Nye the Science Guy",
        "In the Arms of an Angel",
        "Why Can't We Be Friends",
        "Bright Side of Life",
        "Benny Hill Chase Silly",
        "Curb Enthusiasm",
        "Baby Elephant Walk FRIDGE",
        "Silly Spanish Flea FRIDGE",
        "Seinfeld Intro",
        "Star Wars Cantina",
        "Every Little Thing is Gonna Be Alright",
        "Cheers",
        "All Star All Star",
        "Bad Boys Theme",
        "Friends Theme",
        "Get Swifty",
        "Irish",
        "Jammin Bob Marley",
        "Mad World",
        "Mission Impossible",
        "Pokemon",
        "Rehab Amy Winehouse",
        "ScoobyDoo",
        "Tequila",
        "Jade Pussycat",
        "The Stripper",
        "Threes Company",
        "Dracula Theme",
        "Family Feud Theme",
        "Godfather Theme",
        "Giligans Island Theme",
        "Fox TV Theme",
        "Jeopardy Theme",
        "Laverne and Shirley Theme",
        "Looney Toons Theme",
        "Mash Theme",
        "The Adams Family Theme",
        "The Jeffersons Theme",
        "Universal Studios",
        "Chinese Intro",
        "In San Fran its all about gay bath houses",
        "Asian Gong",
        "Can Do Sarcastic",
        "I can't take it anymore",
        "Hoo wee what a cliffhanger",
        "Hopefully you didn't fuck around and waste your life",
        "I have to fufill my purpose so I can go away",
        "Its getting wierd",
        "I've always been here for you guys and I always will be",
        "Were here to help",
        "Will I pay a lot of tax Trump",
        "Bomb the shit out of them Trump",
        "Congratulations Trump",
        "Hackings Bad Trump",
        "I don't remember Trump",
        "I really have nothing better to do Trump",
        "Your Fired Trump",
        "2000 Years Later",
        "Banjo Deliverance",
        "Can You Dig It",
        "Ha Ha Ha Shut Up",
        "Im Sorry",
        "Im Sorry I was such a saint before",
        "In a few mins bitch",
        "Eat Shit Derek",
        "My name Jeff",
        "Evil Laugh",
        "Im Kinda Retarded",
        "He was a Retard",
        "Retard Alert",
        "It is Maam",
        "How Good of You to Join Us Bane",
        "I dont give a fuuu",
        "I thought we had a deal",
        "Right Near the Beach Boi",
        "Well Be Right Back",
        "You Suck You Jackass",
        "Fuuuck Long",
        "Ive been doing martial arts my whole life I dont wanna fight",
        "Ohhh La La",
        "Sex Change I Need It Now",
        "I cant hear anything",
        "Thats What She Said",
        "Yeah Probably",
        "Yeah this is gonna help with that bitch",
        "I thought this was america",
        "Im a Secret Agent",
        "Shut the Fuck Up",
        "What is That Joke",
        "What do you mean funny funny how",
        "Your Rights Are My Responsibilities",
        "What the hell is going on here exactly",
        "What are you people on dope",
        "What the hell is wrong with you people",
        "Whats the sound of one hand clapping",
        "Wheres the rest of my meth",
        "Who the Hell Cares",
        "Limit on Talking",
        "Why in the fuck would I do that",
        "All this computer hacking is making me thirsty",
        "Americas going to be great again gang",
        "Are You High or Just Incredibly Stupid",
        "As long as the matrix exists the human race can never be free",
        "Beat up by a guy wearing a dress",
        "Im gonna go kill myself",
        "Home Alone and Interested in Sex",
        "Im Chris Hanson with Dateline NBC",
        "Lot of perverts in here",
        "MotherFucker",
        "Oral Sex",
        "Anal Sex",
        "She Shall Lure some Millionaire",
        "Sitting Next to a Millionaire",
        "Taxes",
    ];

    // Object to hold all audio objects
    const soundObjects = {};

    // Function to create buttons
    function createButtons() {
        soundboard.innerHTML = ''; // Clear existing buttons
        soundNames.forEach((soundName, index) => {
            const soundFile = `sounds/${soundName.replace(/:/g, '_')}.mp3`;
            // Create Audio object and store it in soundObjects
            soundObjects[soundFile] = new Audio(soundFile);
            soundObjects[soundFile].preload = 'auto';
            soundObjects[soundFile].load();

            const button = document.createElement('button');
            button.className = 'sound-button';
            button.textContent = soundName; // Use the sound name as the button text
            button.setAttribute('data-index', index);
            button.setAttribute('data-sound', soundFile); // Store sound file path

            // Play sound on click
            button.addEventListener('click', () => handleButtonClick(soundFile));

            soundboard.appendChild(button);
        });
    }

    // Function to handle button click
    function handleButtonClick(soundFile) {
        const audio = soundObjects[soundFile];

        if (audio.paused) {
            audio.play()
                .then(() => {
                    console.log(`Playing ${soundFile}`);
                })
                .catch(error => {
                    console.error(`Error playing ${soundFile}:`, error);
                });
        } else {
            audio.pause();
            audio.currentTime = 0;
            console.log(`Stopped ${soundFile}`);
        }
    }

    // Predefined list of distinct colors
    const distinctColors = [
        '#ff5733', '#33ff57', '#3357ff', '#ff33a1', '#33a1ff',
        '#a133ff', '#ffa133', '#a1ff33', '#33ffa1', '#ff3357',
        '#57ff33', '#3357ff', '#ff57a1', '#a157ff', '#57a1ff',
        '#ffa157', '#a1ff57', '#57ffa1', '#ff5733', '#33ff57',
        '#3357ff', '#ff33a1', '#33a1ff', '#a133ff', '#ffa133',
        '#a1ff33', '#33ffa1', '#ff3357', '#57ff33', '#3357ff',
        '#ff57a1', '#a157ff', '#57a1ff', '#ffa157', '#a1ff57',
        '#57ffa1'
    ];

    function assignRowClasses() {
        const gridContainer = document.querySelector('.button-grid');
        const buttons = gridContainer.querySelectorAll('button');
        const gridRect = gridContainer.getBoundingClientRect();
        let previousTop = null;
        let rowIndex = 0;

        buttons.forEach(button => {
            const buttonRect = button.getBoundingClientRect();
            const buttonTop = buttonRect.top - gridRect.top;

            if (previousTop === null || buttonTop > previousTop + button.offsetHeight - 1) {
                rowIndex++;
            }
            previousTop = buttonTop;

            // Assign data-row attribute
            button.setAttribute('data-row', rowIndex);

            // Assign a distinct color based on row index
            const colorIndex = rowIndex % distinctColors.length;
            button.style.setProperty('--row-color', distinctColors[colorIndex]);

            // Assign a row class based on row index
            button.classList.add(`row-${rowIndex}`);
        });
    }

    // Initial button creation and row class assignment
    createButtons();
    assignRowClasses();

    // Re-assign on window resize
    window.addEventListener('resize', assignRowClasses);
});