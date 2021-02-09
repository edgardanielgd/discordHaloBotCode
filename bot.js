var Discord= require('discord.js');
var XMLHttpRequest=require("xmlhttprequest").XMLHttpRequest;
var axios=require('axios');
var logger=require('winston');
var auth=require('./auth.json');
var sock=require("socket.io");
var dgram=require("dgram");
var fs=require("fs");
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console,{colorize:true});
logger.level='debug';
var bot=new Discord.Client();
bot.once('ready', () => {
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
		string_ret+=string[i];
	}
	return arreglo;
}
function genString(string){
	var array=decodeString(string);
	console.log(array);
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
	let str="SERVER NAME: "+svName+"\nPORT: "+port+"\nMAX. PLAYERS: "+maxPlayers+"\nPASSWORD: "+password+"\nMAP NAME: "+mapName+"\nONLINE PLAYERS: "+numPlayers;
	str=str+"\nGAMETYPE: "+gametype+"\nTEAMPLAY: "+teamplay+"\nVARIANT: \n"+gamevar;
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
	return str+infPlayers;
}
function sendStats(msgD,ip,port,color){
	var conexion=dgram.createSocket("udp4");
	try{
		port=parseInt(port);
		if(!port || port==NaN){
			var embed=new Discord.MessageEmbed();
			embed.setColor(color);
			embed.setTitle("Ops...");
			embed.setDescription("Could you please try again with a valid ip?...\nWhat about a server offline?");	
			msgD.channel.send(embed);
			return;
		}
	}catch (e){
		console.log(e);
		var embed=new Discord.MessageEmbed();
		embed.setColor(color);
		embed.setTitle("Ops...");
		embed.setDescription("Could you please try again with a valid ip?...\nWhat about a server offline?");	
		msgD.channel.send(embed);
		return;
	}
	if(port<=0 || port>=65536){
		var embed=new Discord.MessageEmbed();
		embed.setColor(color);
		embed.setTitle("Ops...");
		embed.setDescription("Could you please try again with a valid ip?...\nWhat about a server offline?");	
		msgD.channel.send(embed);
		return;
	}
	var checkArreglo=ip.split(".");
	if(checkArreglo.length!=4){
		var embed=new Discord.MessageEmbed();
		embed.setColor(color);
		embed.setTitle("Ops...");
		embed.setDescription("Could you please try again with a valid ip?...\nWhat about a server offline?");	
		msgD.channel.send(embed);
		return;	
	}
	for(let i=0;i<checkArreglo.length;i++){
		try{
			let part=parseInt(checkArreglo[i]);
			if(part<0 || part>255 ||!part || part==NaN){
				var embed=new Discord.MessageEmbed();
				embed.setColor(color);
				embed.setTitle("Ops...");
				embed.setDescription("Could you please try again with a valid ip?...\nWhat about a server offline?");	
				msgD.channel.send(embed);
				return;
			}
		}catch(e){
			console.log(e);
			var embed=new Discord.MessageEmbed();
			embed.setColor(color);
			embed.setTitle("Ops...");
			embed.setDescription("Could you please try again with a valid ip?...\nWhat about a server offline?");		
			msgD.channel.send(embed);
			return;
		}
	}
	conexion.on("error",(err)=>{
		console.log("server error: \n "+err.stack);
		conexion.close();
		var embed=new Discord.MessageEmbed();
		embed.setColor(color);
		embed.setTitle("Ops...");
		embed.setDescription("Could you please try again with a valid ip?...\nWhat about a server offline?");	
		msgD.channel.send(embed);
	});
	conexion.on("message",(msg,rinfo)=>{
		var embed=new Discord.MessageEmbed();
		embed.setTitle("Checking states of "+ip+":"+port);
		embed.setColor(color);
		embed.setDescription(genString(msg.toString()));
		msgD.channel.send(embed);
		return;

	});
	conexion.on("listening",()=>{
		var address=conexion.address();
		console.log("server listening "+address.address+":"+address.port);
	});
	var mensaje=String.fromCharCode(254,253,0,119,106,63,63,255,255,255,255)
	conexion.send(Buffer.from(mensaje,"ascii"),0,11,port,ip); //ESTE TROZO VALE OROOOOOOOOOO		
}
bot.on("message",msg=>{
	if(msg.toString().substring(0,1)=='/'){
		var args=msg.toString().substring(1).split(' ');
		var cmd=args[0];
		switch(cmd){
			case "on":
				if(args.length>2){
					sendStats(msg,args[1],parseInt(args[2]),msg.member.displayColor);
				}else if(args.length>1){
					sendStats(msg,"104.153.105.98",parseInt(args[1]),msg.member.displayColor);
				}
				break;
			case "hello":
				var embed=new Discord.MessageEmbed();
				embed.setColor(msg.member.displayColor);
				embed.setTitle("Hey");
				embed.setDescription("You can see /help if you want to discover my function");		
				msg.channel.send(embed);
				break;
			case "help":
				var embed=new Discord.MessageEmbed();
				embed.setColor(msg.member.displayColor);
				embed.setTitle("And what does this bot?");
				embed.setDescription("Type /on [ip addres=104.153.105.98] <portNumber> to see some halo servers stats");
				msg.channel.send(embed);
				break;
			default:
				var embed=new Discord.MessageEmbed();
				embed.setColor(msg.member.displayColor);
				embed.setTitle("Maybe are you saying me something?");
				embed.setDescription("You can see /help if you want to discover my function");		
				msg.channel.send(embed);
				break;
		}
	}
});


