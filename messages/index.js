/*-----------------------------------------------------------------------------
This template demonstrates how to use an IntentDialog with a LuisRecognizer to add 
natural language support to a bot. 
For a complete walkthrough of creating this type of bot see the article at
https://aka.ms/abs-node-luis
-----------------------------------------------------------------------------*/
"use strict";
var builder = require("botbuilder");
var botbuilder_azure = require("botbuilder-azure");
var path = require('path');
const  google = require('google'); //code added by Harsha Ganipineni



var useEmulator = (process.env.NODE_ENV == 'development');

var connector = useEmulator ? new builder.ChatConnector() : new botbuilder_azure.BotServiceConnector({
    appId: process.env['MicrosoftAppId'],
    appPassword: process.env['MicrosoftAppPassword'],
    stateEndpoint: process.env['BotStateEndpoint'],
    openIdMetadata: process.env['BotOpenIdMetadata']
});

var bot = new builder.UniversalBot(connector);
bot.localePath(path.join(__dirname, './locale'));

var config = require('../host.json');

// Make sure you add code to validate these fields
var luisAppId = process.env.LuisAppId;
var luisAPIKey = process.env.LuisAPIKey;
var luisAPIHostName = process.env.LuisAPIHostName || 'westus.api.cognitive.microsoft.com';

const LuisModelUrl = 'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/0c2a403c-d825-4e0c-a4ed-45a81918b113?subscription-key=48803384c2124cbb86d16047961ac990&timezoneOffset=0&verbose=true&spellCheck=true&q=';

function randomIntInc (low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);}


// Main dialog with LUIS
var recognizer = new builder.LuisRecognizer(LuisModelUrl);
var intents = new builder.IntentDialog({ recognizers: [recognizer] })
/*
.matches('<yourIntent>')... See details at http://docs.botframework.com/builder/node/guides/understanding-natural-language/
*/

intents.matches('Security', [
    function (session, args) {
        for (var i = 0; i < config.responseintent.length; ++i) {
            if (config.responseintent[i].name == 'Security'){
        	session.send(config.responseintent[i].text+ '<br/>' +config.responseintent[i].manager);
            }
        }
    }]);
    
intents.matches('Manager SA', [
    function (session, args) {
        for (var i = 0; i < config.responseintent.length; ++i) {
            if (config.responseintent[i].name == 'Manager SA'){
                session.send(config.responseintent[i].text+ '<br/>' +config.responseintent[i].manager);
            }
        }
    }]); 
    
intents.matches('Manager ETA', [
    function (session, args) {
        for (var i = 0; i < config.responseintent.length; ++i) {
            if (config.responseintent[i].name == 'Manager ETA'){
                session.send(config.responseintent[i].text+ '<br/>' +config.responseintent[i].manager);
            }
        }
    }]);  
    
intents.matches('Integration Architect', [
    function (session, args) {
        for (var i = 0; i < config.responseintent.length; ++i) {
            if (config.responseintent[i].name == 'Integration Architect'){
                session.send(config.responseintent[i].text+ '<br/>' +config.responseintent[i].manager);
            }
        }
    }]);   
    
intents.matches('Data Architect', [
    function (session, args) {
        for (var i = 0; i < config.responseintent.length; ++i) {
            if (config.responseintent[i].name == 'Data Architect'){
                session.send(config.responseintent[i].text+ '<br/>' +config.responseintent[i].manager);
            }
        }
    }]);   
    
intents.matches('Architect EA', [
    function (session, args) {
        for (var i = 0; i < config.responseintent.length; ++i) {
            if (config.responseintent[i].name == 'Architect EA'){
                session.send(config.responseintent[i].text+ '<br/>' +config.responseintent[i].manager);
            }
        }
    }]);    
    
intents.matches('PGBU', [
    function (session, args) {
        for (var i = 0; i < config.responseintent.length; ++i) {
            if (config.responseintent[i].name == 'PGBU'){
                    session.send(config.responseintent[i].text+ '<br/>' +config.responseintent[i].manager);
            }
        }
    }]);   
    
intents.matches('DBU', [
    function (session, args) {
        for (var i = 0; i < config.responseintent.length; ++i) {
            if (config.responseintent[i].name == 'DBU'){
                    session.send(config.responseintent[i].text+ '<br/>' +config.responseintent[i].manager);
            }
        }
    }]);     

intents.matches('Supply Chain', [
    function (session, args) {
        for (var i = 0; i < config.responseintent.length; ++i) {
            if (config.responseintent[i].name == 'Supply Chain'){
                    session.send(config.responseintent[i].text+ '<br/>' +config.responseintent[i].manager);
            }
        }
    }]);
    
