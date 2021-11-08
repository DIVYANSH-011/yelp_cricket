const Player = require('../models/player');
const Comment = require('../models/comment');

const player_seeds = [
	{
		title:"MS Dhoni",
		description:"the series between India and Australia in 2009, Dhoni hit an aggressive 124 runs in just 107 balls, in the second ODI, and a measured knock of 71 runs in 95 balls, along with Yuvraj Singh and saw India home by 6 wickets in the third ODI. Dhoni took his first and only wicket in international cricket on 30 September 2009. He bowled Travis Dowlin of the West Indies during a match in the 2009 ICC Champions Trophy",
		role:"WK-Batsman",
		nickname:"Mahi,Thala",
		born:"1971-07-07",
		batting_style:"Right Handed Bat",
		bowling_style:"Right-arm medium",
		teams:"India, Asia XI, Chennai Super Kings, Indians, Jharkhand, Rising Pune Supergiant, India A",
		profiles:"all format player",
		achievement:"Padma Bhushan ,Padma Shri, Major Dhyan Chand Khel Ratna Award ,etc...",
		color:true,
		image:"https://www.cricketkeeda.com/wp-content/uploads/2020/03/if-IPL-get-cancelled-then-ms-dhoni-will-play-in-t20-world-cup-640x640.jpg"
	},
	{
		title:"Mitchell STARC",
		description:"A left-armer called Mitchell has been a staple of Australia's attack for more than a decade and seems set to remain so for the foreseeable future. While Johnson was more express, Starc is still quick enough to make life uncomfortable for opposition batsmen, especially with the bounce gained from his 1.96m height - and boasts greater control of swing than his older colleague. Never was that shown to greater effect than during the 2015 World Cup",
		role:"Bowler",
		nickname:"Starcy",
		born:"1990-01-30",
		batting_style:"Left Handed Bat",
		bowling_style:"Left-arm fast",
		teams:"Australia, New South Wales, Sydney Sixers, Yorkshire, Australians, Royal Challengers Bangalore, Sydney Thunder, Kolkata Knight Riders, Australia A",
		profiles:"bowlers",
		achievement:"Allan Border Medal",
		color:true,
		image:"https://i.guim.co.uk/img/media/2e8b416c7ff928e0ac0812498ecac7980decdffd/0_143_3500_2100/master/3500.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=54ba39eddb1e570ba49909a3541ded30"
	},
	{
		title:"Rohit SHARMA",
		description:"Talent – an apparently heartening term that has followed Rohit Sharma around like a shadow; even haunted him at times. It seems to be a burden that the cricketing fraternity has enforced upon him and, after more than a decade in the national setting, he has been weighed down by the label.",
		role:"Batsman",
		nickname:"Hitman",
		born:"1987-04-30",
		batting_style:"Right Handed Bat",
		bowling_style:"Right-arm offbreak",
		teams:"India, Deccan Chargers, India A, India Green, India U19, Mumbai, Mumbai Indians, Indians, India Blue, Board Presidents XI",
		profiles:"all format player",
		achievement:"Major Dhyan Chand Khel Ratna Award, Arjuna Awars",
		color:true,
		image:"https://w0.peakpx.com/wallpaper/554/757/HD-wallpaper-hitman-sharma-indian-cricket-rohit-sharma.jpg"
	}

]



const seed = async () => {
	// Delete All The Current Players And Comments
	await Player.deleteMany();
	console.log("Deleted All The Players!")
	
	await Comment.deleteMany();
	console.log("Deleted All The Comments:")
	// Create three new Players info
// 	for(const player_seed of player_seeds) {
// 		let player = await Player.create(player_seed);
// 		console.log("Created a new player:", player.title)
// 		// Create a new comment for each player
// 		await Comment.create({
// 			text:"Once In a generation Player!",
// 			user:"Divyansh_Singh",
// 			playerId: player._id
// 		})
// 		console.log("Created a new comment!")
// 	}
}

module.exports = seed;