var Discord= require('discord.js');
var XMLHttpRequest=require("xmlhttprequest").XMLHttpRequest;
var axios=require('axios');
var logger=require('winston');
var auth=require('./auth.json');
var sock=require("socket.io");
var dgram=require("dgram");
var fs=require("fs");
var waitingTimers=[];
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console,{colorize:true});
logger.level='debug';
var bot=new Discord.Client();
bot.once('ready', () => {
	bot.user.setActivity("Watching Halo CE and Halo PC servers stats");
	console.log('Ready!');
});
bot.login(auth.Token);
function decodeString(string){
	var string_ret="";
	arreglo=[];
	for(let i=0;i<string.length;i++){
		let code=string.charCodeAt(i);
		if(code==0){
			arreglo.push(string_ret);
			string_ret="";
			continue;
		}
		if(code==1)continue;
		if(code==2)continue;
		if(code==42)continue;
		if(code==95)continue;
		if(code==96)continue;
		if(code==126)continue;
		string_ret+=string[i];
	}
	return arreglo;
}
function genString(string){
	console.log("~".charCodeAt(0));
	var array=decodeString(string);
	let svName=array[2];
	let port=array[6];
	let maxPlayers=array[8];
	let password="";
	if(parseInt(array[10])==0){
		password="FALSE";
	}else password="TRUE";
	let mapName=array[12];
	let numPlayers=array[20];
	let gametype=array[22];
	let teamplay="";
	if(parseInt(array[24])==0){
		teamplay="FALSE";
	}else teamplay="TRUE";
	let gamevar=array[26];
	let str="Server name:\t "+svName+"\nPort:\t "+port+"\nMax. Players:\t "+maxPlayers+"\nPassword:\t "+password+"\nMap name:\t "+mapName+"\nOnline Players:\t "+numPlayers;
	str=str+"\nGametype:\t "+gametype+"\nTeamplay:\t "+teamplay+"\nVariant:\t "+gamevar;
	let infPlayers="```\n";
	if(parseInt(numPlayers)==0){
		infPlayers+="No players online in this moment... (Maybe seed them?)";
	}else{
		for(let i=0;i<numPlayers;i++){
			let Team="";
			if(parseInt(array[40+i*4+3])==0){
			Team="RED";
			}else Team="BLUE";
			infPlayers+="Name:"+array[40+i*4]+"\tScore: "+array[40+i*4+1]+"\tPing: "+array[40+i*4+2]+"\tTeam: "+Team+"\n";
		}
	};
	infPlayers+="\n```";
	return [str+infPlayers,mapName];
}
function getMapDir(mapname){
		switch(mapname){
			case "deathisland":
				return "https://static.wikia.nocookie.net/halo/images/0/04/Isla_2.jpg/revision/latest/top-crop/width/220/height/220?cb=20120226012948&path-prefix=es";
				break;
			case "beavercreek":
				return "https://static.wikia.nocookie.net/halo/images/a/aa/Beavercreek.jpg/revision/latest?cb=20060727204435";
				break;
			case "chillout":
				return "https://static.wikia.nocookie.net/halo/images/2/2a/79220362729634319.jpg/revision/latest/scale-to-width-down/340?cb=20110630152316&path-prefix=es";
				break;
			case "ratrace":
				return "https://static.wikia.nocookie.net/halo/images/c/c3/RatRace.png/revision/latest?cb=20110326021303&path-prefix=es";
				break;
			case "bloodgulch":
				return "https://i.ytimg.com/vi/gbFVwhw8Wcs/mqdefault.jpg";
				break;
			case "gephyrophobia":
				return "https://static.wikia.nocookie.net/halo/images/0/00/Halo_CE_Gephyrophobia.jpg/revision/latest/scale-to-width-down/340?cb=20070604185719";
				break;
			case "hangemhigh":
				return "https://static.wikia.nocookie.net/halo/images/0/03/Hangemhigh.PNG/revision/latest?cb=20080514072638";
				break;
			case "boardingaction":
				return "https://static.wikia.nocookie.net/halo/images/1/11/BoardingAction.png/revision/latest?cb=20170414043015&path-prefix=es";
				break;
			case "damnation":
				return "https://static.wikia.nocookie.net/halo/images/1/1d/DamnationPC.JPG/revision/latest?cb=20070705204750";
				break;
			case "carousel":
				return "https://www.halopedia.org/images/thumb/5/52/Halo_CE_Derelict.jpg/1200px-Halo_CE_Derelict.jpg";
				break;
			case "prisoner":
				return "https://static.wikia.nocookie.net/halo/images/3/37/Prisoner.jpg/revision/latest?cb=20110706020746&path-prefix=es";
				break;
			case "dangercanyon":
				return "https://www.halopedia.org/images/thumb/e/e8/Halo_Combat_Evolved-Danger_Canyon.jpg/1200px-Halo_Combat_Evolved-Danger_Canyon.jpg";
				break;
			case "icefields":
				return "https://www.halopedia.org/images/thumb/d/db/Halo_Combat_Evolved-Ice_Fields.jpg/1200px-Halo_Combat_Evolved-Ice_Fields.jpg";
				break;
			case "infinity":
				return "https://www.halopedia.org/images/thumb/b/bb/Halo_Combat_Evolved-Infinity.jpg/1200px-Halo_Combat_Evolved-Infinity.jpg";
				break;
			case "longest":
				return "https://static.wikia.nocookie.net/halo/images/0/05/Longest2.jpg/revision/latest?cb=20060724232238";
				break;
			case "sidewinder":
				return "https://i.ytimg.com/vi/CQxcV48pa5A/maxresdefault.jpg";
				break;
			case "timberland":
				return "https://www.halopedia.org/images/thumb/5/53/Halo_Combat_Evolved-Timberland.jpg/1200px-Halo_Combat_Evolved-Timberland.jpg";
				break;
			case "wizard":
				return "https://static.wikia.nocookie.net/halo/images/c/c7/Wizard.png/revision/latest?cb=20110716200853&path-prefix=es";
				break;
			default:
				return "https://images.idgesg.net/images/article/2020/08/one_large_glowing_question_mark_surrounded_by_many_small_question_marks_questions_doubts_unknown_by_carloscastilla_gettyimages-1188952754_cso_nw_2400x1600-100854972-large.jpg";
				break;
		}
	}