intents.matches('PMO Architecture', [
    function (session, args) {
        for (var i = 0; i < config.responseintent.length; ++i) {
            if (config.responseintent[i].name == 'PMO Architecture'){
                    session.send(config.responseintent[i].text+ '<br/>' +config.responseintent[i].manager);
            }
        }
    }]);
    
intents.matches('Components', [
    function (session, args) {
        for (var i = 0; i < config.responseintent.length; ++i) {
            if (config.responseintent[i].name == 'Components'){
                    session.send(config.responseintent[i].text+ '<br/>' +config.responseintent[i].manager);
            }
        }
   }]);    


    
intents.matches('Architecture', [
    function (session, args) {
        for (var i = 0; i < config.responseintent.length; ++i) {
            if (config.responseintent[i].name == 'Architecture'){
        	session.send(config.responseintent[i].text);
            }
       }
    }]);   
    
intents.matches('Joke', [
    function (session, args) {
        session.send(config.responsejoke[randomIntInc(0,49)].text);
        }
    ]);   
    
intents.matches('Greetings', [
    function (session, args) {
        session.send('Hello, ' + session.message.user.name + '. How can I help you today?');
            }
    ]);   
    
intents.matches('None', [
    function (session, args) {
       //session.send('Sorry, I did not understand \'%s\'.', session.message.text); //Commented by Harsha Ganipineni
       //The following code is added by Harsha Ganipineni
       google.resultsPerPage = 5; //No of pages that needs to be displayed
       var nextCounter = 0  //Constant
       
       google(session.message.text, (err, res) =>
       {
             if (err) console.error(err);
             let searchResults = [];
       
             for (var i = 0; i < 5; ++i)
             {
               var link = res.links[i];
               searchResults.push({
                   title : link.title,
                   link : link.href,
                   description : link.description
               })
             }
       
             console.log(searchResults);
             session.send(searchResults);
       }); 




       }
    ]);    
    
intents.matches('Projects', [
    function (session, args)  {
        //session.send('Hi1');
    for (var i = 0; i < config.projectsintent.length; ++i) {
        var count=0;
        var title=config.projectsintent[i].Title;
        var projectName=title.toLowerCase();
        var userinput = session.message.text;
        var str=userinput.toLowerCase();
        var inputwords = str.split(" ");
        for (var j = 0; j < inputwords.length; ++j) {
            var regex = new RegExp("\\b"+inputwords[j]+"\\b","i");
        	if(stopWords.search(regex) < 0)
        	{
        		if(projectName.indexOf(inputwords[j])> -1) {
                count=count+1;
                }
        	}   
            
            }
            if (count>0){
                session.send('Project Name# '+config.projectsintent[i].Title +'<br/> ARB Date# '+config.projectsintent[i].ARBActualDate +'<br/> SRB Date# '+config.projectsintent[i].SRBActualDate +'<br/> ARB Status# '+config.projectsintent[i].ARBDecision +'<br/> SRB Status# '+config.projectsintent[i].SRBDecision);
              
        }
    }
    }]);
   
 
    
intents.matches('Boss', [
    function (session, args) {
        for (var i = 0; i < config.responseintent.length; ++i) {
            if (config.responseintent[i].name == 'Boss'){
        	session.send(config.responseintent[i].text);
            }
        }
   }]);  
   
intents.matches('Quit', [
    function (session, args) {
 session.endDialog();
 session.endConversation();
}]);   
// </CreateNoteHandler>
/*.onDefault((session) => {
    session.send('Sorry, I did not understand \'%s\'.', session.message.text);*/

bot.dialog('/', intents);    

if (useEmulator) {
    var restify = require('restify');
    var server = restify.createServer();
    server.listen(3978, function() {
        console.log('test bot endpont at http://localhost:3978/api/messages');
    });
    server.post('/api/messages', connector.listen());    
} else {
    module.exports = { default: connector.listen() }
}

String.isStopWord = function(word)
{
	var regex = new RegExp("\\b"+word+"\\b","i");
	if(stopWords.search(regex) < 0)
	{
		return false;
	}else
	{
		return true;	
	}
}


