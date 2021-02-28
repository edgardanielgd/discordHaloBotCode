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
var chanID="811984742261850123";
var msgID="811984828734898246";
var updateTime=300000;
var channelStats="";
var msgEdit="";
var JData={};
var servers=[2313,2628,2443,2333,2304,2400,2316,2399];
bot.once('ready', () => {
	bot.user.setActivity("Watching Halo CE and Halo PC servers stats");
	try{
		channelStats=bot.channels.cache.find(channel=> channel.id===chanID);
		channelStats.messages.fetch(msgID).then(function(message){msgEdit=message},function(){msgEdit=""});
		console.log(msgEdit);
	}catch(e){
		console.log(e);
	}
	console.log('Ready!');
});
bot.login(auth.Token);
var interval=setInterval(getSimpleStats,updateTime);
function decodeString(string){
	var string_ret="";
	var arreglo=[];
	for(let i=0;i<string.length;i++){
		let code=string.charCodeAt(i);
		if(code==0){
			arreglo.push(string_ret);
			string_ret="";
			continue;
		}
		if(code==1)continue;var Discord= require('discord.js');
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
var chanID="811984742261850123";
var msgID="811984828734898246";
var updateTime=300000;
var channelStats="";
var msgEdit="";
var JData={};
var servers=[2213,3628,2343,2333,2404,2430,2316,23900];
bot.once('ready', () => {
	bot.user.setActivity("Watching Halo CE and Halo PC servers stats");
	try{
		channelStats=bot.channels.cache.find(channel=> channel.id===chanID);
		channelStats.messages.fetch(msgID).then(function(message){msgEdit=message},function(){msgEdit=""});
		console.log(msgEdit);
	}catch(e){
		console.log(e);
	}
	console.log('Ready!');
});
bot.login(auth.Token);
var interval=setInterval(getSimpleStats,updateTime);
function decodeString(string){
	var string_ret="";
	var arreglo=[];
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
			infPlayers+=(i+1)+". Name:"+array[40+i*4]+"\tScore: "+array[40+i*4+1]+"\tPing: "+array[40+i*4+2]+"\tTeam: "+Team+"\n";
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
                        case "bigassv2,104":
                                return "http://hce.halomaps.org/images/files/lg/38screenshot00-39.jpg";
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
		conexion.close();
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
function genSimpleString(string){
	var array=decodeString(string);
	let numPlayers=array[20];
	let maxPlayers=array[8];
	let port=array[6];
	return [port,numPlayers+"/"+maxPlayers];
	}
function getSimpleStats(){
	var waitTime=1000;
	var embed=new Discord.MessageEmbed();
	var arreglo_servers=[];
	var id={};
	var conexion_arr=[]
	for(let i=0;i<servers.length;i++){
		conexion_arr.push(dgram.createSocket("udp4"));
		conexion_arr[i].on("error",(err)=>{
			console.log("server error: \n "+err.stack);
			conexion_arr[i].close();
			arreglo_servers.push(servers[i]+": error");
			if(arreglo_servers.length===servers.length){
				displaySimpleStats(arreglo_servers);
				for(let k=0;k<servers.length;k++){
					conexion_arr[k].close();
				}
			}		
		});
		conexion_arr[i].on("message",(msg,rinfo)=>{
			let inf=genSimpleString(msg.toString());
			clearTimeout(id[inf[0]]);
			arreglo_servers.push(inf[0]+": "+inf[1]);
			if(arreglo_servers.length===servers.length){
				displaySimpleStats(arreglo_servers);
				for(let k=0;k<servers.length;k++){
					conexion_arr[k].close();
				}
			}
		});
		conexion_arr[i].on("listening",()=>{
			var address=conexion_arr[i].address();
			console.log("server listening "+address.address+":"+address.port);
		});
		var mensaje=String.fromCharCode(254,253,0,119,106,63,63,255,255,255,255);
		conexion_arr[i].send(Buffer.from(mensaje,"ascii"),0,11,servers[i],"104.153.105.98");
		id[servers[i]]=setTimeout(function(port){
			arreglo_servers.push(port+": offline");
			if(arreglo_servers.length===servers.length){
				displaySimpleStats(arreglo_servers);
				for(let k=0;k<servers.length;k++){
					conexion_arr[k].close();
				}
			}
		},waitTime,servers[i]);
	}		
	}
function displaySimpleStats(arreglo){
	if(msgEdit){
		msgEdit.edit("");
		let embed=new Discord.MessageEmbed();
		embed.setTitle("Main servers stats");
		embed.setAuthor("Updating every "+updateTime+ " miliseconds");
		let fecha=new Date(Date.now());
		embed.setFooter("Main servers last scan "+fecha.getDate()+"/"+(fecha.getMonth()+1)+"/"+fecha.getFullYear()+" "+fecha.getHours()+":"+fecha.getMinutes()+":"+fecha.getSeconds());
		embed.setColor("#FFFFFF");
		embed.setDescription(arreglo.join("\n"));
		msgEdit.edit(embed);
	}
}
function readUsersIps(file){
	var xhr=new XMLHttpRequest();
	xhr.open("GET","https://natygift.000webhostapp.com/"+file+"?type=get");
	xhr.onreadystatechange=function(){
		console.log("ReadyS: "+this.readyState);
		console.log("State: "+this.status);
		if(this.readyState==4 && this.status==200){
			let respT=this.responseText;
			console.log(respT);
			if(respT){
				genJSON(respT.split("\n"));
			}else genJSON(false);
		}
	}
	xhr.send();
}
function genJSON(array){
	if (!array){return false}
	let jReturn={};
	let Key="";
	let ip="";
	let name="";
	let description="";
	if(array.length%4!=0)return false;
	for(let i=0;i<array.length;i+=1){
		if(i%4==0){
			Key=array[i];
		}else if(i%4==1){
			ip=array[i];	
		}else if(i%4==2){
			name=array[i];
		}else{
			description=array[i];
			jReturn[Key]=[ip,name,description];
		}
	}
	console.log(jReturn);
	JData=jReturn;
	return jReturn;
}
function addData(file,msg,ip,name,description){
	let embed=new Discord.MessageEmbed();
	embed.setColor(msg.member.displayColor);
	embed.setTitle("Here is what i found:");
	embed.setFooter("Requested by: "+msg.author.username+"#"+msg.author.discriminator,msg.author.avatarURL());
	let wrongDataError="";
	if(name.length>11){
		wrongDataError="Please type a correct name (no more than 11 characters)";
		embed.setDescription(wrongDataError);		
		msg.channel.send(embed);
		return wrongDataError;
	}
	let checkArreglo=ip.split(".");
	if(checkArreglo.length!=4){
		wrongDataError="Please type a correct IP";
		embed.setDescription(wrongDataError);		
		msg.channel.send(embed);
		return wrongDataError;
	}
	for(let i=0;i<checkArreglo.length;i++){
		try{
			let part=parseInt(checkArreglo[i]);
			if((part<0 || part>255 ||!part || part==NaN) && part!=0){
				wrongDataError="Please type a correct IP";
				embed.setDescription(wrongDataError);		
				msg.channel.send(embed);
				return wrongDataError;
			}
		}catch(e){
			console.log(e);
			wrongDataError="Please type a correct IP";
			embed.setDescription(wrongDataError);		
			msg.channel.send(embed);
			return wrongDataError;
		}
	}
	for(let Key in JData){
		
		if(JData[Key][0]==ip && JData[Key][1].toUpperCase()==name.toUpperCase()){
			wrongDataError="There is the same ip with the same name...\nPleae search a ip before adding one";
			embed.setDescription(wrongDataError);		
			msg.channel.send(embed);
			return wrongDataError;
		}
	}
	if(description=="")description=" ";
	let descriptionE=encodeURI(description);
	let newData="";
	var xhr=new XMLHttpRequest();
	var key=Date.now();
	let sending="?type=set"+"&key="+key+"&ip="+ip+"&name="+name+"&description="+descriptionE;
	xhr.open("GET","https://natygift.000webhostapp.com/"+file+sending);
	xhr.onreadystatechange=function(){
		console.log("ReadyS: "+this.readyState);
		console.log("State: "+this.status);
		if(this.readyState==4 && this.status==200){
			let respT=this.responseText;
			console.log(respT);
			if(respT=="Success"){
				JData[key]=[ip,name,description];
				embed.setDescription("Success");		
				msg.channel.send(embed);
			}else{
				embed.setDescription("Failed");		
				msg.channel.send(embed);
			};
		}
	}
	xhr.send();
}
function match(str1,str2){
	let strMin,strMax;
	if(str1.length>=str2.length){
		strMax=str1.toUpperCase();
		strMin=str2.toUpperCase();
	}else{
		strMax=str2.toUpperCase();
		strMin=str1.toUpperCase();
	}
	for(let i=0;i<strMin.length;i+=1){
		if(strMin[i]==strMax[i]){
			continue;
		}else	return false;
	}
	return true;
}
function searchData(type,value,page=1){
	try{
		page=parseInt(page);
		type=parseInt(type);
	}catch(e){
		return "Please type correct values";
	}
	console.log(JData);
	var textOutput="";
	let counter=0;
	for(let key in JData){
		if(type==0){
			console.log("pasa");
			if(match(key,value)){
				if(counter>=(page-1)*RecordsPerPage && counter<(page)*RecordsPerPage){
					textOutput+=(counter+1)+" Name: "+JData[key][1]+" IP: "+JData[key][0]+" Description: "+JData[key][2]+"\n";
				}
				counter+=1;
			}
		}else if(match(JData[key][type-1],value)){
				if(counter>=(page-1)*RecordsPerPage && counter<(page)*RecordsPerPage){
					textOutput+=(counter+1)+" Name: "+JData[key][1]+" IP: "+JData[key][0]+" Description: "+JData[key][2]+"\n";
				}
				counter+=1;
		}
	}
	if(textOutput==""){
		textOutput="I couldnt read any data matching with your request";
	}else{
		textOutput+="```\nPage("+page+"/"+(parseInt(counter/RecordsPerPage)+1)+")\n```"
	}
	return textOutput;
}
var mutes={};
var users={};
allowedIpsChannels=["778717859706306582","809795167489753101","809795658411147274"];
file="data2.php";
var maxMessagesForMute=5;
readUsersIps(file);
var RecordsPerPage=10;
var timeBetweenMessages=1000; //ms
var timePunishment=300000; //5 mins
bot.on("message",msg=>{
	
	if(msg.toString().substring(0,1)=='/'){
		/*
			userID:[nMessages,nIdInterval]
		*/
		if(msg.author.id!="714824917350350898" && mutes.hasOwnProperty(msg.author.id)){
			return;
		}
		if(users.hasOwnProperty(msg.author.id)){
			let nMes=users[msg.author.id][0];
			if(nMes+1===maxMessagesForMute){
				mutes[msg.author.id]=true;
				var embed=new Discord.MessageEmbed();
				embed.setColor(msg.member.displayColor);
				embed.setTitle("Calm down dude!");
				embed.setDescription("I will not listen your spam for "+timePunishment+" miliseconds.\n Please do NOT again.");	
				embed.setAuthor("Bad kid...");
				msg.channel.send(embed);
				setTimeout(function(ID){
					delete mutes[ID];
				},timePunishment,msg.author.id);
				return;
			}else{
				clearTimeout(users[msg.author.id][1]);
				users[msg.author.id][0]+=1;
				users[msg.author.id][1]=setTimeout(function(ID){
					delete users[ID];
				},timeBetweenMessages,msg.author.id);
			
			}
		}else{
			console.log("user writed for first time");
			users[msg.author.id]=[1,setTimeout(function(ID){
				delete users[ID];
			},timeBetweenMessages,msg.author.id)];
		}
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
				msg.react(":regional_indicator_o:");
				break;
			case "hello":
				var embed=new Discord.MessageEmbed();
				embed.setColor(msg.member.displayColor);
				embed.setTitle("Hey");
				embed.setDescription("You can see /help if you want to discover my function");	
				embed.setAuthor("Good morning/afternoon/night");
				embed.setFooter("Requested by: "+msg.author.username+"#"+msg.author.discriminator,msg.author.avatarURL());
				msg.channel.send(embed);
				break;
			case "help":
				var embed=new Discord.MessageEmbed();
				embed.setColor(msg.member.displayColor);
				embed.setTitle("And what does this bot?");
				embed.setDescription("Type /on [ip addres=104.153.105.98] <portNumber> to see some halo servers stats\nType /add <ip> <name> <description> for add a player record\nType /search <0|1|2> <value> [page=1] for search a player\nType /credits for some aditional info...\n (and type /charly for a spanish joke)");
				embed.setFooter("Requested by: "+msg.author.username+"#"+msg.author.discriminator,msg.author.avatarURL());
				msg.channel.send(embed);
				if(msg.author.id==="714824917350350898"){
					msg.channel.send("Your special commands fochman:\nnew_av <URL>\nnew_name <name>\nchange_interval <intervalMS>\nchange_place <channelID><messageID>");
				}
				break;
			case "credits":
				var embed=new Discord.MessageEmbed();
				embed.setColor(msg.member.displayColor);
				embed.setTitle("Huge thanks!");
				embed.setDescription("Based on: BK-Translator Bot (By Este)\nThanks to: hce.halomaps.org\n\nDeveloped by: {BK}Fochman\n\nAnd thanks to {BK}Charly for some help with hosting this bot :v");
				embed.setAuthor("Hi! I obtained this:");
				embed.setFooter("Requested by: "+msg.author.username+"#"+msg.author.discriminator,msg.author.avatarURL());
				msg.channel.send(embed);
				break;
			case "new_av":
				if(args.length>1 && msg.author.id==="714824917350350898"){
					bot.user.setAvatar(args[1]).then(msg.channel.send("What a beauty image!. Thank you very much :D")).catch(console.log);
				}
				break;
			case "new_name":
				if(args.length>1 && msg.author.id==="714824917350350898"){
					bot.user.setUsername(args[1]).then(msg.channel.send("Then thats my name... Thaaaanks")).catch(console.log);
				}
				break;
			case "change_interval":
				if(args.length>1 && msg.author.id==="714824917350350898"){
					try{
						updateTime=parseInt(args[1]);
						clearInterval(interval);
						interval=setInterval(getSimpleStats,updateTime);
						msg.channel.send("Success");
					}catch(e){
						console.log(e);
					}
				}
				break;
			case "change_place":
				if(args.length>2 && msg.author.id==="714824917350350898"){
					let tempCID=chanID;
					let tempMID=msgID;
					try{
						channelStats=bot.channels.cache.find(channel=> channel.id===args[1]);
						channelStats.messages.fetch(args[2]).then(function(message){msgEdit=message},function(){msgEdit=""});
						console.log(msgEdit);
						chanID=args[1];
						msgID=args[2];
						msg.channel.send("success");
					}catch(e){
						chanID=tempCID;
						msgID=tempMID;
						console.log(e);
					}
				}
				break;
			case "send_message":
				if(args.length>2 && msg.author.id==="714824917350350898"){
					try{
						var embed=new Discord.MessageEmbed();
						embed.setColor(msg.member.displayColor);
						embed.setTitle("Remote message");
						embed.setDescription(args.slice(2,args.length).join(" "));
						embed.setFooter("Requested by a remote friendly neighbour..");
						embed.setAuthor("Hello! I come to deliver this message:");
						let channel = bot.channels.cache.find(channel => channel.id === args[1]);
						channel.send(embed);
					}catch(e){
						console.log(e);
						var embed=new Discord.MessageEmbed();
						embed.setColor(msg.member.displayColor);
						embed.setTitle("Ops..");
						embed.setDescription("I could not deliver the message.\nMaybe im not in that channel or you wrote it bad :/");
						embed.setFooter("Requested by a remote friendly neighbour..");
						embed.setAuthor("Hello! I come to deliver this message:");
						msg.channel.send(embed);
					}	
				}
				break;
			case "search":
				if(allowedIpsChannels.includes(msg.channel.id)){
					if(args.length>2){
						var embed=new Discord.MessageEmbed();
						embed.setColor(msg.member.displayColor);
						embed.setTitle("Here is what i found:");
						if(args.length>3){
							embed.setDescription(searchData(args[1],args[2],args[3]));		
						}else
							embed.setDescription(searchData(args[1],args[2],));		
						embed.setFooter("Requested by: "+msg.author.username+"#"+msg.author.discriminator,msg.author.avatarURL());
						msg.channel.send(embed);
					}
				}
				break;
			case "add":
				if(allowedIpsChannels.includes(msg.channel.id)){
					if(args.length>3){
						addData(file,msg,args[1],args[2],args.slice(3,args.length).join(" "))
					}
				}
				break;
			case "charly":
			case "elaya":
			case "snow":
			case "axe":
			case "foch":
			case "bull":
			case "pepo":
			case "leyen":
			case "lastk":
				var embed=new Discord.MessageEmbed();
				embed.setColor(msg.member.displayColor);
				embed.setTitle(":v");
				embed.setDescription("Pasadisimo(a) de burguer diria "+cmd);
				embed.setFooter("Requested by a guy who is not at work, im sure");
				embed.setAuthor("Hello! I come to deliver this.... thing:");
				msg.channel.send(embed);
				break;
			default:
				var embed=new Discord.MessageEmbed();
				embed.setColor(msg.member.displayColor);
				embed.setTitle("Maybe are you saying me something?");
				embed.setDescription("You can see /help if you want to discover my function");		
				embed.setFooter("Requested by: "+msg.author.username+"#"+msg.author.discriminator,msg.author.avatarURL());
				msg.channel.send(embed);
				break;
		}
	}else if(msg.toString()=="ok" || msg.toString()=="Ok" || msg.toString()=="oK" || msg.toString()=="OK"){
				msg.react(String.fromCodePoint("O".codePointAt(0) - 65 + 0x1f1e6)).then(msg.react(String.fromCodePoint("K".codePointAt(0) - 65 + 0x1f1e6)));
			}
});
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
			infPlayers+=(i+1)+". Name:"+array[40+i*4]+"\tScore: "+array[40+i*4+1]+"\tPing: "+array[40+i*4+2]+"\tTeam: "+Team+"\n";
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
function genSimpleString(string){
	var array=decodeString(string);
	let numPlayers=array[20];
	let maxPlayers=array[8];
	let port=array[6];
	return [port,numPlayers+"/"+maxPlayers];
	}
function getSimpleStats(){
	var waitTime=1000;
	var embed=new Discord.MessageEmbed();
	var arreglo_servers=[];
	var id={};
	var conexion_arr=[]
	for(let i=0;i<servers.length;i++){
		conexion_arr.push(dgram.createSocket("udp4"));
		conexion_arr[i].on("error",(err)=>{
			console.log("server error: \n "+err.stack);
			conexion_arr[i].close();
			arreglo_servers.push(servers[i]+": error");
			if(arreglo_servers.length===servers.length){
				displaySimpleStats(arreglo_servers);
			}		
		});
		conexion_arr[i].on("message",(msg,rinfo)=>{
			let inf=genSimpleString(msg.toString());
			clearTimeout(id[inf[0]]);
			arreglo_servers.push(inf[0]+": "+inf[1]);
			if(arreglo_servers.length===servers.length){
				displaySimpleStats(arreglo_servers);
			}
		});
		conexion_arr[i].on("listening",()=>{
			var address=conexion_arr[i].address();
			console.log("server listening "+address.address+":"+address.port);
		});
		var mensaje=String.fromCharCode(254,253,0,119,106,63,63,255,255,255,255);
		conexion_arr[i].send(Buffer.from(mensaje,"ascii"),0,11,servers[i],"104.153.105.98");
		id[servers[i]]=setTimeout(function(port){
			arreglo_servers.push(port+": offline");
			if(arreglo_servers.length===servers.length){
				displaySimpleStats(arreglo_servers);
			}
		},waitTime,servers[i]);
	}		
	}
function displaySimpleStats(arreglo){
	if(msgEdit){
		msgEdit.edit("");
		let embed=new Discord.MessageEmbed();
		embed.setTitle("Main servers stats");
		embed.setAuthor("Updating every "+updateTime+ " miliseconds");
		embed.setFooter("Main servers last scan");
		embed.setColor("#FFFFFF");
		embed.setDescription(arreglo.join("\n"));
		msgEdit.edit(embed);
	}
}
function readUsersIps(file){
	fs.readFile(file,"utf-8",function(err,data){
		if(err || data==""){
			console.log(err);
			return false;
		}
		let jdata=genJSON(data.split("\n"));
	});
}
function genJSON(array){
	if (!array){return false}
	let jReturn={};
	let ipKey="";
	let name="";
	let description="";
	if(array.length%3!=0)return false;
	for(let i=0;i<array.length;i+=1){
		if(i%3==0){
			ipKey=array[i];
		}else if(i%3==1){
			name=array[i];	
		}else{
			description=array[i];
			jReturn[ipKey]=[name,description];
		}
	}
	console.log(jReturn);
	JData=jReturn;
	return jReturn;
}
function addData(file,ip,name,description){
	let wrongDataError="";
	if(name.length>11){
		wrongDataError="Please type a correct name (no more than 11 characters)";
		return wrongDataError;
	}
	let checkArreglo=ip.split(".");
	if(checkArreglo.length!=4){
		wrongDataError="Please type a correct IP";
		return wrongDataError;
	}
	for(let i=0;i<checkArreglo.length;i++){
		try{
			let part=parseInt(checkArreglo[i]);
			if((part<0 || part>255 ||!part || part==NaN) && part!=0){
				wrongDataError="Please type a correct IP";
				return wrongDataError;
			}
		}catch(e){
			console.log(e);
			wrongDataError="Please type a correct IP";
			return wrongDataError;
		}
	}
	if(description=="")description=" ";
	let newData="";
	if(Object.keys(JData).length>0){
		newData="\n"+ip+"\n"+name+"\n"+description;
	}else newData=ip+"\n"+name+"\n"+description;
	fs.appendFile(file,newData,function(err){
		if(err){
			console.log(err);
			return "Something went wrong adding data..";
		}});
	JData[ip]=[name,description];
	return "success";
}
function match(str1,str2){
	let strMin,strMax;
	if(str1.length>=str2.length){
		strMax=str1;
		strMin=str2;
	}else{
		strMax=str2;
		strMin=str1;
	}
	for(let i=0;i<strMin.length;i+=1){
		if(strMin[i]==strMax[i]){
			continue;
		}else	return false;
	}
	return true;
}
function searchData(type,value){
	console.log(JData);
	var textOutput="";
	for(let key in JData){
		if(type==0){
			console.log("pasa");
			if(match(key,value)){
				textOutput+="Name: "+JData[key][0]+" IP: "+key+" Description: "+JData[key][1]+"\n";
			}
		}else if(match(JData[key][type-1],value)){
			textOutput+="Name: "+JData[key][0]+" IP: "+key+" Description: "+JData[key][1]+"\n";
		}
	}
	if(textOutput=="")textOutput="I couldnt read any data matching with your request";
	return textOutput;
}


var mutes={};
var users={};
var maxMessagesForMute=5;
var timeBetweenMessages=1000; //ms
var timePunishment=300000; //5 mins
bot.on("message",msg=>{
	
	if(msg.toString().substring(0,1)=='/'){
		/*
			userID:[nMessages,nIdInterval]
		*/
		if(msg.author.id!="714824917350350898" && mutes.hasOwnProperty(msg.author.id)){
			return;
		}
		if(users.hasOwnProperty(msg.author.id)){
			let nMes=users[msg.author.id][0];
			if(nMes+1===maxMessagesForMute){
				mutes[msg.author.id]=true;
				var embed=new Discord.MessageEmbed();
				embed.setColor(msg.member.displayColor);
				embed.setTitle("Calm down dude!");
				embed.setDescription("I will not listen your spam for "+timePunishment+" miliseconds.\n Please do NOT again.");	
				embed.setAuthor("Bad kid...");
				msg.channel.send(embed);
				setTimeout(function(ID){
					delete mutes[ID];
				},timePunishment,msg.author.id);
				return;
			}else{
				clearTimeout(users[msg.author.id][1]);
				users[msg.author.id][0]+=1;
				users[msg.author.id][1]=setTimeout(function(ID){
					delete users[ID];
				},timeBetweenMessages,msg.author.id);
			
			}
		}else{
			console.log("user writed for first time");
			users[msg.author.id]=[1,setTimeout(function(ID){
				delete users[ID];
			},timeBetweenMessages,msg.author.id)];
		}
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
				msg.react(":regional_indicator_o:");
				break;
			case "hello":
				var embed=new Discord.MessageEmbed();
				embed.setColor(msg.member.displayColor);
				embed.setTitle("Hey");
				embed.setDescription("You can see /help if you want to discover my function");	
				embed.setAuthor("Good morning/afternoon/night");
				embed.setFooter("Requested by: "+msg.author.username+"#"+msg.author.discriminator,msg.author.avatarURL());
				msg.channel.send(embed);
				break;
			case "help":
				var embed=new Discord.MessageEmbed();
				embed.setColor(msg.member.displayColor);
				embed.setTitle("And what does this bot?");
				embed.setDescription("Type /on [ip addres=104.153.105.98] <portNumber> to see some halo servers stats\nType /credits for some aditional info...\n (and type /charly for a spanish joke)");
				embed.setFooter("Requested by: "+msg.author.username+"#"+msg.author.discriminator,msg.author.avatarURL());
				msg.channel.send(embed);
				if(msg.author.id==="714824917350350898"){
					msg.channel.send("Your special commands fochman:\nnew_av <URL>\nnew_name <name>\nchange_interval <intervalMS>\nchange_place <channelID><messageID>");
				}
				break;
			case "credits":
				var embed=new Discord.MessageEmbed();
				embed.setColor(msg.member.displayColor);
				embed.setTitle("Huge thanks!");
				embed.setDescription("Based on: BK-Translator Bot (By Este)\nThanks to: hce.halomaps.org\n\nDeveloped by: {BK}Fochman\n\nAnd thanks to {BK}Charly for some help with hosting this bot :v");
				embed.setAuthor("Hi! I obtained this:");
				embed.setFooter("Requested by: "+msg.author.username+"#"+msg.author.discriminator,msg.author.avatarURL());
				msg.channel.send(embed);
				break;
			case "new_av":
				if(args.length>1 && msg.author.id==="714824917350350898"){
					bot.user.setAvatar(args[1]).then(msg.channel.send("What a beauty image!. Thank you very much :D")).catch(console.log);
				}
				break;
			case "new_name":
				if(args.length>1 && msg.author.id==="714824917350350898"){
					bot.user.setUsername(args[1]).then(msg.channel.send("Then thats my name... Thaaaanks")).catch(console.log);
				}
				break;
			case "change_interval":
				if(args.length>1 && msg.author.id==="714824917350350898"){
					try{
						updateTime=parseInt(args[1]);
						clearInterval(interval);
						interval=setInterval(getSimpleStats,updateTime);
						msg.channel.send("Success");
					}catch(e){
						console.log(e);
					}
				}
				break;
			case "change_place":
				if(args.length>2 && msg.author.id==="714824917350350898"){
					let tempCID=chanID;
					let tempMID=msgID;
					try{
						channelStats=bot.channels.cache.find(channel=> channel.id===args[1]);
						channelStats.messages.fetch(args[2]).then(function(message){msgEdit=message},function(){msgEdit=""});
						console.log(msgEdit);
						chanID=args[1];
						msgID=args[2];
						msg.channel.send("success");
					}catch(e){
						chanID=tempCID;
						msgID=tempMID;
						console.log(e);
					}
				}
				break;
			case "send_message":
				if(args.length>2 && msg.author.id==="714824917350350898"){
					try{
						var embed=new Discord.MessageEmbed();
						embed.setColor(msg.member.displayColor);
						embed.setTitle("Remote message");
						embed.setDescription(args.slice(2,args.length).join(" "));
						embed.setFooter("Requested by a remote friendly neighbour..");
						embed.setAuthor("Hello! I come to deliver this message:");
						let channel = bot.channels.cache.find(channel => channel.id === args[1]);
						channel.send(embed);
					}catch(e){
						console.log(e);
						var embed=new Discord.MessageEmbed();
						embed.setColor(msg.member.displayColor);
						embed.setTitle("Ops..");
						embed.setDescription("I could not deliver the message.\nMaybe im not in that channel or you wrote it bad :/");
						embed.setFooter("Requested by a remote friendly neighbour..");
						embed.setAuthor("Hello! I come to deliver this message:");
						msg.channel.send(embed);
					}	
				}
				break;
			case "search":
				if(args.length>2){
					var embed=new Discord.MessageEmbed();
					embed.setColor(msg.member.displayColor);
					embed.setTitle("Here is what i found:");
					embed.setDescription(searchData(args[1],args[2]));		
					embed.setFooter("Requested by: "+msg.author.username+"#"+msg.author.discriminator,msg.author.avatarURL());
					msg.channel.send(embed);
				}
				break;
			case "add":
				if(args.length>3){
					var embed=new Discord.MessageEmbed();
					embed.setColor(msg.member.displayColor);
					embed.setTitle("Here is what i found:");
					embed.setDescription(addData(file,args[1],args[2],args[3]));		
					embed.setFooter("Requested by: "+msg.author.username+"#"+msg.author.discriminator,msg.author.avatarURL());
					msg.channel.send(embed);
				}
				break;
			default:
				var embed=new Discord.MessageEmbed();
				embed.setColor(msg.member.displayColor);
				embed.setTitle("Maybe are you saying me something?");
				embed.setDescription("You can see /help if you want to discover my function");		
				embed.setFooter("Requested by: "+msg.author.username+"#"+msg.author.discriminator,msg.author.avatarURL());
				msg.channel.send(embed);
				break;
		}
	}else if(msg.toString()=="ok" || msg.toString()=="Ok" || msg.toString()=="oK" || msg.toString()=="OK"){
				msg.react(String.fromCodePoint("O".codePointAt(0) - 65 + 0x1f1e6)).then(msg.react(String.fromCodePoint("K".codePointAt(0) - 65 + 0x1f1e6)));
			}
});