function sendStats(msgD,ip,port,color,user){
	var id=0;
	var waitTime=1000;
	var conexion=dgram.createSocket("udp4");
	var embed=new Discord.MessageEmbed();
	embed.setColor(color);	
	embed.setAuthor("Hi! I obtained this:");
	embed.setFooter("Requested by: "+user.username+"#"+user.discriminator,user.avatarURL());
	try{
		port=parseInt(port);
		if(!port || port==NaN){
			embed.setTitle("Ops...");
			embed.setDescription("Could you please try again with a valid ip?...\nWhat about a server offline?");
			msgD.channel.send(embed);
			return;
		}
	}catch (e){
		console.log(e);
		embed.setTitle("Ops...");
		embed.setDescription("Could you please try again with a valid ip?...\nWhat about a server offline?");
		msgD.channel.send(embed);
		return;
	}
	if(port<=0 || port>=65536){
		embed.setTitle("Ops...");
		embed.setDescription("Could you please try again with a valid ip?...\nWhat about a server offline?");
		msgD.channel.send(embed);
		return;
	}
	var checkArreglo=ip.split(".");
	if(checkArreglo.length!=4){
		embed.setTitle("Ops...");
		embed.setDescription("Could you please try again with a valid ip?...\nWhat about a server offline?");
		msgD.channel.send(embed);
		return;	
	}
	for(let i=0;i<checkArreglo.length;i++){
		try{
			let part=parseInt(checkArreglo[i]);
			if((part<0 || part>255 ||!part || part==NaN) && part!=0){
				embed.setTitle("Ops...");
				embed.setDescription("Could you please try again with a valid ip?...\nWhat about a server offline?");
				msgD.channel.send(embed);
				return;
			}
		}catch(e){
			console.log(e);
			var embed=new Discord.MessageEmbed();
			embed.setTitle("Ops...");
			embed.setDescription("Could you please try again with a valid ip?...\nWhat about a server offline?");		
			msgD.channel.send(embed);
			return;
		}
	}
	conexion.on("error",(err)=>{
		console.log("server error: \n "+err.stack);
		conexion.close();
		embed.setTitle("Ops...");
		embed.setDescription("Could you please try again with a valid ip?...\nWhat about a server offline?");
		msgD.channel.send(embed);
	});
	conexion.on("message",(msg,rinfo)=>{
		clearTimeout(id);
		embed.setTitle("Checking states of "+ip+":"+port);
		let inf=genString(msg.toString());
		embed.setDescription(inf[0]);
		embed.setThumbnail(getMapDir(inf[1]));
		msgD.channel.send(embed);
		return;

	});
	conexion.on("listening",()=>{
		var address=conexion.address();
		console.log("server listening "+address.address+":"+address.port);
	});
	var mensaje=String.fromCharCode(254,253,0,119,106,63,63,255,255,255,255);
	conexion.send(Buffer.from(mensaje,"ascii"),0,11,port,ip); //ESTE TROZO VALE OROOOOOOOOOO
	id=setTimeout(function(){
		embed.setTitle("Ops...");
		embed.setDescription("Could you please try again with a valid ip?...\nWhat about a server offline?\nWaited time: "+waitTime+"ms for "+ip+":"+port+" server");
		msgD.channel.send(embed);
	},waitTime);		
}
bot.on("message",msg=>{
	if(msg.toString().substring(0,1)=='/'){
		var args=msg.toString().substring(1).split(' ');
		var cmd=args[0];
		switch(cmd){
			case "on":
				console.log(msg.author.avatarURL());
				if(args.length>2){
					sendStats(msg,args[1],parseInt(args[2]),msg.member.displayColor,msg.author);
				}else if(args.length>1){
					sendStats(msg,"104.153.105.98",parseInt(args[1]),msg.member.displayColor,msg.author);
				}
				break;
			case "hello":
				var embed=new Discord.MessageEmbed();
				embed.setColor(msg.member.displayColor);
				embed.setTitle("Hey");
				embed.setDescription("You can see /help if you want to discover my function");	
				embed.setAuthor("Good morning/afternoon/night");
				embed.setFooter("Requested by: "+user.username+"#"+user.discriminator,user.avatarURL());
				msg.channel.send(embed);
				break;
			case "help":
				var embed=new Discord.MessageEmbed();
				embed.setColor(msg.member.displayColor);
				embed.setTitle("And what does this bot?");
				embed.setDescription("Type /on [ip addres=104.153.105.98] <portNumber> to see some halo servers stats\nType /credits for some aditional info...");
				embed.setFooter("Requested by: "+user.username+"#"+user.discriminator,user.avatarURL());
				msg.channel.send(embed);
				var embed2=new Discord.MessageEmbed();
				embed2.setColor(msg.member.displayColor);
				embed2.setTitle("And what if...");
				embed2.setDescription("Keep me alive!\nOnly you have to enter a second to: https://vine-azure-hippopotamus.glitch.me/ and you will give him 5 minutes more!");
				msg.channel.send(embed2);
				break;
			case "credits":
				var embed=new Discord.MessageEmbed();
				embed.setColor(msg.member.displayColor);
				embed.setTitle("Huge thanks!");
				embed.setDescription("Based on: BK-Translator Bot (By Este)\nThanks to: hce.halomaps.org\n\nDeveloped by: {BK}Fochman\nhttps://github.com/edgardanielgd/HaloStatsForDiscord");
				embed.setAuthor("Hi! I obtained this:");
				embed.setFooter("Requested by: "+user.username+"#"+user.discriminator,user.avatarURL());
				msg.channel.send(embed);
				var embed2=new Discord.MessageEmbed();
				embed2.setColor(msg.member.displayColor);
				embed2.setTitle("And what if...");
				embed2.setDescription("Keep me alive!\nOnly you have to enter a second to: https://vine-azure-hippopotamus.glitch.me/ and you will give him 5 minutes more!");
				msg.channel.send(embed2);
				break;
			default:
				var embed=new Discord.MessageEmbed();
				embed.setColor(msg.member.displayColor);
				embed.setTitle("Maybe are you saying me something?");
				embed.setDescription("You can see /help if you want to discover my function");		
				embed.setFooter("Requested by: "+user.username+"#"+user.discriminator,user.avatarURL());
				msg.channel.send(embed);
				break;
		}
	}
});