var stopWords = "project,-,a,able,about,above,abst,accordance,according,accordingly,across,act,actually,added,adj,\
affected,affecting,affects,after,afterwards,again,against,ah,all,almost,alone,along,already,also,although,\
always,am,among,amongst,an,and,announce,another,any,anybody,anyhow,anymore,anyone,anything,anyway,anyways,\
anywhere,apparently,approximately,are,aren,arent,arise,around,as,aside,ask,asking,at,auth,available,away,awfully,\
b,back,be,became,because,become,becomes,becoming,been,before,beforehand,begin,beginning,beginnings,begins,behind,\
being,believe,below,beside,besides,between,beyond,biol,both,brief,briefly,but,by,c,ca,came,can,cannot,can't,cause,causes,\
certain,certainly,co,com,come,comes,contain,containing,contains,could,couldnt,d,date,did,didn't,different,do,does,doesn't,\
doing,done,don't,down,downwards,due,during,e,each,ed,edu,effect,eg,eight,eighty,either,else,elsewhere,end,ending,enough,\
especially,et,et-al,etc,even,ever,every,everybody,everyone,everything,everywhere,ex,except,f,far,few,ff,fifth,first,five,fix,\
followed,following,follows,for,former,formerly,forth,found,four,from,further,furthermore,g,gave,get,gets,getting,give,given,gives,\
giving,go,goes,gone,got,gotten,h,had,happens,hardly,has,hasn't,have,haven't,having,he,hed,hence,her,here,hereafter,hereby,herein,\
heres,hereupon,hers,herself,hes,hi,hid,him,himself,his,hither,home,how,howbeit,however,hundred,i,id,ie,if,i'll,im,immediate,\
immediately,importance,important,in,inc,indeed,index,information,instead,into,invention,inward,is,isn't,it,itd,it'll,its,itself,\
i've,j,just,k,keep,keeps,kept,kg,km,know,known,knows,l,largely,last,lately,later,latter,latterly,least,less,lest,let,lets,like,\
liked,likely,line,little,'ll,look,looking,looks,ltd,m,made,mainly,make,makes,many,may,maybe,me,mean,means,meantime,meanwhile,\
merely,mg,might,million,miss,ml,more,moreover,most,mostly,mr,mrs,much,mug,must,my,myself,n,na,name,namely,nay,nd,near,nearly,\
necessarily,necessary,need,needs,neither,never,nevertheless,new,next,nine,ninety,no,nobody,non,none,nonetheless,noone,nor,\
normally,nos,not,noted,nothing,now,nowhere,o,obtain,obtained,obviously,of,off,often,oh,ok,okay,old,omitted,on,once,one,ones,\
only,onto,or,ord,other,others,otherwise,ought,our,ours,ourselves,out,outside,over,overall,owing,own,p,page,pages,part,\
particular,particularly,past,per,perhaps,placed,please,plus,poorly,possible,possibly,potentially,pp,predominantly,present,\
previously,primarily,probably,promptly,proud,provides,put,q,que,quickly,quite,qv,r,ran,rather,rd,re,readily,really,recent,\
recently,ref,refs,regarding,regardless,regards,related,relatively,research,respectively,resulted,resulting,results,right,run,s,\
said,same,saw,say,saying,says,sec,section,see,seeing,seem,seemed,seeming,seems,seen,self,selves,sent,seven,several,shall,she,shed,\
she'll,shes,should,shouldn't,show,showed,shown,showns,shows,significant,significantly,similar,similarly,since,six,slightly,so,\
some,somebody,somehow,someone,somethan,something,sometime,sometimes,somewhat,somewhere,soon,sorry,specifically,specified,specify,\
specifying,still,stop,strongly,sub,substantially,successfully,such,sufficiently,suggest,sup,sure,t,take,taken,taking,tell,tends,\
th,than,thank,thanks,thanx,that,that'll,thats,that've,the,their,theirs,them,themselves,then,thence,there,thereafter,thereby,\
thered,therefore,therein,there'll,thereof,therere,theres,thereto,thereupon,there've,these,they,theyd,they'll,theyre,they've,\
think,this,those,thou,though,thoughh,thousand,throug,through,throughout,thru,thus,til,tip,to,together,too,took,toward,towards,\
tried,tries,truly,try,trying,ts,twice,two,u,un,under,unfortunately,unless,unlike,unlikely,until,unto,up,upon,ups,us,use,used,\
useful,usefully,usefulness,uses,using,usually,v,value,various,'ve,very,via,viz,vol,vols,vs,w,want,wants,was,wasn't,way,we,wed,\
welcome,we'll,went,were,weren't,we've,what,whatever,what'll,whats,when,whence,whenever,where,whereafter,whereas,whereby,wherein,\
wheres,whereupon,wherever,whether,which,while,whim,whither,who,whod,whoever,whole,who'll,whom,whomever,whos,whose,why,widely,\
willing,wish,with,within,without,won't,words,world,would,wouldn't,www,x,y,yes,yet,you,youd,you'll,your,youre,yours,yourself,\
yourselves,you've,z,zero";

